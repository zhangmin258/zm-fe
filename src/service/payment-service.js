

var _mm = require('utill/mm.js');

var _payment = {
    //获取支付信息
    getPaymentInfo: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },
    //查询订单支付状态
    getOrderStatus: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },
}

module.exports = _payment;





