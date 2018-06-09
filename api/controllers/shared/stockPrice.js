/* global APIKEY */

var https = require('https');
// var APIKEY = require('/../../keys.js');
var _apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=APIKEY&outputsize=compact"
// PSPWXGERTER5N7MD
module.exports.getPrice = function(req, res, symbol) {
  
  var url = _apiUrl + "&symbol=" + symbol
  
  console.log(url);

  var request = https.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
      data,
      route;

    response.on("data", function (chunk) {
      buffer += chunk;
    }); 

    response.on("end", function (err) {
      if (err) {
        res
          .status(500)
          .json(err)
      } else {
        // finished transferring data
        // dump the raw data
        data = JSON.parse(buffer);
        // console.log(data);
        var stockData = data['Time Series (Daily)']
        var keys = Object.keys(stockData);
        var price = parseFloat(stockData[keys[0]]['4. close']);
        var open = parseFloat(stockData[keys[0]]['1. open']);
        var high = parseFloat(stockData[keys[0]]['2. high']);
        var low = parseFloat(stockData[keys[0]]['3. low']);
        var volume = parseFloat(stockData[keys[0]]['5. volume']);
        console.log("Price for", symbol, "is", price);
        res
          .status(200)
          .json({"price" : price, "open": open, "high": high, "low": low, "volume": volume});
      }
    }); 
  }); 
}

module.exports.returnPrice = function(symbol) {
  var url = _apiUrl + "&symbol=" + symbol
  // console.log(url);
  return new Promise(resolve => {
    var price;
    var request = https.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
      data,
      route;

    response.on("data", function (chunk) {
      buffer += chunk;
    }); 

    response.on("end", function (err) {
      if (err) {
        return err
      } else {
          // finished transferring data
          // dump the raw data
          data = JSON.parse(buffer);
          // console.log(data);
          var stockData = data['Time Series (Daily)'];
          var keys = Object.keys(stockData);
          var price = stockData[keys[0]]['4. close'];
          // console.log(symbol, "is valued at", price);
          resolve(parseFloat(price));
      }
    }); 
  });
  
  }); 
}