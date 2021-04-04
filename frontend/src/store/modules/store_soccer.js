/**
 * 保存足球新闻信息
 */

import soccerData from "../../api/api_soccer.js"

const actions = {
    /**
     * 获取足球新闻列表
     * @param {*} param0 
     * @param {*} typeid 
     */
    getSoccerNewsList({commit},typeid){
        console.log("调用获取足球新闻列表action" , typeid)
        return soccerData.getSoccerNewsList(typeid).then((res,err)=>{
            console.log(res)
            return new Promise((resolve, reject)=>{
                if(res){
                    commit('handleSoccerNewsList',res)
                    resolve(res)
                }
                else
                    reject(err)
            })
        })
    },

    /**
     * 获取下一页新闻
     * @param {*} param0 
     * @param {*} typeid 
     * @param {*} last_time 
     */
    getMoreSoccerNewsList({commit},obj){
        let typeid = obj.typeid;
        let last_time = obj.last_time;
        console.log("调用获取下一页新闻action" , typeid,last_time)
        return soccerData.getMoreSoccerNewsList(typeid,last_time).then((res,err)=>{
            console.log(res)
            return new Promise((resolve,reject)=>{
                if(res){
                    commit('loadMoreNewsList',res)
                    resolve(res)
                }else
                    reject(err)
            })
        })
    }
}
const mutations = {


    handleRecommendNewsList: (state, recommendNewsList) => {
        state.recommendNewsList = recommendNewsList
    },


    handleSoccerNewsList: (state, soccerNewsList) => {
        state.soccerNewsList = soccerNewsList
    },

    loadMoreNewsList:(state, moreNewsList)=>{
        state.soccerNewsList = state.soccerNewsList.concat(moreNewsList)
    }
}
const state = {
    recommendNewsList:[],//推荐新闻
    soccerNewsList:[],    //足球新闻

}
// getters 只会依赖 state 中的成员去更新
const getters = {
    recommendNewsList: (state) => state.recommendNewsList,
    soccerNewsList: (state) => state.soccerNewsList
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }