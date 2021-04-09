var mongoose = require('mongoose')
var UsersSchema = require('../Schema/user') //拿到导出的数据集模块
var Users = mongoose.model('users', UsersSchema) // 编译生成Users 模型

module.exports = Users