angular.module('cdfinance').controller("FindController", FindController);

function FindController($http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  console.log("findController");
  vm.displayDetails = true;
  vm.find = function() {
    var symbol = vm.symbol.toUpperCase()
    console.log(symbol)
    
    $http.get("/api/stocks/" + symbol).then(function(response) {
      console.log("found stock")
      console.log(response);
      vm.stockHigh = response.data.high
      vm.stockLow = response.data.low;
      vm.stockOpen = response.data.open;
      vm.stockVolume = response.data.volume;
      var stockprice = response.data.price
      vm.stockprice = stockprice;
    }).catch(function(error) {
      if (error) {
        vm.error = error;
      }
    })
  }
  
  vm.buy = function() {
    if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
      var token = $window.sessionStorage.token;
      var decodedToken = jwtHelper.decodeToken(token);
      var username = decodedToken.username;
      
      var data = {"symbol" : vm.symbol.toUpperCase(), "amount": vm.amount}
      
      $http.post('/api/users/'+ username +"/stocks", data).then(function(response) {
        //check the responses
      }).catch(function(error) {
        console.log(error);
      })
    } else {
      $location.path('/');
    }
  }
}