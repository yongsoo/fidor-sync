
module.exports = function(models) {

  return {
    create: function(req, res, next) {
      next(new Error('Unimplemented'))
      // Goal: Gateway plugin will post information (iban, account number, amount) to this function, will return success: true or false
      // Add to fidor_client lib to check if account is valid, and check if own account has enough funds to make payment
      // Generate a database entry for quote and store it
    },
    show: function(req, res, next) {
      next(new Error('Unimplemented'))
      // Goal: Take in an id, and return quote from database
    }
  }
}