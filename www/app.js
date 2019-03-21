define(function (require, exports, module) {
	//这是一个CMD规范的模块，为什么突然是CMD了呢？因为这个模块的目的是向外暴露app整体
	//而AMD只能暴露JSON形式的API，不方便，所以就借用了一下CMD的壳子

	//引入依赖
    var angular = require('angular');

    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');
    require('angularfileupload');


    //创建app对象！app对象诞生了！声明依赖ui-router：
    var app = angular.module('app', ['ui.router','angularFileUpload']);

    // initialze app module for angular-async-loader，官网让写的
    asyncLoader.configure(app);

    //向外暴露！
    module.exports = app;
});