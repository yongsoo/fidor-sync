
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
      .query({
        status: 'queued',
        sort_direction: 'desc'
      })
      .auth(_this.username, _this.password)
      .end(function(error, response) {
        if (error) {
          return reject(error);
        }
        resolve(response.body.external_transactions);
      });
  });
}

GatewayClient.prototype.getNextTransaction = function() {
  var _this = this;

  return _this.getTransactions()
    .then(function(transactions) {
      return Promise.resolve(transactions[0]);
    });
}

GatewayClient.prototype.createExternalTransaction = function(transaction) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    http
      .post(_this.url + '/v1/external_transactions')
      .auth(_this.username, _this.password)
      .send(transaction)
      .end(function(error, response) {
        if (error) {
          return reject(error);
        }
        resolve(response.body);
      });
  });
}

GatewayClient.prototype.updateTransactionStatus = function(transactionId, status) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    return http
      .put(_this.url + '/v1/external_transactions/' + transactionId)
      .send({ status: status })
      .auth(_this.username, _this.password)
      .end(function(error, response) {
        if (error) {
          return reject(error);
        }
        resolve(response.body);
      });
  });
}

GatewayClient.prototype.createExternalAccount = function(externalAccount) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    http
      .post(_this.url + '/v1/external_accounts')
      .auth(_this.username, _this.password)
      .send(externalAccount)
      .end(function(error, response) {
        if (error) {
          return reject(error);
        }
        resolve(response.body);
      })
  })
}

module.exports = GatewayClient;