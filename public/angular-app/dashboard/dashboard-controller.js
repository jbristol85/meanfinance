angular.module('cdfinance').controller("DashboardController", DashboardController);

function DashboardController( $http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    var username = decodedToken.username;
    
    $http.get('/api/users/'+ username +"/stocks").then(function(response) {
      vm.stocks = response.data;
      console.log(vm.stocks);
      vm.total = 0;
      for(var i in vm.stocks.prices)
      {
        vm.total += vm.stocks.prices[i] * vm.stocks.stocks[i].amount;
      }
    }).catch(function(error) {
      console.log(error);
    })
    $http.get('/api/users/' + username).then(function(response) {
      vm.balance = response.data
    })
  } else {
    $location.path('/');
  }
}