const UserRecommends = require("../modeles/user_recommends")

const UserRecommendsController = {

    /**
     * 获取推荐列表
     */
    getRecommendsByUserId: (userphone) => {
        return new Promise((resolve, reject) => {
            UserRecommends.find({ "userphone": userphone }).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })

    }
}

module.exports = UserRecommendsController