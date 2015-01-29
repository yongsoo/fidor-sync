
var Promise = require('bluebird')
var http = require('superagent')
var uuid = require('uuid')

function FidorClient(fidorOptions) {
  this.url = fidorOptions.url;
  this.accessToken = fidorOptions.accessToken;
  this.accountId = fidorOptions.accountId;
}

FidorClient.prototype = {
  sendPayment: function(paymentOptions) {
    var _this = this;

    return new Promise(function(resolve, reject) {
      var payment = {
        amount: paymentOptions.amount,
        external_uid: paymentOptions.uid || uuid.v4(),
        account_id: _this.accountId,
        access_token: _this.accessToken,
        remote_name: paymentOptions.recipient,
        remote_iban: paymentOptions.iban,
        remote_bic: paymentOptions.bic,
        subject: paymentOptions.message
      };

      http
        .post(_this.url + '/sepa_credit_transfers')
        .set('Content-Type', 'application/json')
        .send(payment)
        .end(function(error, response) {
          if (error) {
            return reject(error);
          } else {
            if (response.body.error) {
              return reject(response.body.error);
            }
            resolve(response.body);
          }
        });
    });
  },

  getPayment: function(id) {
    var _this = this;

    return new Promise(function(resolve, reject) {
      return http
        .get(_this.url + '/sepa_credit_transfers/' + id)
        .query({ access_token: _this.accessToken })
        .end(function(error, response) {
          if (error) {
            return reject(error);
          } else {
            resolve(response.body);
          }
        });
    });
  },

  getAvailableAcctBalance: function() {
    var _this = this;

    return new Promise(function(resolve, reject) {
      return http
        .get(_this.url + '/accounts/')
        .query({ access_token: _this.accessToken })
        .end(function(error, response) {
          if (error) {
            return reject(error);
          } else {
              resolve(response.body.data[0].balance_available);
            }
        });
    });
  }
}

module.exports = FidorClient;