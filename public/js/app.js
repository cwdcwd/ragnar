(function(){
	var app = angular.module('ragnar',[]);

	app.controller("MainController", function(){
		
	});

	app.directive('cmcBlock',function(){
		return {
			restrict: 'E',
			templateUrl: 'cmc-block.html'

		};
	});
})();