

var _mm = require('utill/mm.js');

var _address = {
    //获取地址列表
    getAddressList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageNum: 1,
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    //提交添加收货地址表单信息
    addAddress: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //提交编辑收货地址表单信息
    updateAddress: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //编辑收货地址
    editAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    //删除收货地址
    delateAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
}


module.exports = _address;














