angular.module('cdfinance').directive('stockList', stockList);


function stockList($http){
    return{
        restrict: 'E',
        templateUrl: 'angular-app/stock-list/stock-list-directive.html',
        controller: ListController,
        controllerAs: 'vm'
        
    };
}
 