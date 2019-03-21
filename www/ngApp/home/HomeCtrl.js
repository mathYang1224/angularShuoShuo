define(function(require){
	var app = require('app');
	 
	app.controller('HomeCtrl', ["titleService",function (titleService) {
        //更改标题
		titleService.setTitle("首页");
    }]);
});