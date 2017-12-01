

require('./order-confirm.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var _mm = require('utill/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var addressTemplate = require('./address-list.string');
var productTemplate = require('./product-list.string');
var addressModal = require('./address-modal.js');

var page = {
    data: {
        selectAddressId: null
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadAddressList();
        this.loadProductList();
    },
    loadAddressList: function(){
        var _this = this;
        var addressCon = $('.address-con');
        addressCon.html('<div class="loading"></div>');
        _address.getAddressList(function(res){
            _this.addressFilter(res.data);
            var addressListHtml = _mm.renderHtml(addressTemplate, res.data);
            addressCon.html(addressListHtml);
        }, function(err){
             addressCon.html('<p class="err-tip">'+ err.msg +'</p>');
        });
    },
    addressFilter: function(data){
        if(this.data.selectAddressId){
            var _this = this;
            var selectAddressFlag = false;
            $.each(data.list, function(index, value){
                if(value.id === _this.data.selectAddressId){
                    value.isActive = true;
                    selectAddressFlag = true;
                }
            });
            if(!selectAddressFlag){
                this.data.selectAddressId = null;
            }
        }
    },
    loadProductList: function(){
        var productCon = $('.product-con');
        productCon.html('<div class="loading"></div>');
        _order.getProductList(function(res){
            var productListHtml = _mm.renderHtml(productTemplate, res.data);
            productCon.html(productListHtml);
        }, function(err){
             productCon.html('<p class="err-tip">'+ err.msg +'</p>');
        });
    },
    bindEvent: function(){
        var _this = this;
        //点击添加新地址
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate: false,  //true: 编辑地址； false：添加地址
                isSelect: false,
                onSuccess: function(){
                    _this.loadAddressList();
                }
            });
        });
        //点击编辑地址
        $(document).on('click', '.address-edit', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.editAddress(shippingId, function(res){
                addressModal.show({
                    isUpdate: true,  //true: 编辑地址； false：添加地址
                    isSelect: true,
                    data: res.data,
                    onSuccess: function(){
                        _this.loadAddressList();
                    }
                });
            }, function(err){
                _mm.errorTips(err.msg);
            });
        });
        //点击删除地址
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            var confirm = window.confirm('你确定要删除该地址吗？');
            if(confirm){
                _address.delateAddress(shippingId, function(res){
                    _mm.successTips(res.data);
                    _this.loadAddressList();
                }, function(err){
                    _mm.errorTips(err.msg);
                });
            }
        });
        //点击选中地址
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectAddressId = $(this).data('id');
        });
        //点击提交订单
        $(document).on('click', '.order-submit', function(){
            var shippingId =  _this.data.selectAddressId;
            if(!shippingId){
                alert('请选择收货地址！');
                return;
            }
            _order.creatOrder(shippingId, function(res){
                window.location.href = './payment.html?orderNo=' + res.data.orderNo;
            }, function(err){
                _mm.errorTips(err.msg);
            });
        });
    }
}



$(function(){
    page.init();
});





