const NewsDetail = require("../modeles/newsdetail")

const NewsDetailController = {
    /**
     * 获取所有新闻详情
     */
    getAllNewsDetail: (cb, cberr) => {
        NewsDetail.fetch((err, newslist) => {
            if (err) {
                console.log(err)
                cberr(err)
                return false;
            }
            cb(newslist)
        })
    },

    /**
     * 通过id获取新闻详情
     */
    getNewsDetailById: (id, cb, cberr) => {
        NewsDetail.findById(id, (err, newsdetailobj) => {
            if (err) {
                console.log(err)
                cberr(err)
                return false;
            }
            cb(newsdetailobj)
        })
    },

    /**
     * 增加一条新闻详情数据
     */
    addOneNewsDetail: (newsdetailobj, cb) => {
        NewsDetail.findOneAndUpdate({ page_id: newsdetailobj.page_id }, { $setOnInsert: newsdetailobj }, { upsert: true }).then(res => {
            cb(res)
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 增加一条评论
     */
    addOneNewsComment: (newsid, commentobj) => {
        return new Promise((resolve, reject) => {
            NewsDetail.update({ page_id: newsid }, { $addToSet: { comment: commentobj } }).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })

    }
}

module.exports = NewsDetailController