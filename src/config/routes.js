
module.exports = function(router, controllers) {

  router.get('/', controllers.home.index)

  router.get('/notifications', controllers.notifications.index)
  router.delete('/notifications/:id', controllers.notifications.destroy)

  router.post('/payments', controllers.payments.create)
  router.get('/payments/:id', controllers.payments.show)

  router.post('/quotes', controllers.quotes.create)
  router.get('/quotes/:id', controllers.quotes.show)
}

