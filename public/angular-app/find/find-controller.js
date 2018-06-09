angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;
  console.log("findController");
  vm.displayDetails = true;
  // vm.switchDisplayDetails = function(){
  //   if(vm.displayDetails){
  //     vm.displayDetails = false;
  //     console.log("Displaydetails " + vm.displayDetails);
  //   }vm.displayDetails = true;
  //   console.log("Displaydetails " + vm.displayDetails);
  // }
  // console.log("Displaydetails " + vm.displayDetails);
   
   
  vm.find = function() {
    console.log("inside vm.find")
   var symbol = vm.symbol.toUpperCase()
    console.log("find controller " + symbol)
    
    $http.get("/api/stocks/" + symbol).then(function(response) {
      console.log("found stock")
      console.log(response);
      vm.stockHigh = response.data.high
      vm.stockLow = response.data.low;
      vm.stockOpen = response.data.open;
      vm.stockVolume = response.data.volume;
      var stockprice = response.data.price;
      vm.stockprice = stockprice;
    }).catch(function(error) {
      if (error) {
        vm.error = error;
      }
    })
  }
}