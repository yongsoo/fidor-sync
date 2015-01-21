var Promise = require('bluebird');
var http = require('superagent');

function FidorClient(fidorOptions) {
  this.url = fidorOptions.url;
  this.accessToken = fidorOptions.accessToken;
  this.accountId = fidorOptions.accountId;
  this.clientId = fidorOptions.clientId;
  this.clientSecret = fidorOptions.clientSecret;
}

FidorClient.prototype = {
  sendPayment: function(paymentOptions) {
    var _this = this;

    return new Promise(resolve, reject) {
      var payment = {
        amount: paymentOptions.amount,
        external_uid: paymentOptions.txHash,
        account_id: _this.accountId,
        access_token: _this.token,
        remote_name: paymentOptions.remoteName,
        remote_iban: paymentOptions.remoteIban,
        remote_bic: paymentOptions.remoteBic
      };

      http
        .post(_this.url + '/sepa_credit_transfers')
        .set('Content-Type', 'application/json')
        .send(payment)
        .end(function(error, response) {
          if (error) {
            return reject(error);
          } else {
            resolve(response.body);
          }
        });
    };
  },

  getPayment: function(id) {
    var _this = this;

    return new Promise(resolve, reject) {
      return http
        .get(_this.url + '/sepa_credit_transfers/' + id)
        .end(function(error, response) {
          if (error) {
            return reject(error)
          } else {
            resolve(response.body)
          }
        });
    };
  }
}

module.exports = FidorClient;