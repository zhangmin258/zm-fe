

var _mm = require('utill/mm.js');

var _order = {
    //获取订单的商品信息
    getProductList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    //创建订单
    creatOrder: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    //加载订单列表
    loadOrderList: function(listParam, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    //加载订单详情
    loadOrderDetail: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },
    //取消订单
    cancelOrder: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    }
}


module.exports = _order;











