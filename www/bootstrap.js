require.config({
    baseUrl: '/',
    //别名
    paths: {
        'angular': 'assets/angular/angular.min',
        'angular-ui-router': 'assets/angular-ui-router/release/angular-ui-router.min',
        'angular-async-loader': 'assets/angular-async-loader/angular-async-loader.min',
        'jquery' : 'assets/jquery/dist/jquery.min',
        'jquery-ui' : 'assets/jquery-ui/jquery-ui.min',
        "bootstrap" : "assets/bootstrap/dist/js/bootstrap.min",
        "angularfileupload" : "assets/angular-file-upload/dist/angular-file-upload.min"
    },
    //声明paths中列出的元素的暴露的接口和依赖
    shim: {
        'angular': {exports: 'angular'},                //暴露的是angular
        'jquery': {exports: 'jquery'},              //暴露的是angular
        'angular-ui-router': {deps: ['angular']},    //依赖的是angular
        'jquery-ui': {deps: ['jquery']} ,            //依赖的是jquery
        'bootstrap': {deps: ['jquery']} ,              //依赖的是jquery
        'angularfileupload' : {deps: ['angular']}   
    }
});


//核心包
require(['angular', './app-routes'], function (angular) {
    //当整个文档就绪之后
    angular.element(document).ready(function () {
        //angular.bootstrap是一个方法，表示启动angular。之前就是人肉用ng-app指令来启动，这里更高级用程序来自动。
        angular.bootstrap(document, ['app']);
        //添加ng-app指令，通过类名添加，实际也可以通过attr
        angular.element(document).find('html').addClass('ng-app');
    });
});