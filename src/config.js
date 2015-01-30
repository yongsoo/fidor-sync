
var path = require('path')
var nconf = require('nconf')

/**
 * Resolve absolute path of configuration property
 */

function resolvePath(p) {
  return path.resolve(__dirname, '..', p);
};

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
|| process.env['TEST_CONFIG']
|| path.join(process.cwd(), 'config.json')
|| path.join(__dirname, '/../config.json');

// Load config.json
try {
  nconf.file(configPath);
} catch (e) {
  if (nconf.get('checkconfig')) {
    console.error(e);
    process.exit(1);
  }
}

if (nconf.get('ssl')) {
  // Resolve absolute ssl cert and key paths
  var sslConfig = nconf.get('ssl');
  var keyPath = sslConfig.key_path;
  var certPath = sslConfig.cert_path;

  if (keyPath) {
    sslConfig.key_path = resolvePath(keyPath);
  }
  if (certPath) {
    sslConfig.cert_path = resolvePath(certPath);
  }

  nconf.set('ssl', sslConfig);
}

nconf.set('FIDOR_ACCESS_TOKEN', require('../config.json').fidor.FIDOR_ACCESS_TOKEN);
nconf.set('FIDOR_URL', require('../config.json').fidor.FIDOR_URL);
nconf.set('FIDOR_USERNAME', require('../config.json').fidor.FIDOR_USERNAME);
nconf.set('FIDOR_PASSWORD', require('../config.json').fidor.FIDOR_PASSWORD);
nconf.set('FIDOR_ACCOUNT_ID', require('../config.json').fidor.FIDOR_ACCOUNT_ID);
nconf.set('FIDOR_CLIENT_ID', require('../config.json').fidor.FIDOR_CLIENT_ID);
nconf.set('FIDOR_CLIENT_SECRET', require('../config.json').fidor.FIDOR_CLIENT_SECRET);

module.exports = nconf;