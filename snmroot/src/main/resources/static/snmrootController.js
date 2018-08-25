var app = angular.module('myApp', ["ngRoute"]);
	app.config(function($routeProvider) {
		  $routeProvider
		  .when("/", {
		    templateUrl : "home.html"
		  })
		  .when("/home", {
		    templateUrl : "home.html"
		  })
		  .when("/login", {
		    templateUrl : "login.html"
		  })
		  .when("/register", {
		    templateUrl : "register.html"
		  })
		  .when("/main", {
		    templateUrl : "main.html"
		  })
		  .when("/servingtypes", {
		    templateUrl : "servingTypes.html"
		  })
		  .when("/ingredienttypes", {
		    templateUrl : "ingredientTypes.html"
		  })
		  .when("/ingredientsubtypes", {
		    templateUrl : "ingredientSubTypes.html"
		  })
		  .when("/brandnames", {
		    templateUrl : "brandNames.html"
		  })
		  .when("/logout", {
		    templateUrl : "home.html"
		  });
		});
	app.service('loginProperties', function () {
		var accountid = { accountid : null };
        var username = { username : null };
        var validated = { validated : null };
        var admin = { admin : null };
        var logintoken = { logintoken : null };
        var admintoken = { admintoken : null };
        var subscribertoken = { subscribertoken : null };

        return {
        	getAccountId: function() {
        		return accountid.accountid;
        	},
	        setAccountId: function(value) {
	        	accountid.accountid = value;
	        },
            getusername: function () {
                return username.username;
            },
            setUsername: function(value) {
            	username.username = value;
            },
            getValidated: function() {
            	return validated.validated;
            },
            setValidated: function(value) {
            	validated.validated = value;
            },
            getAdmin: function() {
            	return admin.admin;
            },
            setAdmin: function(value) {
            	admin.admin = value;
            },
            getLogintoken: function() {
            	return logintoken.logintoken;
            },
            setLogintoken: function(value) {
            	logintoken.logintoken = value;
            },
            getAdmintoken: function() {
            	return admintoken.admintoken;
            },
            setAdmintoken: function(value) {
            	admintoken.admintoken = value;
            },
            getSubscribertoken: function() {
            	return subscribertoken.subscribertoken;
            },
            setSubscribertoken: function(value) {
            	subscribertoken.subscribertoken = value;
            }
        };
    });
	app.controller('myCtrl', function($scope, $http, $location, loginProperties) {
		// TODO - get rid of these 4 variables
		$scope.simpleFormInput = "";
		$scope.simpleFormOutput = "";
		$scope.username = null;
		$scope.logintoken = null;
		$scope.admintoken = null;
		$scope.subscribertoken = null;
		$scope.showtest = false;
		$scope.showInput = true;
		$scope.showOutput = false;
		// error messaging
		$scope.errors = [];
		$scope.hasError = false;
		// excercise page
		$scope.showExerciseSection = false;
		$scope.showExerciseSectionbtn = false;
		$scope.showExerciseSectionresults = false;
		$scope.exerciseFormError = true;
		//$scope.$watch('loginUsername',function() {$scope.testLogin();});
		// blank sections for later
		$scope.showSection4 = false;
		$scope.showSection4btn = false;
		$scope.showSection5 = false;
		$scope.showSection6 = false;
		
		
		
		// ingredients page 
		$scope.showIngredientsSection = false;
		// recipes page
		$scope.showRecipeSection = false;
		// daily totals page
		$scope.showDailyTotalsSection = false;
		// eating history page
		$scope.showEatingHistorySection = false;
		$scope.clearErrors = function() {
			$scope.errors = [];
			$scope.hasError = false;
		}
		$scope.initialize = function() {
			$scope.clearErrors();
		}
		$scope.closeAlert = function (index) {
		    $scope.errors.splice(index, 1);
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
		$scope.findExercise = function() {
			$http.get('/snmroot/root/one').then(function(response) {
				data = response.data;
				console.log('Body:', data);
				var results = data.results;
			}, function myError(response) {
		        $scope.hasError = true;
				$scope.errors.push(response.statusText);
		    });
		}
		$scope.testExerciseForm = function() {
			$scope.exerciseFormError = false;
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});