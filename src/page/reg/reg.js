
require('./reg.css');
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
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //检测该用户名是否已经被注册
        $('#userName').on('blur', function(){
            var userName = $.trim($(this).val());
            if(userName){
                _user.checkUserName(userName, function(res){
                    formError.hide();
                }, function(err){
                    formError.show(err.msg);
                });
            }
        });
        //点击登录按钮
        $('#submit').on('click', function(){
            _this.submit();
        });
        //按回车键提交
        $('.user-content').on('keyup', function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    submit: function(){
        var formData = {
            username: $.trim($('#userName').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        }
        var validateResult = this.formValidate(formData);
        if(validateResult.status){   //表单验证成功
            _user.reg(formData, function(res){
                window.location.href = './result.html?type=reg';
            }, function(err){
                formError.show(err.msg);
            });
        }else{   //表单验证失败
            formError.show(validateResult.msg);
        }
    },
    //表单验证
    formValidate: function(formData){
        var result = {
            status: false,
            msg: ''
        }
        //用户名验证
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不得为空！';
            return result;
        }
        //密码验证
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不得为空！';
            return result;
        }
        if(formData.password.length < 6){
            result.msg = '密码不得少于6位！';
            return result;
        }
        //确认密码验证
        if(!_mm.validate(formData.passwordConfirm, 'require')){
            result.msg = '确认密码不得为空！';
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = '2次输入密码不一致！';
            return result;
        }
        //手机号码验证
        if(!_mm.validate(formData.phone, 'require')){
            result.msg = '手机号码不得为空！';
            return result;
        }
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号码格式不正确！';
            return result;
        }
        //邮箱地址验证
        if(!_mm.validate(formData.email, 'require')){
            result.msg = '邮箱地址不得为空！';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱地址格式不正确！';
            return result;
        }
        //密码提示问题
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不得为空！';
            return result;
        }
        //密码提示问题答案
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不得为空！';
            return result;
        }

        //全部验证通过
        result.status = true;
        result.msg = '验证通过！';
        return result;
    }
}



$(function(){
    page.init();
});



