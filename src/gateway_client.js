
var http = require('superagent')

var GatewayClient = function(options) {
  this.url = options.url;
  this.accessToken = options.accessToken;
  this.accountId = options.accountId;
}

GatewayClient.prototype.getTransaction = function() {
  
}

GatewayClient.prototype.putTransaction = function(transaction) {
  
}

module.exports = GatewayClient;