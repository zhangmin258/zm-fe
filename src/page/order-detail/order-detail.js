

require('./order-detail.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var navSide = require('page/common/nav-side/nav-side.js');
var orderDetailTemplate = require('./order-detail.string');
var _mm = require('utill/mm.js');
var _order = require('service/order-service.js');

var page = {
    data: {
        orderNo: _mm.getUrlParam('orderNo')
    },
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderDetail();
        this.bindEvent();
    },
    //加载订单详情
    loadOrderDetail: function(){
        var _this = this;
        var content = $('.content');
        content.html('<div class="loading"></dic>');
        var orderNo = this.data.orderNo;
        _order.loadOrderDetail(orderNo, function(res){
            var data = res.data;
            _this.dataFilter(data);
            var orderDetailHtml = _mm.renderHtml(orderDetailTemplate, data);
            content.html(orderDetailHtml);
        }, function(err){
            content.html('<p class="err-tip">'+ err.msg +'</p>');
        });
    },
    dataFilter: function(data){
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    },
    bindEvent: function(){
        var _this = this;
        //点击取消订单
        $('body').on('click', '.order-cancel', function(){
            var confirm = window.confirm('您确定要取消订单吗？');
            var orderNo = $(this).parents('#panel').data('num');
            if(confirm){
                _order.cancelOrder(orderNo, function(res){
                    _mm.successTips('订单取消成功！');
                    _this.loadOrderDetail();
                }, function(err){
                    _mm.errorTips(err);
                });
            }
        });
    }
}


$(function(){
    page.init();
});




