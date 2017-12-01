
require('./nav-side.css');

var _mm = require('utill/mm.js');
var navSideTemplate = require('./nav-side.string');

var navSide = {
    option: {
        name: '',
        navList: [
            {
                name: 'user-center',
                desc: '个人中心',
                link: './user-center.html'
            },
            {
                name: 'order-list',
                desc: '我的订单',
                link: './order-list.html'
            },
            {
                name: 'pass-update',
                desc: '修改密码',
                link: './pass-update.html'
            },
            {
                name: 'about',
                desc: '关于mmall',
                link: './about.html'
            }
        ]
    },
    init: function(option){
        //合并2个对象，不改变对象的结构
        $.extend(this.option, option);
        this.onLoad();
    },
    onLoad: function(){
        //选中active
        var len = this.option.navList.length;
        for(var i = 0; i < len; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        var html = _mm.renderHtml(navSideTemplate, {
            navList: this.option.navList
        });
        $('.nav-side').html(html);
    }
}


module.exports = navSide;














