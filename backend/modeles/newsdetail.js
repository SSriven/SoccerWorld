var mongoose = require('mongoose')
var NewsDetailSchema = require('../Schema/newsdetail') //拿到导出的数据集模块
var NewsDetail = mongoose.model('news_details', NewsDetailSchema) // 编译生成Users 模型

module.exports = NewsDetail