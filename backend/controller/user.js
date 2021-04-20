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
    getAllUsers: (cb, cberr) => {
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
    getUserfindById: (userphone, cb, cberr) => {
        User.findById(userphone, (err, user) => {
            if (err) {
                console.log(err)
                cberr(err)
                return false;
            }
            if (!user) {
                defaultUsers.userphone = userphone
                defaultUsers.nickname = "用户" + userphone
                new User(defaultUsers).save().then(user => {
                    cb(user)
                })
            }
            else
                cb(user)
        })
    },

    /**
     * 修改用户头像
     */
    modifyUserThumb:(userphone,newthumb,cb,cberr)=>{
        User.updateOne({userphone:userphone},{thumb:newthumb},(err,res)=>{
            if(err)
                cberr(err)
            else  cb(res)
        })
    },


    /**
     * 修改用户头像
     */
    modifyUserSex:(userphone,user_sex,cb,cberr)=>{
        User.updateOne({userphone:userphone},{sex:user_sex},(err,res)=>{
            if(err) cberr(err)
            else cb(res)
        })
    },

    /**
     * 修改用户昵称
     */
    modifyUserNickName:(userphone,nickname,cb,cberr)=>{
        User.updateOne({userphone:userphone},{nickname:nickname},(err,res)=>{
            if(err) cberr(err)
            else cb(res)
        })
    }
}

module.exports = UserController