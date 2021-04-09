var mongoose = require('mongoose')
var NewsSchema = require('../Schema/user_history_news') //拿到导出的数据集模块
var NewsHistory = mongoose.model('news_histories', NewsSchema) // 编译生成News 模型

module.exports = NewsHistory