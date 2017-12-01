require('./pass-update.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('utill/mm.js');
var _user = require('service/user-service.js');

//表单错误提示
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
        navSide.init({
            name: 'pass-update'
        });
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //点击提交按钮
        $(document).on('click', '#submit', function(){
            _this.submit();
        });
    },
    submit: function(){
        var formDate = {
            oldPassword: $.trim($('#old-password').val()),
            newPassword: $.trim($('#new-password').val()),
            newConfirmPassword: $.trim($('#confirm-newPassword').val()),
        }
        var validateResult = this.formValidate(formDate);
        if(validateResult.status){
            _user.updatePassword({
                passwordOld: formDate.oldPassword,
                passwordNew: formDate.newPassword
            }, function(res){
                formError.hide();
                window.location.href = './result.html?type=resetPassword';
            }, function(err){
                formError.show(err.msg);
            });
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidate: function(formDate){
        var result = {
            status: false,
            msg: ''
        }
        //原始密码验证
        if(!_mm.validate(formDate.oldPassword, 'require')){
            result.msg = '原始密码不得为空！';
            return result;
        }
        //新密码验证
        if(!_mm.validate(formDate.newPassword, 'require')){
            result.msg = '新密码不得为空！';
            return result;
        }
        if(formDate.newPassword.length < 6){
            result.msg = '新密码不得少于6位！';
            return result;
        }
        //确认新密码验证
        if(!_mm.validate(formDate.newConfirmPassword, 'require')){
            result.msg = '确认新密码不得为空！';
            return result;
        }
        if(formDate.newPassword !== formDate.newConfirmPassword){
            result.msg = '2次输入密码不一致！';
            return result;
        }
        //验证成功
        result.status = true;
        result.msg = '验证成功';
        return result;
    }
}


$(function(){
    page.init();
});