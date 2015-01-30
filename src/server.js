
var FidorClient = require('fidor_client')
var GatewayClient = require('gateway_client')
var config = require('config')

var fidorClient = new FidorClient({
	url: config.get('FIDOR_URL'),
	accessToken: config.get('FIDOR_ACCESS_TOKEN'),
	accountId: config.get('FIDOR_ACCOUNT_ID'),
  clientId: config.get('FIDOR_CLIENT_ID'),
  clientSecret: config.get('FIDOR_CLIENT_SECRET')
})

var gatewayClient = new GatewayClient({

})

