/*
	n-ui webpack config
	common plugins and optimisation
*/

const BowerResolvePlugin = require('bower-resolve-webpack-plugin');

module.exports = {
	// abort compilation on first error
	bail: true,

	// do not use production mode as default
	// TODO: discuss whether this should default to 'production'
	mode: 'none',

	output: {
		filename: '[name]',
		path: process.cwd()
	},

	// generate source maps
	devtool: 'source-map',

	// https://webpack.js.org/configuration/optimization/
	optimization: {
		// do not emit assets when there are compilation errors
		noEmitOnErrors: true,
		// scope hoisting
		concatenateModules: true
	},

	// https://webpack.js.org/configuration/resolve/
	resolve: {
		plugins: [
			// This will handle a bower.json's `main` property being an array
			new BowerResolvePlugin()
		],

		// In which folders the resolver look for modules relative paths are
		// looked up in every parent folder (like node_modules) absolute
		// paths are looked up directly the order is respected
		modules: ['bower_components', 'node_modules'],

		// Automatically resolve certain extensions. This defaults to: ['.wasm', '.mjs', '.js', '.json']
		extensions: [
			'.wasm', '.mjs', '.js', '.json', '.jsx'
		],

		// package description files
		descriptionFiles: ['bower.json', 'package.json'],

		// package.json / bower.json
		// fields for package resolution
		mainFields: ['browser', 'main'],

		// package.json / bower.json
		// fields for aliasing
		// https://github.com/defunctzombie/package-browser-field-spec
		aliasFields: ['browser'],

		// file names for directory resolution
		mainFiles: ['index', 'main']
	}
};
