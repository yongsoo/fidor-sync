
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

// Set environment variables
nconf.set('FIDOR_ACCESS_TOKEN', require('../config.json').fidor.FIDOR_ACCESS_TOKEN);
nconf.set('FIDOR_URL', require('../config.json').fidor.FIDOR_URL);
nconf.set('FIDOR_USERNAME', require('../config.json').fidor.FIDOR_USERNAME);
nconf.set('FIDOR_PASSWORD', require('../config.json').fidor.FIDOR_PASSWORD);
nconf.set('FIDOR_ACCOUNT_ID', require('../config.json').fidor.FIDOR_ACCOUNT_ID);
nconf.set('FIDOR_CLIENT_ID', require('../config.json').fidor.FIDOR_CLIENT_ID);
nconf.set('FIDOR_CLIENT_SECRET', require('../config.json').fidor.FIDOR_CLIENT_SECRET);

nconf.set('KNOX_URL', require('../config.json').knox.KNOX_URL);
nconf.set('KNOX_API_KEY', require('../config.json').knox.KNOX_API_KEY);
nconf.set('KNOX_API_PASSWORD', require('../config.json').knox.KNOX_API_PASSWORD);

nconf.set('EUR_GATEWAY_URL', require('../config.json').eur_gateway.EUR_GATEWAY_URL);
nconf.set('EUR_GATEWAY_USERNAME', require('../config.json').eur_gateway.EUR_GATEWAY_USERNAME);
nconf.set('EUR_GATEWAY_PASSWORD', require('../config.json').eur_gateway.EUR_GATEWAY_PASSWORD);
nconf.set('EUR_GATEWAY_HOT_WALLET', require('../config.json').eur_gateway.EUR_GATEWAY_HOT_WALLET);
nconf.set('EUR_GATEWAY_COLD_WALLET', require('../config.json').eur_gateway.EUR_GATEWAY_COLD_WALLET);

nconf.set('USD_GATEWAY_URL', require('../config.json').usd_gateway.USD_GATEWAY_URL);
nconf.set('USD_GATEWAY_USERNAME', require('../config.json').usd_gateway.USD_GATEWAY_USERNAME);
nconf.set('USD_GATEWAY_PASSWORD', require('../config.json').usd_gateway.USD_GATEWAY_PASSWORD);
nconf.set('USD_GATEWAY_HOT_WALLET', require('../config.json').usd_gateway.USD_GATEWAY_HOT_WALLET);
nconf.set('USD_GATEWAY_COLD_WALLET', require('../config.json').usd_gateway.USD_GATEWAY_COLD_WALLET);

module.exports = nconf;