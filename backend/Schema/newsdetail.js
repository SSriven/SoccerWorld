// Models/newsdetail.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var NewsDetailSchema = new Schema({
    author: String,
    comment: [],
    content:String,
    label: String,
    page_id: String,
    title: String,
    type: String 
});


//查询的静态方法
NewsDetailSchema.statics = {
    fetch: function(cb) { //查询所有数据
        return this
          .find()
          .exec(cb) //回调
        //   .sort('meta.updateAt') //排序
    },
    findById: function(id, cb) { //根据id查询单条数据
        return this
          .findOne({page_id: id})
          .exec(cb)
    }
}

//暴露出去的方法
module.exports = NewsDetailSchema