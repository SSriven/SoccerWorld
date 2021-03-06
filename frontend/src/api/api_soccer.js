import request from '../http/request.js'


const baseUrl = 'http://192.168.9.96:3000/soccer';
const recommendUrl = 'http://192.168.9.96:3000'

export default {
    /**
     * 获取足球新闻列表
     *  3：英超
        4：意甲
        5：西甲
        6：德甲
        57：更多赛事
     * @param {*} typeid 
     */
    getSoccerNewsList(typeid) {
        // console.log("调用api"+typeid)
        return new Promise((resolve, reject) => {
            request.get(baseUrl, { params: { "typeid": typeid } }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 获取下一页新闻
     * @param {*} typeid 
     * @param {*} last_time 
     */
    getMoreSoccerNewsList(typeid, last_time) {
        console.log("获取下一页新闻：", typeid, last_time);
        return new Promise((resolve, reject) => {
            request.get(baseUrl + "/next", { params: { "typeid": typeid, "last_time": last_time } }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 获取新闻详情页
     * @param {}} pageid 
     * @param {*} typeid 
     */
    getNewsDetail(pageid, typeid) {
        console.log("获取新闻详情页", pageid, typeid)
        return new Promise((resolve, reject) => {
            request.get(baseUrl + "/detail", { params: { "pageid": pageid, "typeid": typeid } }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 添加历史记录
     * @param {*} userphone 
     * @param {*} newsobj 
     */
    addHistory(userphone, newsobj) {
        console.log("添加历史记录", newsobj)
        return new Promise((resolve, reject) => {
            request.post(baseUrl + "/addHistory", { params: { "userphone": userphone, "newsobj": newsobj } }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 添加一条评论
     * @param {*} newsid 
     * @param {*} commentobj 
     */
    addComment(newsid, commentobj) {
        console.log("添加评论", newsid, commentobj);
        return new Promise((resolve, reject) => {
            request.post(baseUrl + "/addComment", { newsid: newsid, commentobj: commentobj }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 获取推荐列表
     * @param {*} userphone 
     */
    getRecommendList(userphone) {
        return new Promise((resolve, reject) => {
            request.get(recommendUrl + "/recommends", { params: { userphone: userphone } }).then(res => resolve(res)).catch(err => reject(err))
        })
    }
}



