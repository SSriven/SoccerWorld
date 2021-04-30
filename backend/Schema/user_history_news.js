// Models/news.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var NewsSchema = new Schema({
    userphone:String,
    history:[],
    mynews:[]
});


module.exports = NewsSchema