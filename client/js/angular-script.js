angular
	.module("finn",[])
	.config(["$httpProvider",
		function ($httpProvider) {  
		  $httpProvider.defaults.headers.common = {};		  
		  $httpProvider.defaults.headers.put = {};
		  $httpProvider.defaults.headers.patch = {};
		}
	])
	.directive("check" , [
		function directive (){
			return {
				"restrict":"A",
				"scope":true,
				"link": function onLink ( scope , element , attr ) {
					if ( localStorage.getItem('account') ) {
						window.location = "/profile.html";
					}
				}			
			};
		}
	])
	.directive("checkit" , [
		function directive (){
			return {
				"restrict":"A",
				"scope":true,
				"link": function onLink ( scope , element , attr ) {
					if ( !localStorage.getItem('account') ) {
						window.location = "/login.html";
					}
				}			
			};
		}
	])

	.directive("login",[
		function directive(){
			return {
				"restrict":"A",
				"scope":true,
				"controller":"loginController"
			};
		}
	])
	.controller("loginController",[
		"$scope",
		"$http",
		function controller($scope,$http){
			$scope.passIt = function(){
				$http.post("http://192.168.1.36:3000/hero/login_attempt" , 
					{
						"username_or_email":$scope.user.name,
						"login_password":$scope.user.password	
					})
				.success(function(response){

					localStorage.setItem('account' , JSON.stringify(response));
					window.location = "/profile.html";
				})
				.error(function(response){
					console.log(response);
				});
			}
		}
	])
	.directive("profile",[
		function directive(){
			return {
				"restrict":"A",
				"scope":true,
				"controller":"profileController"
			};
		}
	])
	.controller("profileController",[
			"$scope",
			"$http",
			function controller ($scope,$http) {
				$scope.user = JSON.parse(localStorage.getItem('account')) || {};
			
				console.log($scope.user.id);
				if($scope.user.status){
					$scope.user.button = "Time-In";
					$scope.user.note = "What do you want to do today dude?";
				}else{
					$scope.user.button = "Time-Out";
					$scope.user.note = "How's your day in Webnified? :D";
				}

				$scope.getTimeInfo = function(){
					if($scope.user.status){

						if(localStream){
							localStream.stop();
						}
						alert("you have successfully login");
						$http.post("http://192.168.1.36:3000/hero/time" , 
						{
							"hero_id":$scope.user.id.toString(),
							"status":"false",
							"photo_path":"hello"	
						})
						.success(function(response){
							localStorage.clear();
							localStorage.setItem('account' , JSON.stringify(response));
							window.location = "/profile.html";
						})
						.error(function(response){
							alert(response);
						});		
					}
					else{

						if(localStream){
							localStream.stop();
						}
						alert("you have successfully logout");
						$http.post("http://192.168.1.36:3000/hero/time" , 
						{
							"hero_id":$scope.user.id,
							"status":"true",
							"photo_path":"hello"	
						})
						.success(function(response){
							localStorage.clear();
							window.location ="/login.html";
						})
						.error(function(response){
							alert("error");
						});
					}
				
				}
			},

		]);