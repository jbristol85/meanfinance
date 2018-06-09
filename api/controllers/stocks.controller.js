var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');
var https = require('https');
var stockPrice = require('./shared/stockPrice.js')

module.exports.stocksGetPrice = function(req, res) {
  var symbol = req.params.symbol
  console.log("looking up symbol:", symbol);
  
  Stock
    .findById(symbol)
    .exec(function(err, stock) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else if (!stock) {
        res
          .status(404)
          .json({ "message" : "Stock symbol invalid"})
      } else {
        //found the stock symbol it is a valid NASDAQ stock symbol pull data
        //from api.
        var price = stockPrice.getPrice(req, res, symbol);
        
      }
    })
  
}

module.exports.stocksGetAll = function(req, res){
  	console.log('Get the Stocks');
  // 	console.log("req.query " + req);

  	Stock 
  		.find()
   		.exec(function(err, stocks){
  			if (err){
  				console.log('Error finding Stocks');
  				res
  					.status(500)
  					.json(err);
  			}else {
  				console.log("Found Stocks", stocks.length);
  				res
  					.json(stocks);
  			}
  	});
}; 
