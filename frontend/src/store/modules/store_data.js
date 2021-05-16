/**
 * 保存足球新闻信息
 */

import matchesData from "../../api/api_data.js"

const actions = {
    getAllMatchesSeasonId:({commit})=>{
        return new Promise((resolve,reject)=>{
            matchesData.getSeasonId().then(res=>{
                commit('handleSeasonIdArr', res)
                resolve(res)
            }).catch(err=>reject(err))
        })
    }
}
const mutations = {
 
    handleSeasonIdArr:(state,arr)=>{
        state.seasonIdArr = arr
    }

  
}
const state = {
   seasonIdArr:[]

}
// getters 只会依赖 state 中的成员去更新
const getters = {
    
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }