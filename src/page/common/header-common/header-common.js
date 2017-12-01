

require('./header-common.css');

var _mm = require('utill/mm.js');

var header = {
    init: function(){
        this.onLoad();
        this.bindEvend();
    },
    //参数回填
    onLoad: function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvend: function(){
        var _this = this;
        //点击搜索按钮
        $('#search-btn').on('click', function(){
            _this.searchSubmit();
        });
        //按回车键提交
        $('#search-input').on('keyup', function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    searchSubmit: function(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mm.homePage();   //跳回首页
        }
    }
}


$(function(){
    header.init();
});













