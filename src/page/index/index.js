
require('./index.css');
require('./unslider.js');
require('page/common/nav-simple/nav-simple.js');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var _mm = require('utill/mm.js');
var bannerTemplate = require('./banner.string');



$(function(){

    var bannerHtml = _mm.renderHtml(bannerTemplate);
    $('.banner-con').html(bannerHtml);
    //轮播图
    var slider = $('.banner').unslider({
        speed: 500,
        delay: 3000,
        dots: true
    });

    //前一张、后一张事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        slider.data('unslider')[forward]();
    });

});







