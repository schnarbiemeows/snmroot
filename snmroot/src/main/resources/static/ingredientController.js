/**
 * this will have controllers for both the ingredient page and the recipe page
 */
app.controller('ingredientCtrl', function($scope, $http, $location, loginProperties) {
	// error messaging
	$scope.errors = [];
	$scope.hasError = false;
	$scope.username = loginProperties.getusername();
	$scope.logintoken = loginProperties.getLogintoken();
	$scope.admintoken = loginProperties.getAdmintoken();
	$scope.subscribertoken = loginProperties.getSubscribertoken();
	
	$scope.clearErrors = function() {
		$scope.errors = [];
		$scope.hasError = false;
	}
	$scope.initialize = function() {
		$scope.clearErrors();
	}
	$scope.textIngredientsForm = function() {
		$scope.ingredientsFormError = false;
	}
});