
var path = require('path')
var nconf = require('nconf')

/**
 * Load Configuration according to the following hierarchy
 *  (where items higher on the list take precedence)
 *
 *  1. Command line arguments
 *  2. Environment variables
 *  3. The config.json file (if it exists) in the root directory
 *  4. The defaults defined below
 */

nconf.argv();

var configPath = nconf.get('config')
|| path.join(process.cwd(), 'config.json')
|| path.join(__dirname, '/../config.json');

// Load config.json
try {
  nconf.file(configPath);
} catch (e) {
  console.error(e);
  process.exit(1);
}

module.exports = nconf;