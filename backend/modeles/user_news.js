var mongoose = require('mongoose')
var UserNewsSchema = require('../Schema/user_news') //拿到导出的数据集模块
var UserNews = mongoose.model('user_news', UserNewsSchema) // 编译生成user_news 模型

module.exports = UserNews