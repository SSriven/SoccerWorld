const User = require('../modeles/user')

let defaultUsers = {
    userphone: "",
    nickname: "",
    sex: "男",
    thumb: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
}

const UserController = {
    /**
     * 获取所有用户信息
     */
    getAllUsers: (cb,cberr) => {
        User.fetch((err, users) => {
            if (err) {
                console.log(err)
                cberr(err)
                return false;
            }
            cb(users)
        })
    },

    /**
     * 根据用户手机号查询用户信息，如果查无此人，则插入一条数据
     */
    getUserfindById: (userphone,cb,cberr) => {
        User.findById(userphone, (err, user) => {
            if (err) {
                console.log(err)
                cberr(err)
                return false;
            }
            if (!user) {
                defaultUsers.userphone = userphone
                new User(defaultUsers).save().then(user => {
                    cb(user)
                })
            }
            else
                cb(user)
        })
    }
}

module.exports = UserController