
require('./user-center.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('utill/mm.js');
var _user = require('service/user-service.js');
var userCenterTemplate = require('./user-center.string');

var page = {
    init: function(){
        navSide.init({
            name: 'user-center'
        });
        this.onLoad();
    },
    onLoad: function(){
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function(){
        _user.getUserInformation(function(res){
            var userHtml = _mm.renderHtml(userCenterTemplate, res.data);
            $('.panel-body').html(userHtml);
        }, function(err){
            _mm.errorTips(err.msg);
        });
    }
}


$(function(){
    page.init();
});







