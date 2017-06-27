const denodeify = require('denodeify');
const compress = denodeify(require('iltorb').compress);
const path = require('path');
const fs = require('fs');
const readFile = denodeify(fs.readFile);
const writeFile = denodeify(fs.writeFile);

const expectedBuiltFiles = require('./expected-built-files');

function expectedAssets () {
	return Promise.resolve(
		expectedBuiltFiles
			.map(filename => {
				if(!fs.existsSync(path.join(__dirname, '../../dist/assets/', filename))) {
					throw new Error(`${filename} has not been built`);
				}
				return `./dist/assets/${filename}`;
			})
	);
}

function brotlify (files) {
	return Promise.all(
		files
			.map(fileName =>
				readFile(path.join(process.cwd(), fileName))
					.then(compress)
					.then(contents => writeFile(path.join(process.cwd(), fileName + '.br'), contents))
			)
	);
}

const generateAssetHashes = require('../lib/generate-asset-hashes');

expectedAssets()
	.then(brotlify)
	.then(() => generateAssetHashes('dist/assets', true))
	.then(() => process.exit(0))
	.catch(err => {
		console.log(err) //eslint-disable-line
		process.exit(2);
	});
