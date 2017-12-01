
require('./detail.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var _mm = require('utill/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var detailTemplate = require('./detail.string');

var page = {
    data: {
        productId: _mm.getUrlParam('productId') || '',
        detailInfo: ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        if(!this.data.productId){
            _mm.homePage();
        }
        this.loadProductDetail();
    },
    loadProductDetail: function(){
        var _this = this;
        var productId = this.data.productId;
        var pageWrap = $('.page-wrap');
        var detailHtml = '';
        pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(productId, function(res){
            var data = res.data;
            _this.data.detailInfo = data;   //将获取的商品信息存起来，以方便其他地方调用
            _this.filter(data);
            detailHtml = _mm.renderHtml(detailTemplate, data);
            pageWrap.html(detailHtml);
        }, function(err){
             pageWrap.html('<p class="err-tip">'+ err.msg +'</p>');
        }); 
    },
    bindEvent: function(){
        var _this = this;
        //图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        });
        //count操作
        $(document).on('click', '.p-count-btn', function(){
            var type = $(this).hasClass('minus') ? 'minus' : 'plus';
            var currentCount = parseInt($('.p-count').val());
            var minCount = 1;
            var maxCount = _this.data.detailInfo.stock ? _this.data.detailInfo.stock : 1;
            if(type === 'plus'){
                $('.p-count').val(currentCount < maxCount ? currentCount + 1 : maxCount);
            }else if(type === 'minus'){
                $('.p-count').val(currentCount > minCount ? currentCount - 1 : minCount);
            }
        });
        //加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addCartCount({
                productId: _this.data.productId,
                count: parseInt($('.p-count').val())
            }, function(res){
                window.location.href = './result.html?type=addCurt';
            }, function(err){
                _mm.errorTips(err.msg);
            });
        });

    },
    filter: function(data){
        data.subImages = data.subImages.split(',');
    }
}





$(function(){
    page.init();
});









