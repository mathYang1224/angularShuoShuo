define(function(require){
	var app = require("app");

	require("jquery");

	app.directive("passwordStrengthBar",[function(){
		//返回一个指令定义对象
		return {
			//scope表示从属性中读取值
			scope : {
				"strength" : "@"
			},
			//E级别指令，就是元素级别的指令
			restrict : "E",
			templateUrl : "ngApp/ngDirectives/passwordStrengthBar.html",
			link : function($scope,ele){
				//箭头宽度
				var arrowWidth = $(ele).find("b.arrow").width();
				//bar的宽度
				var barwidth = $(ele).find(".passwordStrengthBar").width();

				//得到位置，脏检查，只有函数有脏检查
				$scope.getPosition = function(){
					return {
						"left" : barwidth / 5 * $scope.strength + (barwidth / 5 - arrowWidth) / 2 + "px"
					}
				}
			}
		}
	}]);
});