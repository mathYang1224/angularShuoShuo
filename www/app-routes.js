define(function (require) {
    //引入app对象
    var app = require('./app');

    // //定义路由！
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
       $urlRouterProvider.otherwise('/home');

       $stateProvider
            .state('root', {
                templateUrl: 'ngApp/root/root.html',
                controllerUrl: 'ngApp/root/RootCtrl',
                controller: 'RootCtrl as rootctrl'
            })
            .state('root.home',{
                "url" : "/home",
                templateUrl: 'ngApp/home/home.html',
                controllerUrl: 'ngApp/home/HomeCtrl',
                controller: 'HomeCtrl as homectrl'
            })
            .state('root.regist',{
                "url" : "/regist",
                templateUrl: 'ngApp/regist/regist.html',
                controllerUrl: 'ngApp/regist/RegistCtrl',
                controller: 'RegistCtrl as registctrl'
            })
            .state('root.login',{
                "url" : "/login",
                templateUrl: 'ngApp/login/login.html',
                controllerUrl: 'ngApp/login/LoginCtrl',
                controller: 'LoginCtrl as loginctrl'
            })
            .state('root.profile',{
                "url" : "/profile",
                templateUrl: 'ngApp/profile/profile.html',
                controllerUrl: 'ngApp/profile/ProfileCtrl',
                controller: 'ProfileCtrl as profilectrl'
            });
    }]);

    //定义一个最大的控制器，目的是控制页面的title
    app.controller("MainCtrl",["titleService",function(titleService){
        this.getTitle = function(){
            return titleService.getTitle();
        }
    }]);

    //页面标题的文字
    app.factory("titleService",function(){
        var title = "";

        return {
            getTitle : function(){
                return title;
            },
            setTitle : function(str){
                title = str;
            }
        }
    });
});