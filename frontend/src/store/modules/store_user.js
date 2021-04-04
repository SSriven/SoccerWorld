/**
 * 保存用户登陆信息
 */
const actions = {}
const mutations = {
    handleUserName: (state, user_id) => {
        state.user_id = user_id
            // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
        localStorage.setItem('user_id', user_id)
    },
    handleLastLoginTime: (state, last_login_time) => {
        state.last_login_time = last_login_time
        // 把用户登录时间保存到localStorage中，防止页面刷新，导致vuex重新启动
        localStorage.setItem('last_login_time', last_login_time)
    }
}
const state = {
    user_id: '' || localStorage.getItem('user_id'),
    // valid_time:2592000000,
    last_login_time:''|| localStorage.getItem('last_login_time')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    user_id: (state) => state.user_id,
    last_login_time: (state) => state.last_login_time
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }