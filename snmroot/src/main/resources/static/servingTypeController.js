/**
 * this will have the controller for the serving type page
 */
app.controller('servingTypeCtrl', function($scope, $http, $location, $timeout, loginProperties) {
	// serving type page - 2 tables, serving_type, serving_type_conversion
	// error messaging
	$scope.errors = [];
	$scope.hasError = false;
	$scope.viewOnly = true;
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
		$scope.validate();
		$scope.getServingTypeList();
	}
	$scope.testServingTypeForm = function() {
		if($scope.STFormDesc==null||!$scope.STFormDesc.length) {
			$scope.servingTypeFormError = true;
		} else {
			$scope.servingTypeFormError = false;
		}
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
			$scope.errors = response.data.message;
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
		item = {
				"account" : {
				    "id": loginProperties.getAccountId(),
				    "username": loginProperties.getusername(),
				    "admin": loginProperties.getAdmin(),
				    "validated": loginProperties.getValidated(),
				    "token": loginProperties.getLogintoken(),
				    "admintoken": loginProperties.getAdmintoken(),
				    "subscribertoken": loginProperties.getSubscribertoken()
				},
				"servingType" : {
					"id" : id
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/servingtype/delete',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				console.log('message = ', data.message);
				loginProperties.setAdmintoken(data.adminToken);
				loginProperties.setLogintoken(data.loginToken);
				$scope.getServingTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors = response.data.message;
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
				"account" : {
				    "id": loginProperties.getAccountId(),
				    "username": loginProperties.getusername(),
				    "admin": loginProperties.getAdmin(),
				    "validated": loginProperties.getValidated(),
				    "token": loginProperties.getLogintoken(),
				    "admintoken": loginProperties.getAdmintoken(),
				    "subscribertoken": loginProperties.getSubscribertoken()
				},
				"servingType" : {
					"serving_type_desc" : $scope.STFormDesc
				}
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
				loginProperties.setLogintoken(data.account.token);
				loginProperties.setAdmintoken(data.account.admintoken);
				$scope.getServingTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors = response.data.message;
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });		
	}
	$scope.updateST = function() {
		item = {
				"account" : {
				    "id": loginProperties.getAccountId(),
				    "username": loginProperties.getusername(),
				    "admin": loginProperties.getAdmin(),
				    "validated": loginProperties.getValidated(),
				    "token": loginProperties.getLogintoken(),
				    "admintoken": loginProperties.getAdmintoken(),
				    "subscribertoken": loginProperties.getSubscribertoken()
				},
				"servingType" : {
					"id" : $scope.STFormId,
					"serving_type_desc" : $scope.STFormDesc
				}
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
				loginProperties.setLogintoken(data.account.token);
				loginProperties.setAdmintoken(data.account.admintoken);
				$scope.getServingTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors = response.data.message;
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });	
	}
});