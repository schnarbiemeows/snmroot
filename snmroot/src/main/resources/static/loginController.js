/**
 * this will have controllers for the registration and login pages
 */
app.controller('loginCtrl', function($scope, $http, $location, $timeout, loginProperties) {
	// error messaging
	$scope.errors = [];
	$scope.hasError = false;
	$scope.accountid = loginProperties.getAccountId();
	$scope.username = loginProperties.getusername();
	$scope.logintoken = loginProperties.getLogintoken();
	$scope.admintoken = loginProperties.getAdmintoken();
	$scope.subscribertoken = loginProperties.getSubscribertoken();
	// registration page
	$scope.showRegisterSection = false;
	$scope.registerUsername = "";
	$scope.registerPassword = "";
	$scope.registerEmail = "";
	$scope.registrationFormError = true;
	$scope.$watch('registerUsername',function() {$scope.testRegistration();});
	$scope.$watch('registerPassword',function() {$scope.testRegistration();});
	$scope.$watch('registerEmail',function() {$scope.testRegistration();});
	// login page
	$scope.loginUsername = null;
	$scope.loginPassword = null;
	$scope.loginFormError = true;
	$scope.$watch('loginUsername',function() {$scope.testLogin();});
	$scope.$watch('loginPassword',function() {$scope.testLogin();});
	$scope.clearErrors = function() {
		$scope.errors = [];
		$scope.hasError = false;
	}
	$scope.initialize = function() {
		$scope.clearErrors();
	}
	$scope.testRegistration = function() {
		if(!$scope.registerUsername.length || !$scope.registerPassword.length || 
				!$scope.registerEmail.length) {
			$scope.registrationFormError = true;
		} else {
			$scope.registrationFormError = false;
		}
	}
	$scope.register = function() {
		item = {
			"username" : $scope.registerUsername,
			"password" : $scope.registerPassword,
			"email" : $scope.registerEmail
		};
		var json = JSON.stringify(item);
		var req = {
			method : 'POST',
			url : '/snmroot/login/register',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : json
		};
		$http(req).then(function(response) {
			data = response.data;
			console.log('Body:', data);
			$scope.username = data.username;
			$scope.logintoken = data.token;
			$location.path("/login");
		}, function myError(response) {
	        $scope.hasError = true;
			$scope.errors.push(response.data.message);
			$timeout(function () {
			      $scope.clearErrors();
			  }, 3000);
	    });
	}
	$scope.testLogin = function() {
		$scope.clearErrors();
		if($scope.loginUsername==null||$scope.loginPassword==null||
				!$scope.loginUsername.length || !$scope.loginPassword.length ) {
			$scope.loginFormError = true;
		} else {
			$scope.loginFormError = false;
		}
	}
	$scope.login = function() {
		$scope.clearErrors();
		item = {
			"username" : $scope.loginUsername,
			"password" : $scope.loginPassword
		};
		var json = JSON.stringify(item);
		var req = {
			method : 'POST',
			url : '/snmroot/login/login',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : json
		};
		$http(req).then(function(response) {
			data = response.data;
			console.log('Body:', data);
			var results = data.results;
			loginProperties.setAccountId();
			loginProperties.setUsername(null);
			loginProperties.setLogintoken($scope.logintoken);
			loginProperties.setAdmintoken();
			loginProperties.setSubscribertoken();
			$location.path("/main");
		}, function myError(response) {
	        $scope.hasError = true;
			$scope.errors.push(response.data.message);
			$timeout(function () {
			      $scope.clearErrors();
			  }, 3000);
	    });
	}
});