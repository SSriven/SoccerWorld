// Models/newsdetail.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var UserRecommends = new Schema({
    userphone:String,
    recommends:[]
});



//暴露出去的方法
module.exports = UserRecommends