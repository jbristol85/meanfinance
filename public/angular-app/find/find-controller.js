angular.module('cdfinance').controller("FindController", FindController);

function FindController($http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    }
    else {
      return false;
    }
  };
  
  console.log("findController");
  vm.find = function() {
    var symbol = vm.symbol.toUpperCase()
    console.log(symbol)

    $http.get("/api/stocks/" + symbol).then(function(response) {
      console.log("found stock")
      var stockprice = response.data.price
      vm.stockprice = stockprice;
    }).catch(function(error) {
      if (error) {
        vm.error = error;
      }
    })
  }

  if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    var username = decodedToken.username;

    $http.get('/api/users/' + username + "/stocks").then(function(response) {
      vm.stocks = response.data;
      console.log(vm.stocks);
    }).catch(function(error) {
      console.log(error);
    })
  }
}
