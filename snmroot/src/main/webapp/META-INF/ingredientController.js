/**
 * this will have controllers for both the ingredient page and the recipe page
 */
app.controller('ingredientCtrl', function($scope, $http, $location, loginProperties) {
	// error messaging
	$scope.errors = [];
	$scope.hasError = false;
	
	$scope.clearErrors = function() {
		$scope.errors = [];
		$scope.hasError = false;
	}
	$scope.initialize = function() {
		$scope.clearErrors();
		$scope.validate();
	}
	$scope.textIngredientsForm = function() {
		$scope.ingredientsFormError = false;
	}
	
	$scope.validate = function() {
		item = {
			    "id": loginProperties.getAccountId(),
			    "username": loginProperties.getusername(),
			    "admin": loginProperties.getAdmin(),
			    "validated": loginProperties.getValidated(),
			    "token": loginProperties.getLogintoken(),
			    "admintoken": loginProperties.getAdmintoken(),
			    "subscribertoken": loginProperties.getSubscribertoken()
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/login/validate',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				console.log('Body:', data);
				loginProperties.setAccountId(data.id);
				loginProperties.setUsername(data.username);
				loginProperties.setValidated(data.validated);
				loginProperties.setAdmin(data.admin);
				loginProperties.setLogintoken(data.token);
				loginProperties.setAdmintoken(data.admintoken);
				loginProperties.setSubscribertoken(data.subscribertoken);
				if(typeof data.admin !== "undefined") {
					if(data.admin == 'Y') {
						$scope.viewOnly = false;
					}
				}
			}, function myError(response) {
				loginProperties.setAccountId(null);
				loginProperties.setUsername(null);
				loginProperties.setValidated(null);
				loginProperties.setAdmin(null);
				loginProperties.setLogintoken(null);
				loginProperties.setAdmintoken(null);
				loginProperties.setSubscribertoken(null);
				$location.path("/home");
		    });
		}
});