var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope, $http) {
		// TODO - get rid of these 4 variables
		$scope.simpleFormInput = "";
		$scope.simpleFormOutput = "";
		$scope.showInput = true;
		$scope.showOutput = false;
		// registration page
		$scope.showRegisterSection = false;
		$scope.registerUsername = "";
		$scope.registerPassword = "";
		$scope.registerEmail = "";
		// login page
		$scope.showLoginSection = false;
		$scope.loginUsername = "";
		$scope.loginPassword = "";
		
		// excercise page
		$scope.showExerciseSection = false;
		$scope.showExerciseSectionbtn = false;
		$scope.showExerciseSectionresults = false;
		
		// blank sections for later
		$scope.showSection4 = false;
		$scope.showSection4btn = false;
		$scope.showSection5 = false;
		$scope.showSection6 = false;
		// serving type page - 2 tables, serving_type, serving_type_conversion
		$scope.showServingTypeSection = false;
		$scope.ServingTypesList = [];
		$scope.showSTlistSection = false;
		$scope.showSTform = false;
		$scope.STFormId = null;
		$scope.STFormDesc = null;
		$scope.STFormEdit = false;
		// ingredient type page - 3 tables, ingredient_type, ingredient-subtype, brand_name
		$scope.showIngredientTypeSection = false;
		// ingredient type list variables
		$scope.ingredientTypesList = [];
		$scope.showITlistSection = false;
		$scope.showITform = false;
		$scope.ITFormId = null;
		$scope.ITFormDesc = null;
		$scope.ITFormEdit = false;
		// ingredient subtype list variables
		$scope.ingredientSubtypeList = [];
		$scope.showISTlistSection = false;
		$scope.showISTform = false;
		$scope.ISTFormId = null;
		$scope.ISTFormDesc = null;
		$scope.ISTFormEdit = false;
		// brand name list variables
		$scope.brandNamesList = [];
		$scope.showBrandNamelistSection = false;
		$scope.showBrandNameForm = false;
		$scope.BrandNameFormId = null;
		$scope.BrandNameFormDesc = null;
		$scope.brandNameFormEdit = false;
		
		
		// ingredients page 
		$scope.showIngredientsSection = false;
		// recipes page
		$scope.showRecipeSection = false;
		// daily totals page
		$scope.showDailyTotalsSection = false;
		// eating history page
		$scope.showEatingHistorySection = false;
		$scope.initialize = function() {

		}
		$scope.showSection = function(sectionNumber) {
			if (sectionNumber == 1) {
				$scope.showRegisterSection = true;
			} else {
				$scope.showRegisterSection = false;
			}
			if (sectionNumber == 2) {
				$scope.showLoginSection = true;
			} else {
				$scope.showLoginSection = false;
			}
			if (sectionNumber == 3) {
				$scope.showExerciseSection = true;
				$scope.showExerciseSectionbtn = true;
			} else {
				$scope.showExerciseSection = false;
				$scope.showExerciseSectionbtn = false;
				$scope.showExerciseSectionresults = false;
			}
			if (sectionNumber == 4) {
				$scope.showSection4 = true;
				$scope.showSection4btn = true;
			} else {
				$scope.showSection4 = false;
				$scope.showSection4btn = false;
			}
			if (sectionNumber == 5) {
				$scope.showSection5 = true;
			} else {
				$scope.showSection5 = false;
			}
			if (sectionNumber == 6) {
				$scope.showSection6 = true;
			} else {
				$scope.showSection6 = false;
			}
			if (sectionNumber == 7) {
				$scope.showServingTypeSection = true;
				$scope.showSTlistSection = true;
				$scope.showSTform = false;
				$scope.getServingTypeList();
			} else {
				$scope.showServingTypeSection = false;
				$scope.showSTlistSection = false;
				$scope.showSTform = false;
			}
			if (sectionNumber == 8) {
				$scope.showIngredientTypeSection = true;
				// hide the 3 lists
				$scope.showITlistSection = false;
				$scope.showISTlistSection = false;
				$scope.showBrandNamelistSection = false;
				// hide the 3 forms
				$scope.showITform = false;
				$scope.showISTform = false;
				$scope.showBrandNameForm = false;
				$scope.get3ITlists();
			} else {
				$scope.showIngredientTypeSection = false;
				$scope.showITlistSection = false;
				$scope.showISTlistSection = false;
				$scope.showBrandNamelistSection = false;
				$scope.showITform = false;
				$scope.showISTform = false;
				$scope.showBrandNameForm = false;
			}
			if (sectionNumber == 9) {
				$scope.showIngredientsSection = true;
			} else {
				$scope.showIngredientsSection = false;
			}
			if (sectionNumber == 10) {
				$scope.showRecipeSection = true;
			} else {
				$scope.showRecipeSection = false;
			}
			if (sectionNumber == 11) {
				$scope.showDailyTotalsSection = true;
			} else {
				$scope.showDailyTotalsSection = false;
			}
			if (sectionNumber == 12) {
				$scope.showEatingHistorySection = true;
			} else {
				$scope.showEatingHistorySection = false;
			}
		}
		/*$scope.simplePost = function() {
			$scope.showInput = false;
			item = {
				"inputTextField" : $scope.simpleFormInput
			};
			var json = JSON.stringify(item);
			var req = {
				method : 'POST',
				url : '/snmroot/root/simplePost',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : json
			};
			$http(req).then(function(response) {
				data = response.data;
				console.log('Body:', data);
				var results = data.results;
				$scope.simpleFormOutput = results;
				$scope.showOutput = true;
			});
		}*/
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
				var results = data.results;
				$scope.simpleFormOutput = results;
				$scope.showOutput = true;
			});
		}
		$scope.login = function() {
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
				$scope.simpleFormOutput = results;
				$scope.showOutput = true;
			});
		}
		$scope.findExercise = function() {
			$http.get('/snmroot/root/one').then(function(response) {
				data = response.data;
				console.log('Body:', data);
				var results = data.results;
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
		$scope.updateServingType = function(servingType) {
			$scope.showSTform = true;
			if (servingType == 'new') {
				$scope.STFormId = null;
				$scope.STFormDesc = null;
				$scope.STFormEdit = false;
			} else {
				console.log('serving_type id # = ' + servingType.id);
				$scope.STFormId = servingType.id;
				$scope.STFormDesc = servingType.serving_type_desc;
				$scope.STFormEdit = true;
			}
			
		}
		$scope.updateIngredientType = function(ingredientType) {
			$scope.showITform = true;
			if (ingredientType == 'new') {
				$scope.ITFormId = null;
				$scope.ITFormDesc = null;
				$scope.ITFormEdit = false;
			} else {
				console.log('ingredient_type id # = ' + ingredientType.id);
				$scope.ITFormId = ingredientType.id;
				$scope.ITFormDesc = ingredientType.ingredient_type_desc;
				$scope.ITFormEdit = true;
			}
			
		}
		$scope.updateIngredientSubtype = function(ingredientSubtype) {
			$scope.showISTform = true;
			if (ingredientSubtype == 'new') {
				$scope.ISTFormId = null;
				$scope.ISTFormDesc = null;
				$scope.ISTFormEdit = false;
			} else {
				console.log('ingredient_subtype id # = ' + ingredientSubtype.id);
				$scope.ISTFormId = ingredientSubtype.id;
				$scope.ISTFormDesc = ingredientSubtype.ingredient_subtype_desc;
				$scope.ISTFormEdit = true;
			}
			
		}
		$scope.updateBrand = function(brand) {
			$scope.showBrandNameForm = true;
			if (brand == 'new') {
				$scope.BrandNameFormId = null;
				$scope.BrandNameFormDesc = null;
				$scope.brandNameFormEdit = false;
			} else {
				console.log('brand id # = ' + brand.id);
				$scope.BrandNameFormId = brand.id;
				$scope.BrandNameFormDesc = brand.brand_name_desc;
				$scope.brandNameFormEdit = true;
			}
			
		}
		$scope.deleteServingType = function(id) {
			console.log('serving type id to be deleted = ' + id);
			var url = '/snmroot/servingtype/delete/' + id;
			$http.delete(url).then(function(response) {
					status = response.status;
					console.log('status = ', status);
					$scope.getServingTypeList();
				});
		}
		$scope.deleteIngredientType = function(id) {
			console.log('ingredient type id to be deleted = ' + id);
			var url = '/snmroot/ingredienttype/maintype/delete/' + id;
			$http.delete(url).then(function(response) {
					status = response.status;
					console.log('status = ', status);
					$scope.getIngredientTypeList();
				});
		}
		$scope.deleteIngredientSubtype = function(id) {
			console.log('ingredient subtype id to be deleted = ' + id);
			var url = '/snmroot/ingredienttype/subtype/delete/' + id;
			$http.delete(url).then(function(response) {
					status = response.status;
					console.log('status = ', status);
					$scope.getIngredientSubtypeList();
				});
		}
		$scope.deleteBrand = function(id) {
			console.log('brand id to be deleted = ' + id);
			var url = '/snmroot/ingredienttype/brand/delete/' + id;
			$http.delete(url).then(function(response) {
					status = response.status;
					console.log('status = ', status);
					$scope.getBrandNameList();
				});
		}
		$scope.saveServingType = function() {
			if($scope.STFormId !== null) {
				$scope.updateST();
			} else {
				$scope.insertST();
			}
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
				});		
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
				});	
		}
	});