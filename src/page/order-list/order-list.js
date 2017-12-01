

require('./order-list.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var navSide = require('page/common/nav-side/nav-side.js');
var orderListTemplate = require('./order-list.string');
var _mm = require('utill/mm.js');
var Pagination = require('utill/pagination/pagination.js');
var _order = require('service/order-service.js');

var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 2
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderList();
    },
    //加载订单列表
    loadOrderList: function(){
        var _this = this;
        var orderListCon = $('.orderList-con');
        orderListCon.html('<div class="loading"></div>');
        var listParam = this.data.listParam;
        _order.loadOrderList(listParam, function(res){
            var data = res.data;
            var orderListHtml = _mm.renderHtml(orderListTemplate, data);
            orderListCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: data.hasPreviousPage,
                prePage: data.prePage,
                hasNextPage: data.hasNextPage,
                nextPage: data.nextPage,
                pageNum: data.pageNum,
                pages: data.pages
            });
        }, function(err){
            orderListCon.html('<p class="err-tip">'+ err.msg +'<div>');
        });
    },
    loadPagination: function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        var userOption = $.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(newPageNum){
                _this.data.listParam.pageNum = newPageNum;
                _this.loadOrderList();
            }
        });
        this.pagination.render(userOption);
    }
}


$(function(){
    page.init();
});




