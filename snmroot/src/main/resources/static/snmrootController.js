var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope, $http) {
		$scope.simpleFormInput = "";
		$scope.simpleFormOutput = "";
		$scope.showInput = true;
		$scope.showOutput = false;
		$scope.showRegisterSection = false;
		$scope.registerUsername = "";
		$scope.registerPassword = "";
		$scope.registerEmail = "";
		$scope.showLoginSection = false;
		$scope.loginUsername = "";
		$scope.loginPassword = "";
		$scope.showExerciseSection = false;
		$scope.showExerciseSectionbtn = false;
		$scope.showExerciseSectionresults = false;
		$scope.showSection4 = false;
		$scope.showSection4btn = false;
		$scope.showSection5 = false;
		$scope.showSection6 = false;
		$scope.showServingTypeSection = false;
		$scope.showIngredientTypeSection = false;
		$scope.showITlistSection = false;
		$scope.showISTlistSection = false;
		$scope.showBrandNamelistSection = false;
		$scope.BrandNameFormId = null;
		$scope.BrandNameFormDesc = null;
		$scope.showITForm = false;
		$scope.showISTform = false;
		$scope.showBrandNameForm = false;
		$scope.brandNameFormEdit = false;
		$scope.ingredientTypesList = [];
		$scope.ingredientSubtypeList = [];
		$scope.brandNamesList = [];
		$scope.showIngredientsSection = false;
		$scope.showRecipeSection = false;
		$scope.showDailyTotalsSection = false;
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
			} else {
				$scope.showServingTypeSection = false;
			}
			if (sectionNumber == 8) {
				$scope.showIngredientTypeSection = true;
				$scope.get3ITlists();
				$scope.showITlistSection = false;
				$scope.showISTlistSection = false;
				$scope.showBrandNamelistSection = false;
				$scope.showITForm = false;
				$scope.showISTform = false;
				$scope.showBrandNameForm = false;
				
			} else {
				$scope.showIngredientTypeSection = false;
				$scope.showITlistSection = false;
				$scope.showISTlistSection = false;
				$scope.showBrandNamelistSection = false;
				$scope.showITForm = false;
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
		$scope.simplePost = function() {
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
			$scope.showITForm = false;
			$scope.showISTform = false;
			$scope.showBrandNameForm = false;
		}
		$scope.showIST = function() {
			$scope.showITlistSection = false;
			$scope.showISTlistSection = true;
			$scope.showBrandNamelistSection = false;
			$scope.showITForm = false;
			$scope.showISTform = false;
			$scope.showBrandNameForm = false;
		}
		$scope.showBrands = function() {
			$scope.showITlistSection = false;
			$scope.showISTlistSection = false;
			$scope.showBrandNamelistSection = true;
			$scope.showITForm = false;
			$scope.showISTform = false;
			$scope.showBrandNameForm = false;
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
		$scope.saveBrandName = function() {
				if($scope.BrandNameFormId !== null) {
					$scope.updateBrandName();
				} else {
					$scope.insertBrandName();
				}
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