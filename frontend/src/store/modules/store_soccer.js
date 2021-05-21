/**
 * 保存足球新闻信息
 */

import soccerData from "../../api/api_soccer.js"
import userData from "../../api/api_users"

const actions = {
    /**
     * 获取足球新闻列表
     * @param {*} param0 
     * @param {*} typeid 
     */
    getSoccerNewsList({commit},typeid){
        console.log("调用获取足球新闻列表action" , typeid)
        return new Promise((resolve, reject)=>{
            soccerData.getSoccerNewsList(typeid).then(res=>{
                commit('handleSoccerNewsList',res)
                resolve(res)
            }).catch(err=>{
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
        return new Promise((resolve, reject)=>{
            soccerData.getMoreSoccerNewsList(typeid,last_time).then(res=>{
                commit('loadMoreNewsList',res)
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },

    /**
     * 获取第一页用户动态
     * @param {*} param0 
     */
    getUserNewsList({commit}){
        return new Promise((resolve,reject)=>{
            userData.getAllUserNewsList().then(res=>{
                commit("handleUserNewsList",res)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 获取下一页动态
     */
    getNextUserNewsList:({commit},lasttime)=>{
        return new Promise((resolve,reject)=>{
            userData.getNextUserNewsList(lasttime).then(res=>{
                commit("loadMoreUserNewsList",res)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },


    /**
     * 获取推荐列表
     * @param {*} param0 
     * @param {*} userid 
     */
    getRecommendNewsList({commit},userid){
        console.log(userid)
        return new Promise((resolve,reject)=>{
            soccerData.getRecommendList(userid).then(res=>{
                console.log(res[0].recommends)
                commit('handleRecommendNewsList',res[0].recommends)
                resolve(res)
            }).catch(err=>reject(err))
        })
        
    }
}
const mutations = {


    handleRecommendNewsList: (state, data) => {
        state.recommendNewsList = data
    },


    handleSoccerNewsList: (state, soccerNewsList) => {
        state.soccerNewsList = soccerNewsList
    },

    loadMoreNewsList:(state, moreNewsList)=>{
        state.soccerNewsList = state.soccerNewsList.concat(moreNewsList)
    },

    handleUserNewsList:(state,usernewslist)=>{
        state.usernewsList = usernewslist
    },

    loadMoreUserNewsList:(state,moreusernewslist)=>{
        state.usernewsList = state.usernewsList.concat(moreusernewslist)
    }
}
const state = {
    recommendNewsList:[],//推荐新闻
    soccerNewsList:[],    //足球新闻
    usernewsList:[],     //用户动态

}
// getters 只会依赖 state 中的成员去更新
const getters = {
    recommendNewsList: (state) => state.recommendNewsList,
    soccerNewsList: (state) => state.soccerNewsList,
    usernewsList:(state)=>state.usernewsList
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }