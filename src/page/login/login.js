
require('./login.css');
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
            password: $.trim($('#password').val())
        }
        var validateResult = this.formValidate(formData);
        if(validateResult.status){   //表单验证成功
            _user.login(formData, function(res){
                window.location.href = './result.html?type=login';
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
        //全部验证通过
        result.status = true;
        result.msg = '验证通过！';
        return result;
    }
}



$(function(){
    page.init();
});



