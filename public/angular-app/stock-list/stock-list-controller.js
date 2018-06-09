angular.module('cdfinance').controller('ListController', ListController);

function ListController($http){
    var vm = this;
    
    $http.get('/api/stocks').then(function(response){
        // console.log(response.data)
        vm.stocks = response.data;
    }).catch(function(err){
        console.log("Error finding stocks " + err);
    });
} 