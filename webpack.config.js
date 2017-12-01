



var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');  //html模板插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');  //css独立打包插件(不依赖js)

//环境变量配置  dev(开发环境)   online(线上环境)
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
    return {
        template: './src/view/'+ name +'.html',   //当前模块
        filename: 'view/'+ name +'.html',    //打包后的文件
        title: title,
        favicon: './favicon.ico',
        inject: true,
        hash: true,
        chunks: ['common', name]   //打包的模块
    }
}

//webpack的配置文件
var config = {
    entry: {    //多文件入口配置
        'common': ['./src/page/common/common.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/list.js'],
        'detail': ['./src/page/detail/detail.js'],
        'cart': ['./src/page/cart/cart.js'],
        'order-confirm': ['./src/page/order-confirm/order-confirm.js'],
        'order-list': ['./src/page/order-list/order-list.js'],
        'order-detail': ['./src/page/order-detail/order-detail.js'],
        'login': ['./src/page/login/login.js'],
        'reg': ['./src/page/reg/reg.js'],
        'pass-reset': ['./src/page/pass-reset/pass-reset.js'],
        'user-center': ['./src/page/user-center/user-center.js'],
        'user-center-update': ['./src/page/user-center-update/user-center-update.js'],
        'pass-update': ['./src/page/pass-update/pass-update.js'],
        'result': ['./src/page/result/result.js'],
        'about': ['./src/page/about/about.js'],
        'payment': ['./src/page/payment/payment.js']
    },
    output: {   //多文件出口配置
         path: './dist',
         publicPath: '/dist/',
         filename: 'js/[name].js'
    },
    externals: {   //加载外部的模块
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {
                test: /\.string$/,
                loader: 'html-loader',
                query: {
                    minimize: true,   //加载html-loader的时候，做最小化的压缩
                    removeAttributeQuotes: false   //不删除属性的引号
                }
            }
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            utill: __dirname + '/src/utill',
            image: __dirname + '/src/image',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service'
        }
    },
    plugins: [
        //提取公共模块(js)
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.js'   // 默认会把所有入口节点的公共代码提取出来,生成一个common.js
        }),

        //将css单独打包到多个文件里
        new ExtractTextPlugin("css/[name].css"),

        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('reg', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于mmall')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
    ]
};

if('dev' === WEBPACK_ENV){   //如果是开发环境
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;























