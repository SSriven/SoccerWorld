// Models/news.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var UserNewsSchema = new Schema({
    author_nickname:String,
    author_id:String,
    author_thumb:String,
    news_id:String,
    news_content:String,
    published_time:String,
    sort_time:String,
    news_title:String,
    read_num:Number
});


module.exports = UserNewsSchema