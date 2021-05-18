const UserNews = require("../modeles/user_news")
const userHis = require("../modeles/user_history_news")

const UserNewsController = {

    /**
     * 获取第一页新闻
     */
    getUserNewsList: () => {
        return new Promise((resolve, reject) => {
            UserNews.find().sort({ "sort_time": -1 }).limit(20).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })
    },
    /**
     * 获取用户发表的动态
     */
    getNextUserNewsList: (lastnewstime) => {
        return new Promise((resolve, reject) => {
            UserNews.find({ "sort_time": { "$lt": lastnewstime } }).sort({ "sort_time": -1 }).limit(20).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })
    },

    /**
     * 根据id查询用户动态
     */
    getUserNewsById:(news_id)=>{
        return new Promise((resolve,reject)=>{
            UserNews.find({news_id:news_id}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 增加一条用户动态
     */
    addOneUserNews: (usernewsobj) => {
        console.log(usernewsobj)
        return new Promise((resolve, reject) => {
            new UserNews(usernewsobj).save().then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })
    },
    /**
     * 在我的发表记录中添加一条记录
     */
    addNewsToUser: (mynewsobj) => {
        // console.log(mynewsobj)
        return new Promise((resolve, reject) => {
            userHis.update({ userphone: mynewsobj.author_id }, { $addToSet: { mynews: mynewsobj } }).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })
    },
    /**
     * 增加一个阅读量
     */
    addReadNumber:(news_id)=>{
        return new Promise((resolve,reject)=>{
            UserNews.update({news_id:news_id},{$inc:{read_num:1}}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    }
}

module.exports = UserNewsController