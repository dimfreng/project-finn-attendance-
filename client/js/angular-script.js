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
				$http.post("http://localhost:3000/attendace/login" , 
					{
						"email":$scope.user.name,
						"password":$scope.user.password	
					})
				.success(function(response){

					localStorage.setItem('account' , JSON.stringify(response));
					window.location = "/profile.html";
				})
				.error(function(response){
					alert(response.status);
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
				$scope.user = JSON.parse(localStorage.getItem('account')) || {employee: {} , time: {}};
				if($scope.user.employee.status == "out"){
					$scope.user.button = "Time-In";
					$scope.user.note = "What do you want to do today dude?";
					$scope.user.klase = "#take";
					$scope.user.did = "start"
					document.getElementById('snapshot').style.display = "block";
					document.getElementById('again').style.display = "block";

				}else{
					$scope.user.button = "Time-Out";
					$scope.user.note = "How's your day in Webnified? :D";
					$scope.user.klase = "#taken";
					$scope.user.did = "none"
					document.getElementById('emotion').style.display = "block";

				}

				$scope.getTimeInfo = function(){
					if($scope.user.employee.status == "out"){

						if(localStream){
							localStream.stop();
						}
						console.log(localStorage.getItem('image'));
						$http.post("http://localhost:3000/attendace/goIn" , 
						{
							"id":$scope.user.employee.id.toString(),
							"status":"in",
							"comment":$scope.user.comment,
							"photo_path":localStorage.getItem('image')	
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
						
						$http.post("http://localhost:3000/attendace/goOut" , 
						{
							"employee_id":$scope.user.employee.id,
							"time_id":$scope.user.clock.id,
							"comment":$scope.user.comment,
							"status":"out",
							"feeling":$scope.user.feeling	
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

		])
		
	.directive("dtr",[
		function directive(){
			return {
				"restrict":"A",
				"scope":true,
				"controller":"dtrController"
			};
		}
	])
	.controller("dtrController",[
			"$scope",
			"$http",
			function controller ($scope,$http) {
				$scope.user = JSON.parse(localStorage.getItem('account')) || {employee: {} , time: {}};
				}
		])