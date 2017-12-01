

require('./cart.css');
var nav = require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var _mm = require('utill/mm.js');
var _cart = require('service/cart-service.js');
var cartTemplate = require('./cart.string');


var page = {
    data :{
        cartInfo: ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadCart();
    },
    loadCart: function(){
        var _this = this;
        _cart.getCartList(function(res){
            var data = res.data;
            _this.renderCart(data);
        }, function(err){
            _this.showError(err.msg);
        });
    },
    bindEvent: function(){
        var _this = this;
        //选中或取消选中单个商品
        $(document).on('click', '.cart-select', function(){
            var productId = $(this).parents('.cart-tr').data('productid');
            if($(this).is(':checked')){
                _cart.getCartSelect(productId, function(res){
                    _this.renderCart(res.data);
                }, function(err){
                    _this.showError(err.msg);
                });
            }else{
                _cart.ungetCartSelect(productId, function(res){
                    _this.renderCart(res.data);
                }, function(err){
                    _this.showError(err.msg);
                });
            }
        });
        //选中或取消选中全部商品
        $(document).on('click', '.cart-select-all', function(){
            if($(this).is(':checked')){
                _cart.getCartSelectAll(function(res){
                    _this.renderCart(res.data);
                }, function(err){
                    _this.showError(err.msg);
                });
            }else{
                _cart.ungetCartSelectAll(function(res){
                    _this.renderCart(res.data);
                }, function(err){
                    _this.showError(err.msg);
                });
            }
        });
        //商品数量的变化
        $(document).on('click', '.cell-count-btn', function(){
            var type = $(this).hasClass('plus') ? 'plus' : 'minus';
            var productId = $(this).parents('.cart-tr').data('productid');
            var count = $(this).siblings('.count');
            var currentCount = parseInt(count.val());
            var minCount = 1;
            var maxCount = parseInt(count.data('max'));
            var newCount = 0;
            if(type === 'plus'){
                if(currentCount >= maxCount){
                    alert('该商品已达到上限，请慎重！');
                    return;
                }
                 newCount = currentCount < maxCount ? currentCount + 1 : maxCount;
            }else if(type === 'minus'){
                if(currentCount <= minCount){
                    alert('该商品已达到下限，请慎重！');
                    return;
                }
                newCount = currentCount > minCount ? currentCount - 1 : minCount;
            }

            _cart.updateCartCount({
                productId: productId,
                count: newCount
            }, function(res){
                _this.renderCart(res.data);
            }, function(err){
                 _this.showError(err.msg);
            });
        });
        //删除购物车的某个商品
        $(document).on('click', '.cart-delete', function(){
            var productId = $(this).parents('.cart-tr').data('productid');
            var confirm = window.confirm('你确定要删除该商品吗？');
            if(confirm){
                _this.deleteCartProduct(productId);
            } 
        });
        //删除选中的商品
        $(document).on('click', '.delete-con', function(){
            var hasSelect = $('.cart-select:checked');
            var selectArr = [];
            var confirm = window.confirm('你确定要删除选中的商品吗？');
            if(confirm){
                $.each(hasSelect, function(index, value){
                    selectArr.push($(value).parents('.cart-tr').data('productid'));
                });
                if(selectArr.length){
                    _this.deleteCartProduct(selectArr.join(','));
                }else{
                    alert('你还没有选中任何商品！');
                    return;
                }
            }
        });
        //去结算
        $(document).on('click', '.submit-btn', function(){
            var cartTotalPrice = parseInt($('.cartTotalPrice').text());
            if(cartTotalPrice > 0){
                window.location.href = './order-confirm.html';   //跳转到订单确认页面
            }else{
                _mm.errorTips('没有需要结算的商品！');
            }
        });
    },
    renderCart: function(data){
        this.filter(data);
        this.data.cartInfo = data;   //将数据缓存起来，以便调用
        var pageWrap = $('.page-wrap');
        pageWrap.html('<div class="loading"></div>');
        var cartHtml = _mm.renderHtml(cartTemplate, data);
        pageWrap.html(cartHtml);

        //更新购物车的数量
        nav.loadCartCount();
    },
    showError: function(errMsg){
        $('.page-wrap').html('<p class="err-tip">'+ errMsg +'</p>');
    },
    filter: function(data){
        data.noEmpty = !!data.cartProductVoList.length;
    },
    deleteCartProduct: function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res.data);
        }, function(err){
            _this.showError(err.msg);
        });
    }
}



$(function(){
    page.init();
});

