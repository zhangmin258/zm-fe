

var _mm = require('utill/mm.js');

var _user = {
    //登出
    logout: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            type: 'post',
            success: resolve,
            error: reject
        });
    },
    //获取登录用户信息
    getUserInfo: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            type: 'post',
            success: resolve,
            error: reject
        });
    },
    //用户登录
    login: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            type: 'post',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    //检查用户名是否有效
    checkUserName: function(userName, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            type: 'post',
            data: {
                type: 'username',
                str: userName
            },
            success: resolve,
            error: reject
        });
    },
    //用户注册
    reg: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            type: 'post',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    //根据用户名获取密码提示问题
    getQuestion: function(userName, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            type: 'post',
            data: {
               username: userName
            },
            success: resolve,
            error: reject
        });
    },
    //根据用户名、问题、问题答案获取token值
    getToken: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            type: 'post',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    //修改新密码
    getNewPassword: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            type: 'post',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    //获取用户信息
    getUserInformation: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            type: 'post',
            success: resolve,
            error: reject
        });
    },
    //修改用户信息
    updateUserInformation: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            type: 'post',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    //修改用户密码
    updatePassword: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl(' /user/reset_password.do'),
            type: 'post',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
}

module.exports = _user;











