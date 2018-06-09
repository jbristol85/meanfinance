angular.module('cdfinance').directive('mainNews', mainNews);

function mainNews(){
	return{
		restrict: 'E',
		templateUrl: 'angular-app/main/mainNews-directive.html',
		controller: MainController,
		controllerAs: 'vm'
	};
}