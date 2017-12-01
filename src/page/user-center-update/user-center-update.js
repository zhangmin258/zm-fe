
require('./user-center-update.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('utill/mm.js');
var _user = require('service/user-service.js');
var userCenterTemplate = require('./user-center-update.string');


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
            name: 'user-center'
        });
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadUserInfo();
    },
    bindEvent: function(){
        var _this = this;
        //点击提交
        $(document).on('click', '#submit', function(){
            _this.submit();
        });
    },
    submit: function(){
        var formData = {
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        }
        var validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.updateUserInformation(formData, function(res){
                formError.hide();
                _mm.successTips(res.msg);
                window.location.href = './user-center.html';
            }, function(err){
                formError.show(err.msg);
            });
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidate: function(formData){
        var result = {
            status: false,
            msg: ''
        }
        //手机号验证
        if(!_mm.validate(formData.phone, 'require')){
            result.msg = '手机号不得为空！';
            return result;
        }
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确！';
            return result;
        }
        //邮箱验证
        if(!_mm.validate(formData.email, 'require')){
            result.msg = '邮箱不得为空！';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确！';
            return result;
        }
        //问题验证
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '问题不得为空！';
            return result;
        }
        //答案验证
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '答案不得为空！';
            return result;
        }
        //全部验证通过
        result.status = true;
        result.msg = '验证通过！';
        return result;
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







