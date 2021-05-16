import request from "../http/request"

const baseUrl = 'http://192.168.9.96:3000/data';

export default {
    /**
     * 获取各大联赛的赛季id
     */
    getSeasonId() {
        return new Promise((resolve, reject) => {
            request.get(baseUrl).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })
    },

    /**
     * 获取各大联赛的积分榜
     * @param {*} season_id 
     */
    getStandingData(season_id) {
        return new Promise((resolve, reject) => {
            request.get(baseUrl + '/standing', { params: { season_id: season_id } }).then(res => resolve(res)).catch(err => reject(err))
        })
    },

    /**
     * 获取各大联赛的进球榜
     * @param {*} season_id 
     */
    getPersonRankingGoals(season_id) {
        return new Promise((resolve, reject) => {
            request.get(baseUrl + '/person_ranking', { params: { season_id: season_id, type: "goals" } }).then(res => resolve(res)).catch(err => reject(err))
        })
    },


    /**
     * 助攻榜
     * @param {*} season_id 
     */
    getPersonRankingAssist(season_id) {
        return new Promise((resolve, reject) => {
            request.get(baseUrl + '/person_ranking', { params: { season_id: season_id, type: "assists" } }).then(res => resolve(res)).catch(err => reject(err))
        })
    },

    /**
     * 
     */
    getScheduleData(season_id, gameweek = undefined) {
        return new Promise((resolve, reject) => {
            request.get(baseUrl + '/schedule', { params: { season_id: season_id, gameweek: gameweek } }).then(res => resolve(res)).catch(err => reject(err))
        })
    }
}