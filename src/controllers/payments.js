
var FidorClient = require(__dirname+'/../lib/fidor_client')

module.exports = function(models) {
  var fidorClient = new FidorClient({
    url: process.env['FIDOR_URL'],
    accessToken: process.env['FIDOR_ACCESS_TOKEN'],
    accountId: process.env['FIDOR_ACCOUNT_ID'],
    clientId: process.env['FIDOR_CLIENT_ID'],
    clientSecret: process.env['FIDOR_CLIENT_SECRET']
  });

  return {
    create: function(req, res, next) {
      if (Number(req.body.amount) < 0.01 || typeof req.body.amount !== 'number') {
        return res.status(400).send({
          success: false,
          error: 'Amount must be a number and greater than 0.01'
        })
      }

      if (req.body.recipient && req.body.recipient.length > 70) {
        return res.status(400).send({
          success: false,
          error: 'Recipient can not be greater than 70 characters long'
        })
      }

      if (req.body.message && req.body.message.length > 140) {
        return res.status(400).send({
          success: false,
          error: 'Message can not be greater than 140 characters long'
        })
      }

      fidorClient.sendPayment(req.body)
      .then(function(payment) {
        if (payment.error) {
          res.status(payment.error.code).send({
            success: false,
            error: payment.error.message
          })
        } else {
          res.status(200).send({
            success: true,
            payment: payment
          })
        }
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
      fidorClient.getPayment(req.params.id)
      .then(function(payment) {
        if (payment.error) {
          res.status(payment.error.code).send({
            success: false,
            error: payment.error.message
          })
        } else {
          res.status(200).send({
            success: true,
            payment: payment
          })
        }
      })
      .error(next);
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
    }
  }
}