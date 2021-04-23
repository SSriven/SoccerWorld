const NewsHistory = require('../modeles/user_history_news')

const NewsController = {
    /**
     * 获取所有新闻列表
     */
    getAllNews: () => {
        return new Promise((resolve, reject) => {
            NewsHistory.find((err, news) => {
                if (err) {
                    reject(err)
                    return false;
                }
                resolve(news)
            })
        })

    },

    /**
     * 通过用户id查询用户的历史足迹
     */
    getHistoryNewsById: (id) => {
        return new Promise((resolve, reject) => {
            NewsHistory.findOne({ userphone: id }, (err, newobj) => {
                if (err) {
                    reject(err)
                    return false;
                }
                if (newobj == null) {
                    new NewsHistory({ userphone: id, history: [] }).save().then(res => {
                        resolve(res)
                    })
                } else {
                    resolve(newobj)
                }
            })
        })

    },

    /**
     * 添加一条历史足迹
     */
    addOneHistoryNews: (userphone, newsobj) => {
        return new Promise((resolve, reject) => {
            NewsHistory.update({ userphone: userphone }, { $pull: { history: { "id": newsobj.id } } }).then(() => {
                NewsHistory.update({ userphone: userphone }, { $addToSet: { history: newsobj } }).then(res => {
                    resolve(res)
                })
            }).catch(err => {
                reject(err)
            })
        })

    }
}

module.exports = NewsController