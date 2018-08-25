/**
 * this will have controllers for the ingredient type, ingredient subtype, and brand name pages
 */
app.controller('ingredientTypeCtrl', function($scope, $http, $location, $timeout, loginProperties) {
	// error messaging
	$scope.static = "x";
	$scope.errors = [];
	$scope.hasError = false;
	$scope.viewOnly = true;
	// ingredient type page - 3 tables, ingredient_type, ingredient-subtype, brand_name
	// ingredient type list variables
	$scope.ingredientTypesList = [];
	$scope.showITform = false;
	$scope.ITFormId = null;
	$scope.ITFormDesc = null;
	$scope.ITFormEdit = false;
	$scope.ingredientTypeFormError = true;
	$scope.$watch('ITFormDesc',function() {$scope.testIngredientTypeForm();});
	// ingredient subtype list variables
	$scope.ingredientSubtypeList = [];
	$scope.showISTform = false;
	$scope.ISTFormId = null;
	$scope.ISTFormDesc = null;
	$scope.ISTFormEdit = false;
	$scope.ingredientSubtypeFormError = true;
	$scope.$watch('ISTFormDesc',function() {$scope.testIngredientSubtypeForm();});
	// brand name list variables
	$scope.brandNamesList = [];
	$scope.showBrandNameForm = false;
	$scope.BrandNameFormId = null;
	$scope.BrandNameFormDesc = null;
	$scope.brandNameFormEdit = false;
	$scope.brandNameFormError = true;
	$scope.$watch('BrandNameFormDesc',function() {$scope.testBrandNamesForm();});
	$scope.clearErrors = function() {
		$scope.errors = [];
		$scope.hasError = false;
	}
	$scope.initialize = function() {
		$scope.clearErrors();
		$scope.validate();
		$scope.get3ITlists();
	}
	$scope.testIngredientTypeForm = function() {
		if($scope.ITFormDesc==null||!$scope.ITFormDesc.length) {
			$scope.ingredientTypeFormError = true;
		} else {
			$scope.ingredientTypeFormError = false;
		}
	}
	$scope.testIngredientSubtypeForm = function() {
		if($scope.ISTFormDesc==null||!$scope.ISTFormDesc.length) {
			$scope.ingredientSubtypeFormError = true;
		} else {
			$scope.ingredientSubtypeFormError = false;
		}
	}
	$scope.testBrandNamesForm = function() {
		if($scope.BrandNameFormDesc==null||!$scope.BrandNameFormDesc.length) {
			$scope.brandNameFormError = true;
		} else {
			$scope.brandNameFormError = false;
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
	$scope.get3ITlists = function() {
		var url = '/snmroot/ingredienttype/all3lists';
		$http.get(url).then(function(response) {
			data = response.data;
			if(typeof data.ingredientTypes!=="undefined") {
				$scope.ingredientTypesList = data.ingredientTypes;
				console.log('ingredient type length = ' , data.ingredientTypes.length);
			}
			if(typeof data.ingredientSubtypes!=="undefined") {
				$scope.ingredientSubtypeList = data.ingredientSubtypes;
				console.log('ingredient subtype length = ' , data.ingredientSubtypes.length);
			}
			if(typeof data.brands!="undefined") {
				$scope.brandNamesList = data.brands;
				console.log('brands length = ' + data.brands.length);
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
	$scope.getIngredientTypeList = function() {
		var url = '/snmroot/ingredienttype/maintype/all';
		$http.get(url).then(function(response) {
			data = response.data;
			if(typeof data!=="undefined") {
				$scope.ingredientTypesList = data;
				console.log('ingredient type length = ' , data.length);
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
	$scope.getIngredientSubtypeList = function() {
		var url = '/snmroot/ingredienttype/subtype/all';
		$http.get(url).then(function(response) {
			data = response.data;
			if(typeof data!=="undefined") {
				$scope.ingredientSubtypeList = data;
				console.log('ingredient subtype length = ' , data.length);
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
	$scope.getBrandNameList = function() {
		var url = '/snmroot/ingredienttype/brand/all';
		$http.get(url).then(function(response) {
			data = response.data;
			if(typeof data!="undefined") {
				$scope.brandNamesList = data;
				console.log('brands length = ' + data.length);
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
	$scope.showIT = function() {
		$scope.showITlistSection = true;
		$scope.showISTlistSection = false;
		$scope.showBrandNamelistSection = false;
		$scope.showITform = false;
		$scope.showISTform = false;
		$scope.showBrandNameForm = false;
	}
	$scope.showIST = function() {
		$scope.showITlistSection = false;
		$scope.showISTlistSection = true;
		$scope.showBrandNamelistSection = false;
		$scope.showITform = false;
		$scope.showISTform = false;
		$scope.showBrandNameForm = false;
	}
	$scope.showBrands = function() {
		$scope.showITlistSection = false;
		$scope.showISTlistSection = false;
		$scope.showBrandNamelistSection = true;
		$scope.showITform = false;
		$scope.showISTform = false;
		$scope.showBrandNameForm = false;
	}
	$scope.updateIngredientType = function(ingredientType) {
		$scope.showITform = true;
		$scope.ingredientTypeFormError = true;
		if (ingredientType == 'new') {
			$scope.ITFormId = null;
			$scope.ITFormDesc = null;
			$scope.ITFormEdit = false;
		} else {
			$scope.ITFormId = ingredientType.id;
			$scope.ITFormDesc = ingredientType.ingredient_type_desc;
			$scope.ITFormEdit = true;
		}
		
	}
	$scope.updateIngredientSubtype = function(ingredientSubtype) {
		$scope.showISTform = true;
		$scope.ingredientSubtypeFormError = true;
		if (ingredientSubtype == 'new') {
			$scope.ISTFormId = null;
			$scope.ISTFormDesc = null;
			$scope.ISTFormEdit = false;
		} else {
			$scope.ISTFormId = ingredientSubtype.id;
			$scope.ISTFormDesc = ingredientSubtype.ingredient_subtype_desc;
			$scope.ISTFormEdit = true;
		}
		
	}
	$scope.updateBrand = function(brand) {
		$scope.showBrandNameForm = true;
		$scope.brandNameFormError = true;
		if (brand == 'new') {
			$scope.BrandNameFormId = null;
			$scope.BrandNameFormDesc = null;
			$scope.brandNameFormEdit = false;
		} else {
			$scope.BrandNameFormId = brand.id;
			$scope.BrandNameFormDesc = brand.brand_name_desc;
			$scope.brandNameFormEdit = true;
		}
		
	}
	$scope.deleteIngredientType = function(id) {
		console.log('ingredient type id to be deleted = ' + id);
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
				"ingredientType" : {
					"id" : id
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/maintype/delete',
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
				$scope.getIngredientTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });
	}
	$scope.deleteIngredientSubtype = function(id) {
		console.log('ingredient subtype id to be deleted = ' + id);
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
				"ingredientSubtype" : {
					"id" : id
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/subtype/delete',
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
				$scope.getIngredientSubtypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });
	}
	$scope.deleteBrand = function(id) {
		console.log('brand id to be deleted = ' + id);
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
				"brandName" : {
					"id" : id
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/brand/delete',
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
				$scope.getBrandNameList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });
	}
	$scope.saveIngredientType = function() {
		if($scope.ITFormId !== null) {
			$scope.updateIT();
		} else {
			$scope.insertIT();
		}
	}
	$scope.saveIngredientSubtype = function() {
		if($scope.ISTFormId !== null) {
			$scope.updateIST();
		} else {
			$scope.insertIST();
		}
	}
	$scope.saveBrandName = function() {
			if($scope.BrandNameFormId !== null) {
				$scope.updateBrandName();
			} else {
				$scope.insertBrandName();
			}
	}
	$scope.insertIT = function() {
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
				"ingredientType" : {
					"ingredient_type_desc" : $scope.ITFormDesc
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/maintype/insert',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				$scope.showITform = false;
				$scope.ITFormId = null;
				$scope.ITFormDesc = null;
				$scope.ITFormEdit = false;
				loginProperties.setLogintoken(data.account.token);
				loginProperties.setAdmintoken(data.account.admintoken);
				$scope.getIngredientTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });		
	}
	$scope.insertIST = function() {
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
				"ingredientSubtype" : {
					"ingredient_subtype_desc" : $scope.ISTFormDesc
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/subtype/insert',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				$scope.showISTform = false;
				$scope.ISTFormId = null;
				$scope.ISTFormDesc = null;
				$scope.ISTFormEdit = false;
				loginProperties.setLogintoken(data.account.token);
				loginProperties.setAdmintoken(data.account.admintoken);
				$scope.getIngredientSubtypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });		
	}
	$scope.insertBrandName = function() {
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
				"brandName" : {
					"brand_name_desc" : $scope.BrandNameFormDesc
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/brand/insert',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				$scope.showBrandNameForm = false;
				$scope.BrandNameFormId = null;
				$scope.BrandNameFormDesc = null;
				$scope.brandNameFormEdit = false;
				loginProperties.setLogintoken(data.account.token);
				loginProperties.setAdmintoken(data.account.admintoken);
				$scope.getBrandNameList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });		
	}
	$scope.updateIT = function() {
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
				"ingredientType" : {
					"id" : $scope.ITFormId,
					"ingredient_type_desc" : $scope.ITFormDesc
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/maintype/update',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				$scope.showITform = false;
				$scope.ITFormId = null;
				$scope.ITFormDesc = null;
				$scope.ITFormEdit = false;	
				loginProperties.setLogintoken(data.account.token);
				loginProperties.setAdmintoken(data.account.admintoken);
				$scope.getIngredientTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });	
	}
	$scope.updateIST = function() {
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
				"ingredientSubtype" : {
					"id" : $scope.ISTFormId,
					"ingredient_subtype_desc" : $scope.ISTFormDesc
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/subtype/update',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				$scope.showISTform = false;
				$scope.ISTFormId = null;
				$scope.ISTFormDesc = null;
				$scope.ISTFormEdit = false;	
				loginProperties.setLogintoken(data.account.token);
				loginProperties.setAdmintoken(data.account.admintoken);
				$scope.getIngredientSubtypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });	
	}
	$scope.updateBrandName = function() {
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
				"brandName" : {
					"id" : $scope.BrandNameFormId,
					"brand_name_desc" : $scope.BrandNameFormDesc
				}
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/ingredienttype/brand/update',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				$scope.showBrandNameForm = false;
				$scope.BrandNameFormId = null;
				$scope.BrandNameFormDesc = null;
				$scope.brandNameFormEdit = false;
				loginProperties.setLogintoken(data.account.token);
				loginProperties.setAdmintoken(data.account.admintoken);
				$scope.getBrandNameList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.data.message);
				$timeout(function () {
				      $scope.clearErrors();
				  }, 3000);
		    });	
	}
});