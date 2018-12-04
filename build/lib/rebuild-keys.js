'use strict';

const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);
const developmentKeysPath = require('./development-keys-path');
const dotenv = require('dotenv');

module.exports = function () {
	return readFile(developmentKeysPath, { encoding: 'utf8' })
		.then(function (env) {
			return dotenv.parse(env);
		});
};
