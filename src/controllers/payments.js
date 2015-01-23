var FidorClient = require(__dirname+'/../lib/fidor_client');

module.exports = function(models) {

  return {
    create: function(req, res, next) {
      var fidorClient = new FidorClient({
        url: process.env['FIDOR_URL'],
        accessToken: process.env['FIDOR_ACCESS_TOKEN'],
        accountId: process.env['FIDOR_ACCOUNT_ID'],
        clientId: process.env['FIDOR_CLIENT_ID'],
        clientSecret: process.env['FIDOR_CLIENT_SECRET']
      });

      fidorClient.sendPayment({
        amount: req.body.amount,
        uid: req.body.uid,
        recipient: req.body.recipient,
        iban: req.body.iban,
        bic: req.body.bic,
        message: req.body.message
      })
      .then(function(payment) {
        if (payment.error) {
          res.status(payment.error.code).send({
            success: false,
            error: payment.error.message
          })
        }
        res.status(200).send({
          success: true,
          payment: payment
        })
      })
      .error(next);

      // models.Payment.generate({
      //   amount: req.body.amount,
      //   account_id: req.body.account_id,
      //   external_uid: req.body.external_uid
      // })
      // .then(function(payment) {
      //   res.status(200).send({
      //     success: true,
      //     payment: payment
      //   })
      // })
      // .error(next)
    },
    show: function(req, res, next) {
      // new models.Payment({ id: req.params.id })
      //   .fetch()
      //   .then(function(payment) {
      //     if (payment) {
      //       res.status(200).send({
      //         success: true,
      //         payment: payment
      //       })
      //     } else {
      //       next(new Error('Payment not found'));
      //     }
      //   })
      //   .error(next)
    },
    cancel: function(req, res, next) {
      next(new Error('Unimplemented'))
    }
  }
}