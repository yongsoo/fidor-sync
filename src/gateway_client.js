
var Promise = require('bluebird')
var http = require('superagent')

var GatewayClient = function(options) {
  this.url = options.url;
  this.username = options.username;
  this.password = options.password;
}

GatewayClient.prototype.getTransactions = function() {
  var _this = this;

  return new Promise(function(resolve, reject) {
    return http
      .get(_this.url + '/v1/external_transactions')
      .auth(_this.username, _this.password)
      .end(function(error, response) {
        if (error) {
          return reject(error);
        } else {
          resolve(response.body);
        }
      });
  });
}

GatewayClient.prototype.putTransaction = function(transaction) {

}

module.exports = GatewayClient;