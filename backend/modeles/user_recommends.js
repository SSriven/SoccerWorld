var mongoose = require('mongoose')
var UserRecommendsSchema = require('../Schema/users_recommends') //拿到导出的数据集模块
var UserRecommends = mongoose.model('users_recommends', UserRecommendsSchema) // 编译生成user_news 模型

module.exports = UserRecommends