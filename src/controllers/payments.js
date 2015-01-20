
module.exports = function(models, lib) {

  return {
    create: function(req, res, next) {
      next(new Error('Unimplemented'))
    },
    show: function(req, res, next) {
      next(new Error('Unimplemented'))
    },
    cancel: function(req, res, next) {
      next(new Error('Unimplemented'))
    }
  }
}