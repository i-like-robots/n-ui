const shellpromise = require('shellpromise');
const version = require("../bower_components/n-ui/.bower.json").version.split(".").slice(0,2).join('.');

//TODO soft purge fastly too
shellpromise(`nht deploy-static \`find . -path "./dist/*"\` --destination n-ui/v${version}/ --strip 1 --bucket ft-next-n-ui-prod --cache-control 'no-cache, must-revalidate, max-age=3600'`, { verbose: true, env: process.env })
