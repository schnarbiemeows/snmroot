/**
 * this will have the controller for the serving type page
 */
app.controller('servingTypeCtrl', function($scope, $http, $location, $timeout, loginProperties) {
	// serving type page - 2 tables, serving_type, serving_type_conversion
	$scope.username = loginProperties.getusername();
	$scope.logintoken = loginProperties.getLogintoken();
	$scope.admintoken = loginProperties.getAdmintoken();
	$scope.subscribertoken = loginProperties.getSubscribertoken();
	// error messaging
	$scope.errors = [];
	$scope.hasError = false;
	$scope.ServingTypesList = [];
	$scope.showSTform = false;
	$scope.STFormId = null;
	$scope.STFormDesc = null;
	$scope.STFormEdit = false;
	$scope.servingTypeFormError = true;
	$scope.$watch('STFormDesc',function() {$scope.testServingTypeForm();});
	$scope.clearErrors = function() {
		$scope.errors = [];
		$scope.hasError = false;
	}
	$scope.initialize = function() {
		$scope.clearErrors();
		$scope.getServingTypeList();
	}
	$scope.testServingTypeForm = function() {
		if($scope.STFormDesc==null||!$scope.STFormDesc.length) {
			$scope.servingTypeFormError = true;
		} else {
			$scope.servingTypeFormError = false;
		}
	}
	$scope.checkUser = function() {
		item = {
				"username" : $scope.registerUsername,
				"password" : $scope.registerPasswor
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
				loginProperties.setUsername($scope.username);
				loginProperties.setLogintoken($scope.logintoken);
				$location.path("/main");
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });
		}
	$scope.getServingTypeList = function() {
		var url = '/snmroot/servingtype/all';
		$http.get(url).then(function(response) {
			data = response.data;
			if(typeof data!=="undefined") {
				$scope.servingTypesList = data;
				console.log('serving type length = ' , data.length);
			}
			console.log('Body:', data);
		}, function myError(response) {
	        $scope.hasError = true;
			$scope.errors.push(response.data.message);
			$timeout(function () {
			      $scope.clearErrors();
			  }, 3000);
	    });
	}
	$scope.updateServingType = function(servingType) {
		$scope.showSTform = true;
		$scope.servingTypeFormError = true;
		if (servingType == 'new') {
			$scope.STFormId = null;
			$scope.STFormDesc = null;
			$scope.STFormEdit = false;
		} else {
			$scope.STFormId = servingType.id;
			$scope.STFormDesc = servingType.serving_type_desc;
			$scope.STFormEdit = true;
		}
	}
	$scope.deleteServingType = function(id) {
		console.log('serving type id to be deleted = ' + id);
		var url = '/snmroot/servingtype/delete/' + id;
		$http.delete(url).then(function(response) {
				status = response.status;
				console.log('status = ', status);
				$scope.getServingTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });
	}
	$scope.saveServingType = function() {
		if($scope.STFormId !== null) {
			$scope.updateST();
		} else {
			$scope.insertST();
		}
	}
	$scope.insertST = function() {
		item = {
				"serving_type_desc" : $scope.STFormDesc
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/servingtype/insert',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				$scope.showSTform = false;
				$scope.STFormId = null;
				$scope.STFormDesc = null;
				$scope.STFormEdit = false;
				$scope.getServingTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });		
	}
	$scope.updateST = function() {
		item = {
				"id" : $scope.STFormId,
				"serving_type_desc" : $scope.STFormDesc
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/servingtype/update',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				$scope.showSTform = false;
				$scope.STFormId = null;
				$scope.STFormDesc = null;
				$scope.STFormEdit = false;	
				$scope.getServingTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });	
	}
});