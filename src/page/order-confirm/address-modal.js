

var _mm = require('utill/mm.js');
var _address = require('service/address-service.js');
var addressModalTemplate = require('./address-modal.string');
var _city = require('utill/city/city.js');

//表单的错误提示
var formError = {
    show: function(msg){
        $('.error-item').show().find('.error-msg').text(msg);
    },
    hide: function(){
        $('.error-item').hide().find('.error-msg').text('');
    }
}

var addressModal = {
    show: function(option){
        this.option = option;
        this.modalWrap = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    loadModal: function(){
        var addressModalHtml = _mm.renderHtml(addressModalTemplate, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
         this.modalWrap.html(addressModalHtml);
         this.loadProvince();
         // this.loadCity();
    },
    //加载省份
    loadProvince: function(){
        var provinceArr = _city.getProvinces() || [];
        var selectProvince = this.modalWrap.find('#receiver-province');
        selectProvince.html(this.getOptionHtml(provinceArr));
        if(this.option.isUpdate && this.option.data.receiverProvince){   //编辑地址，回填省份
            selectProvince.val(this.option.data.receiverProvince);
            this.loadCity(this.option.data.receiverProvince);
        }
    },
    //加载城市
    loadCity: function(provinceName){
        var cityArr = _city.getCities(provinceName) || [];
        var selectCity = this.modalWrap.find('#receiver-city');
        selectCity.html(this.getOptionHtml(cityArr));
        if(this.option.isUpdate && this.option.data.receiverCity && this.option.isSelect){  //编辑地址，回填城市
            selectCity.val(this.option.data.receiverCity);
            this.option.isSelect = false;
        }
    },
    //渲染省份和城市的option
    getOptionHtml: function(optionArr){
        var html = '<option value="">请选择</option>';
        $.each(optionArr, function(index, value){
            html += '<option value="'+ value +'">'+ value +'</option>';
        });
        return html;
    },
    bindEvent: function(){
        var _this = this;
        //根据省份加载城市
        this.modalWrap.find('#receiver-province').on('change', function(){
            var provinceName = $(this).val();
            if(!_this.option.isSelect){
                _this.loadCity(provinceName);
            }
        });
        //提交收货地址
        this.modalWrap.find('#submit').on('click', function(){
            var receiverInfo = _this.getReceiverInfo();
            var isUpdate = _this.option.isUpdate;
            if(!isUpdate){   //添加收货地址
                if(receiverInfo.status){   //验证成功
                    _address.addAddress(receiverInfo.data, function(res){
                         formError.hide();
                        _mm.successTips(res.msg);
                        _this.hide();
                        typeof _this.option.onSuccess === 'function' ? _this.option.onSuccess() : null;
                    }, function(err){
                        formError.show(err.msg);
                    });
                }else{
                    formError.show(receiverInfo.msg);
                }
            }else if(isUpdate){  //编辑收货地址
                if(receiverInfo.status){   //验证成功
                    _address.updateAddress(receiverInfo.data, function(res){
                        formError.hide();
                        _mm.successTips(res.data);
                        _this.hide();
                        typeof _this.option.onSuccess === 'function' ? _this.option.onSuccess() : null;
                    }, function(err){
                        formError.show(err.msg);
                    });
                }else{
                    formError.show(receiverInfo.msg);
                }
            }
        });
        //点击关闭弹窗
        this.modalWrap.find('.close').on('click', function(){
            _this.hide();
        });
        //点击蒙层关闭弹窗
        this.modalWrap.find('.modal-container').on('click', function(e){
            e.stopPropagation();  //阻止事件冒泡
        });
        this.modalWrap.find('.modal').on('click', function(){
            _this.hide();
        });
    },
    //获取表单信息并验证
    getReceiverInfo: function(){
        var receiverInfo = {};
        var result = {
            status: false,
            data: {},
            msg: ''
        }
        receiverInfo.receiverName =  $.trim(this.modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince =  $.trim(this.modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity =  $.trim(this.modalWrap.find('#receiver-city').val());
        receiverInfo.receiverAddress =  $.trim(this.modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone =  $.trim(this.modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip =  $.trim(this.modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate){  //如果是编辑的话，将id传给后台
            receiverInfo.id = this.modalWrap.find('#receiver-id').val();
        }
        //收件人姓名验证
        if(!_mm.validate(receiverInfo.receiverName, 'require')){
            result.msg = '收件人姓名不得为空！';
            return result;
        }
        //所在城市省份验证
        if(!_mm.validate(receiverInfo.receiverProvince, 'require')){
            result.msg = '请选择省份！';
            return result;
        }
        //所在城市城市验证
        if(!_mm.validate(receiverInfo.receiverCity, 'require')){
            result.msg = '请选择城市！';
            return result;
        }
        //详细地址验证
        if(!_mm.validate(receiverInfo.receiverAddress, 'require')){
            result.msg = '详细地址不得为空！';
            return result;
        }
        //手机号码验证
        if(!_mm.validate(receiverInfo.receiverPhone, 'require')){
            result.msg = '手机号码不得为空！';
            return result;
        }
        if(!_mm.validate(receiverInfo.receiverPhone, 'phone')){
            result.msg = '手机号码格式不正确！';
            return result;
        }
        //邮政编码验证
        if(receiverInfo.receiverZip && !/[1-9]\d{5}(?!\d)/.test(receiverInfo.receiverZip)){
            result.msg = '邮政编码格式不正确！';
            return result;
        }
        //全部验证成功
        result.msg = '验证通过！';
        result.status = true;
        result.data = receiverInfo;
        return result;
    },
    hide: function(){
        this.modalWrap.empty();
    }
}

module.exports = addressModal;







