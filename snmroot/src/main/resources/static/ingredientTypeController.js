/**
 * this will have controllers for the ingredient type, ingredient subtype, and brand name pages
 */
app.controller('ingredientTypeCtrl', function($scope, $http, $location, loginProperties) {
	// error messaging
	$scope.errors = [];
	$scope.hasError = false;
	$scope.username = loginProperties.getusername();
	$scope.logintoken = loginProperties.getLogintoken();
	$scope.admintoken = loginProperties.getAdmintoken();
	$scope.subscribertoken = loginProperties.getSubscribertoken();
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
			$scope.errors.push(response.statusText);
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
			$scope.errors.push(response.statusText);
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
			$scope.errors.push(response.statusText);
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
			$scope.errors.push(response.statusText);
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
		var url = '/snmroot/ingredienttype/maintype/delete/' + id;
		$http.delete(url).then(function(response) {
				status = response.status;
				console.log('status = ', status);
				$scope.getIngredientTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });
	}
	$scope.deleteIngredientSubtype = function(id) {
		console.log('ingredient subtype id to be deleted = ' + id);
		var url = '/snmroot/ingredienttype/subtype/delete/' + id;
		$http.delete(url).then(function(response) {
				status = response.status;
				console.log('status = ', status);
				$scope.getIngredientSubtypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });
	}
	$scope.deleteBrand = function(id) {
		console.log('brand id to be deleted = ' + id);
		var url = '/snmroot/ingredienttype/brand/delete/' + id;
		$http.delete(url).then(function(response) {
				status = response.status;
				console.log('status = ', status);
				$scope.getBrandNameList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
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
				"ingredient_type_desc" : $scope.ITFormDesc
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
				$scope.getIngredientTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });		
	}
	$scope.insertIST = function() {
		item = {
				"ingredient_subtype_desc" : $scope.ISTFormDesc
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
				$scope.getIngredientSubtypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });		
	}
	$scope.insertBrandName = function() {
		item = {
				"brand_name_desc" : $scope.BrandNameFormDesc
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
				$scope.getBrandNameList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });		
	}
	$scope.updateIT = function() {
		item = {
				"id" : $scope.ITFormId,
				"ingredient_type_desc" : $scope.ITFormDesc
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
				$scope.getIngredientTypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });	
	}
	$scope.updateIST = function() {
		item = {
				"id" : $scope.ISTFormId,
				"ingredient_subtype_desc" : $scope.ISTFormDesc
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
				$scope.getIngredientSubtypeList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });	
	}
	$scope.updateBrandName = function() {
		item = {
				"id" : $scope.BrandNameFormId,
				"brand_name_desc" : $scope.BrandNameFormDesc
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
				$scope.getBrandNameList();
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });	
	}
});