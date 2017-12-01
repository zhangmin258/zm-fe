
require('./nav.css');
var _mm = require('utill/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
    init: function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function(){
        //点击登录按钮
        $('.m-login').on('click', function(){
            _mm.doLogin();
        });
        //点击注册按钮
        $('.m-reg').on('click', function(){
            window.location.href = './reg.html';
        });
        //点击退出按钮
        $('.logout').on('click', function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(err){
                _mm.errorTips(err);
            });
        });
    },
    //加载用户登录信息
    loadUserInfo: function(){
        _user.getUserInfo(function(res){
            $('.ulogin').addClass('hide').siblings('.login').removeClass('hide').find('.user-name').text(res.data.username);
        }, function(err){
            // _mm.errorTips(err.msg);
        });
    },
    //加载购物车的数量
    loadCartCount: function(){
        _cart.getCartCount(function(res){
            $('.cart-count').text(res.data || 0);
        }, function(err){
            $('.cart-count').text(0);
        });
    }
}

module.exports = nav.init();












