
require('./list.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var _mm = require('utill/mm.js');
var _product = require('service/product-service.js');
var listTemplate = require('./list.string');
var Pagination = require('utill/pagination/pagination.js');

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 5,
            orderBy: _mm.getUrlParam('orderBy') || 'default',
        }
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadProductList();
    },
    bindEvent: function(){
        //点击排序按钮进行排序
        var _this = this;
        this.data.listParam.pageNum = 1;
        $('.sort-item').on('click', function(){
            //默认排序
            if($(this).data('type') === 'default'){
                if($(this).hasClass('active')){
                    return;
                }
                $(this).addClass('active').siblings('.sort-item').removeClass('active asc desc');
                _this.data.listParam.orderBy = 'default';
            }
            //点击价格排序
            else if($(this).data('type') === 'price'){
                $(this).addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if(!$(this).hasClass('asc')){
                    $(this).addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                     $(this).addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadProductList();
        });
    },
    loadProductList: function(){
        var _this = this;
        var pList = $('.p-list-con');
        pList.html('<div class="loading"></div>');
        var listHtml = '';
        var listParam = this.data.listParam;
        this.data.listParam.keyword ? (delete this.data.listParam.categoryId) : (delete this.data.listParam.keyword);
        _product.getProductList(listParam, function(res){
            var data = res.data;
            listHtml = _mm.renderHtml(listTemplate, {
                list: data.list
            });
            pList.html(listHtml);
            $.each($('.str'), function(index, value){
                var str = $(value).text().substr(0,30) + '...';
                $(value).text(str);
            });
            _this.loadPagination({
                hasPreviousPage: data.hasPreviousPage,
                prePage: data.prePage,
                hasNextPage: data.hasNextPage,
                nextPage: data.nextPage,
                pageNum: data.pageNum,
                pages: data.pages
            });
        }, function(err){
            _mm.errorTips(err.msg)
        });
    },
    loadPagination: function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        var userOption = $.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(newPageNum){
                _this.data.listParam.pageNum = newPageNum;
                _this.loadProductList();
            }
        });
        this.pagination.render(userOption);
    }
}


$(function(){
    page.init();
});













