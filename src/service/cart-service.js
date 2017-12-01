

var _mm = require('utill/mm.js');

var _cart = {
    //获取购物车产品数量
    getCartCount: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    //购物车添加商品
    addCartCount: function(productInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    //获取购物车列表
    getCartList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    //购物车选中某个商品
    getCartSelect: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    //购物车取消选中某个商品
    ungetCartSelect: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    //购物车全选
    getCartSelectAll: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    //取消购物车全选
    ungetCartSelectAll: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    //更新购物车某个产品数量
    updateCartCount: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/update.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    //移除购物车某个产品
    deleteProduct: function(productIds, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    },
}


module.exports = _cart;










