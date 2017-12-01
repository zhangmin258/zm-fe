

require('./pagination.css');
var _mm = require('utill/mm.js');
var paginationTemplate = require('./pagination.string');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRender: 3,
        onSelectPage: null
    }
    //点击分页按钮
    $(document).on('click', '.pg-item', function(){
        if($(this).hasClass('active') || $(this).hasClass('disabled')){
            return;
        }
        var newPageNum = $(this).data('value');
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage(newPageNum) : null;
    });
}

//渲染分页组件
Pagination.prototype.render = function(userOption){
    this.option = $.extend({}, this.defaultOption, userOption);   //合并对象
    // console.log(this.option);
    //判断容器是否为合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    //如果当前的数据只有一页，则不显示分页
    if(this.option.pages <= 1){
        return;
    }
    //渲染分页内容
    this.option.container.html(this.getPaginationHtml());
}

//渲染分页内容
Pagination.prototype.getPaginationHtml = function(){
    var option = this.option;
    var html = '';
    var pageArray = [];
    var start = option.pageNum - option.pageRender > 0 ? option.pageNum - option.pageRender : 1;
    var end = option.pageNum + option.pageRender > option.pages ? option.pages : option.pageNum + option.pageRender;
    //上一页
    pageArray.push({
        name: '上一页',
        value: option.prePage,
        disabled: !option.hasPreviousPage
    });

    //数据页
    for(var i = start; i <= end; i ++){
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum),
        });
    }
    //下一页
    pageArray.push({
        name: '下一页',
        value: option.nextPage,
        disabled: !option.hasNextPage
    });

    html = _mm.renderHtml(paginationTemplate, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });

    return html;
}

module.exports = Pagination;














