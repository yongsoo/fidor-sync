
module.exports = function(models, lib) {

  return {
    create: function(req, res, next) {
      models.Payment.generate({
        amount: req.body.amount,
        account_id: req.body.account_id,
        external_uid: req.body.external_uid
      })
      .then(function(payment) {
        res.status(200).send({
          success: true,
          payment: payment
        })
      })
      .error(next)
    },
    show: function(req, res, next) {
      new models.Payment({ id: req.params.id })
        .fetch()
        .then(function(payment) {
          if (payment) {
            res.status(200).send({
              success: true,
              payment: payment
            })
          } else {
            next(new Error('Payment not found'));
          }
        })
        .error(next)
    },
    cancel: function(req, res, next) {
      next(new Error('Unimplemented'))
    }
  }
}