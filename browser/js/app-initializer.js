import date from 'o-date';
import footer from 'o-footer';
import { lazyLoad as lazyLoadImages } from 'n-image';
import * as serviceWorker from 'n-service-worker';
import * as syndication from 'n-syndication';
import feedback from 'n-feedback';
import { perfMark } from 'n-ui-foundations';
import * as ads from '../../components/n-ui/ads';
import * as header from '../../components/n-ui/header';
import * as roe from '../../components/n-ui/roe';
import * as evenMoreJanky from '../../components/n-ui/perf-janky/more-janky';
import * as speedcurveLux from '../../components/n-ui/speedcurve-lux';
import tracking from '../../components/n-ui/tracking';

//Polyfill for :focus-visible https://github.com/WICG/focus-visible
import 'focus-visible';

export const presets = {
	discrete: {
		header: true,
		footer: true,
		date: true
	},
	complete: {
		header: true,
		footer: true,
		date: true,
		ads: true,
		syndication: true,
		roe: true,
		feedback: false,
		evenMoreJanky: true
	}
};

const waitForCondition = (conditionName, action) => {
	window.FT.conditions[conditionName] ? action() : document.addEventListener(`FT.${conditionName}`, action);
};

// Dispatch a custom `ftNextLoaded` event after the app executes.
const dispatchLoadedEvent = () => {
	let ftNextLoaded = false;
	const ftNextLoadedTrigger = () => {
		if (document.readyState === 'complete' && ftNextLoaded === false) {
			ftNextLoaded = true;
			window.dispatchEvent(new CustomEvent('ftNextLoaded'));
			return true;
		}
	};
	if (!ftNextLoadedTrigger()) {
		window.addEventListener('load', ftNextLoadedTrigger);
		document.onreadystatechange = ftNextLoadedTrigger;
	}
};

export class AppInitializer {
	constructor () {
		this.onAppInitialized = this.onAppInitialized.bind(this);

		const appInfo = {
			isProduction: document.documentElement.hasAttribute('data-next-is-production'),
			version: document.documentElement.getAttribute('data-next-version'),
			name: document.documentElement.getAttribute('data-next-app'),
			product: document.documentElement.getAttribute('data-next-product')
		};

		const flags = Object.assign(window.FT.flags, {
			get: function (name) {
				return this[name];
			},
			getAll: function () {
				return this;
			}
		});

		this.env = {
			flags,
			appInfo,
			allStylesLoaded: new Promise(res => {
				// if this element exists it means the page is setup to deliver critical/main css
				if (document.querySelector('style.n-layout-head-css')) {
					waitForCondition('allStylesLoaded', res);
				} else {
					res();
				}
			})
		};
	}

	bootstrap (config) {
		config = config || {};
		this.enabledFeatures = Object.assign({}, presets[config.preset], config.features);
		this.initializeComponents();
		perfMark('nUiJsExecuted');
		return this.env;
	}

	initializeComponents () {
		const { flags, allStylesLoaded, appInfo } = this.env;

		// FT and next tracking
		tracking.init(flags, appInfo);

		if (flags.get('serviceWorker')) {
			serviceWorker
				.register(flags)
				.catch(() => { });

			serviceWorker
				.message({ type: 'updateCache', data: {}})
				.catch((err) => {
					if (err.toLowerCase() !== 'service worker unavailable') {
						throw err;
					}
				});
		} else {
			serviceWorker.unregister();
		}

		if (this.enabledFeatures.header) {
			header.init();
		}

		if (this.enabledFeatures.date) {
			date.init();
		}

		if (this.enabledFeatures.ads) {
			ads.init(flags, appInfo, this.enabledFeatures.ads);
		}

		if (this.enabledFeatures.lazyLoadImages) {
			lazyLoadImages();
		}

		if (flags.get('speedcurveLuxFlagsSupport')) {
			speedcurveLux.addFlags();
		}

		allStylesLoaded
			.then(() => {

				if (this.enabledFeatures.footer) {
					footer.init();
				}

				if (this.enabledFeatures.syndication) {
					syndication.init(flags);
				}

				if (this.enabledFeatures.feedback && flags.get('qualtrics')) {
					feedback.init(appInfo);
				}

				if (this.enabledFeatures.roe) {
					roe.init(flags);
				}

				if (this.enabledFeatures.evenMoreJanky) {
					evenMoreJanky.init(flags);
				}

			});
	}

	onAppInitialized () {
		perfMark('appJsExecuted');
		dispatchLoadedEvent();
		tracking.lazyInit(this.env.flags);
		document.documentElement.classList.add('js-success');
	}
}
