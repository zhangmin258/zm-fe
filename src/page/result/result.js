
require('./result.css');
require('page/common/nav-simple/nav-simple.js');
var _mm = require('utill/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default';
    var el = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNo = _mm.getUrlParam('orderNo');
        el.find('.orderNum').attr('href', $('.orderNum').attr('href') + orderNo);
    }
    el.show();



});













