

require('./payment.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var _payment = require('service/payment-service.js');
var paymentTemplate = require('./payment.string');
var _mm = require('utill/mm.js');

var page = {
    data: {
        orderNo: _mm.getUrlParam('orderNo')
    },
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        var _this = this;
        var pageWrap = $('.page-wrap');
        pageWrap.html('<div class="loading"></div>');
        var orderNo = this.data.orderNo;
        _payment.getPaymentInfo(orderNo, function(res){
            var paymentHtml = _mm.renderHtml(paymentTemplate, res.data);
            pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(err){
            pageWrap.html('<p class="err-tip">'+ err.msg +'</p>');
        });
    },
    //监听订单状态
    listenOrderStatus: function(){
        var _this = this;
        var paymentTimer = window.setInterval(function(){
            _payment.getOrderStatus(_this.data.orderNo, function(res){
                // if(res.data == true){
                    window.location.href = './result.html?type=payment&orderNo=' + _this.data.orderNo;
                // }
            }, function(err){
                _mm.errTips(err);
            });
        }, 5e3);
    }
}

$(function(){
    page.init();
});





