
module.exports = function(models, lib) {

  return {
    index: function(req, res, next) {
      next(new Error('Unimplemented'))
    },
    destroy: function(req, res, next) {
      next(new Error('Unimplemented'))
    }
  }
}