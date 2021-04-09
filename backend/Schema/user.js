// Models/users.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var UsersSchema = new Schema({
    userphone: {
        type: String,
        unique: true
    },
    nickname: {
        type: String
    },
    sex: String,
    thumb: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});
//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else {
        this.meta.updateAt = Date.now();
    }

    next();
})


//查询的静态方法
UsersSchema.statics = {
    fetch: function(cb) { //查询所有数据
        return this
          .find()
          .exec(cb) //回调
        //   .sort('meta.updateAt') //排序
    },
    findById: function(id, cb) { //根据id查询单条数据
        return this
          .findOne({userphone: id})
          .exec(cb)
    }
}

//暴露出去的方法
module.exports = UsersSchema