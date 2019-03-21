define(function(require){
	var app = require("app");

	app.factory("passwordStrengthService",[function(){
		function caclStrength(password){
			if(password == undefined || password == "") return;


			//从双向绑定拿值
			var level = 0;
            if(password.match(/[a-z]/g)){level++;}
            if(password.match(/[0-9]/g)){level++;}
            if(password.match(/[A-Z]/g)){level++;}
            if(password.match(/(.[^a-z0-9A-Z])/g)){level++;}
            if(password.length < 6){
            	level = 0;
            }
            if(level > 4){
            	level = 4;
            }
			return level;
		}

		return {
			caclStrength : caclStrength
		}
	}]);
});