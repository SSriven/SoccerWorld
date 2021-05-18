/**
 * 保存足球新闻信息
 */

import matchesData from "../../api/api_data.js"

const actions = {
    /**
     * 获取各大联赛的赛季ID
     */
    getAllMatchesSeasonId:({commit})=>{
        return new Promise((resolve,reject)=>{
            matchesData.getSeasonId().then(res=>{
                commit('handleSeasonIdArr', res)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 获取各大联赛的积分榜
     */
    getMatchesStandingData:({commit},season_id)=>{
        return new Promise((resolve,reject)=>{
            matchesData.getStandingData(season_id).then(res=>{
                commit("handleStandingData",res)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    getPersonGoalsRanking:({commit},season_id)=>{
        return new Promise((resolve,reject)=>{
            matchesData.getPersonRankingGoals(season_id).then(res=>{
                commit('handlePersonGolasRanking',res)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    getPersonAssistRanking:({commit},season_id)=>{
        return new Promise((resolve,reject)=>{
            matchesData.getPersonRankingAssist(season_id).then(res=>{
                commit('handlePersonAssistRanking',res)
                resolve(res)
            }).catch(err=>reject(err))
        })
    }
}
const mutations = {
 
    handleSeasonIdArr:(state,arr)=>{
        state.seasonIdArr = arr
    },

    handleStandingData:(state,data)=>{
        state.standingData = data;
    },

    handlePersonGolasRanking:(state,data)=>{
        state.personGoalsRankingArr = data
    },

    handlePersonAssistRanking:(state,data)=>{
        state.personAssistRankingArr = data
    }

  
}
const state = {
   seasonIdArr:[],//赛季id数组
   standingData:{},//积分榜
   personGoalsRankingArr:[],//进球榜
   personAssistRankingArr:[],//助攻榜

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