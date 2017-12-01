
require('./about.css');
require('page/common/nav/nav.js');
require('page/common/header-common/header-common.js');
var navSide = require('page/common/nav-side/nav-side.js');


var page = {
    init: function(){
        navSide.init({
            name: 'about'
        });
    }
}


$(function(){
    page.init();
});



