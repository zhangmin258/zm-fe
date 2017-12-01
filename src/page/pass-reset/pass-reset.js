

require('./pass-reset.css');
require('page/common/nav-simple/nav-simple.js');
var _mm = require('utill/mm.js');
var _user = require('service/user-service.js');

//表单的错误提示信息
var formError = {
    show: function(msg){
        $('.error-item').show().find('.error-msg').text(msg);
    },
    hide: function(){
        $('.error-item').hide().find('.error-msg').text('');
    }
}


var page = {
    data: {
        userName: '',
        quetion: '',
        answer: '',
        password: '',
        token: ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //第一步：用户名
        $('#submit-userName').on('click', function(){
            var userName = $.trim($('#userName').val());
            if(userName){
                _user.getQuestion(userName, function(res){
                    _this.data.userName = userName;
                    _this.data.quetion = res.data;
                    _this.loadStepAnswer();
                }, function(err){
                    formError.show(err.msg);
                });
            }else{
                formError.show('用户名不得为空！');
            }
        });
        //第二步：密码提示问题和答案
        $('#submit-answer').on('click', function(){
            var answer = $.trim($('#answer').val());
            var formData = {
                username: _this.data.userName,
                question: _this.data.quetion,
                answer: answer
            }
            if(answer){
                _user.getToken(formData, function(res){
                    _this.data.token = res.data;
                    _this.loadStepPassword();
                }, function(err){
                    formError.show(err.msg);
                });
            }else{
                formError.show('密码提示问题答案不得为空！');
            }
        });
        //第三步：新密码
        $('#submit-password').on('click', function(){
            var password = $.trim($('#password').val());
            var formData = {
                username: _this.data.userName,
                forgetToken:  _this.data.token,
                passwordNew: password
            }
            if(password && password.length < 6){
                formError.show('密码不得少于6位！');
            }else if(password && password.length >= 6){
                _user.getNewPassword(formData, function(res){
                    window.location.href = './result.html?type=resetPassword';
                }, function(err){
                    formError.show(err.msg);
                });
            }else if(!password){
                formError.show('新密码不得为空！');
            }
        });
    },
    onLoad: function(){
        this.loadStepUserName();
    },
    //第一步：用户名
    loadStepUserName: function(){
        $('.step-userName').show();
    },
    //第二步：密码提示问题和答案
    loadStepAnswer: function(){
        var quetion = this.data.quetion;
        formError.hide();
        $('.step-userName').hide().siblings('.step-answer').show().find('.quetion').text(quetion);
    },
    //第三步：新密码
    loadStepPassword: function(){
        formError.hide();
        $('.step-answer').hide().siblings('.step-password').show();
    }
}



$(function(){
    page.init();
});














