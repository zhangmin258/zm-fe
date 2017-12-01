


var Hogan = require('hogan');



var conf = {
    serverHost: ''
}

var _mm = {

    //ajax请求
    request: function(param){
        var _this = this;
        $.ajax({
            url: param.url || '',
            type: param.type || 'get',
            dataType: param.dataType || 'json',
            data: param.data || {},
            success: function(res){
                //请求成功，未登录
                if(res.status === 10){
                    _this.doLogin();   //跳转到登录页面
                    return;
                }
                //请求成功，已登录
                if(res.status === 0){
                    typeof param.success === 'function' && param.success(res);
                    return;
                }
                //请求成功，数据错误
                if(res.status === 1){
                    typeof param.error === 'function' && param.error(res);
                    return;
                }
            },
            error: function(err){
                typeof param.error === 'function' && param.error(err);
            }
        });
    },

    //登录
    doLogin: function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },

    //获取接口地址
    getServerUrl: function(path){
        return conf.serverHost + path;
    },

    //获取url参数的值
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    //渲染html模板
    renderHtml: function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },

    //成功提示
    successTips: function(msg){
        alert(msg || '操作成功！');
    },

    //错误提示
    errorTips: function(msg){
        alert(msg || '哪里不对了');
    },

    //表单验证
    validate: function(value, type){
        var value = $.trim(value);
        //非空验证
        if(type === 'require'){
            return !!value;
        }
        //手机号码验证
        if(type === 'phone'){
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if(type === 'email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },

    //跳转首页
    homePage: function(){
        window.location.href = './index.html';
    }

}




module.exports = _mm;


















