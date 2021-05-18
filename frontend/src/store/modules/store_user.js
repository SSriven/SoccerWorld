import userData from "../../api/api_users"

/**
 * 保存用户登陆信息
 */
const actions = {
    /**
     * 获取所有用户信息
     */
    getUserList:()=>{
        return new Promise((resolve,reject)=>{
            userData.getAllUsersList().then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },

    /**
     * 通过userphone获取用户信息
     */
    getUserById:({commit},userphone)=>{
        return new Promise((resolve,reject)=>{
            userData.getUserfindById(userphone).then(res=>{
                commit('handleUserInfo',res)
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },

    /**
     * 上传用户头像
     */
    uploadUserImg:({commit},obj)=>{
        return new Promise((resolve,reject)=>{
            userData.uploadUserImg(obj.imgData).then(res=>{
                userData.modifyUserThumb(obj.userphone,obj.oldpath,res).then(()=>{
                    commit('handleUserImg',res)
                })
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },

    /**
     * 修改用户性别
     */
    modifySex:({commit},obj)=>{
        return new Promise((resolve,reject)=>{
            userData.modifyUserSex(obj.userphone,obj.user_sex).then((res)=>{
                console.log(res)
                commit('handleUserSex',obj.user_sex)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 修改用户昵称
     */
    modifyNickName:({commit},obj)=>{
        return new Promise((resolve,reject)=>{
            userData.modifyUserNickName(obj.userphone,obj.nickname).then(res=>{
                console.log(res)
                commit('handleUserNickName',obj.nickname)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    findUserHistories:({commit},userphone)=>{
        return new Promise((resolve,reject)=>{
            userData.findUserHistories(userphone).then(res=>{
                commit('handleUserHistoriesAndNews',res)
                resolve(res)
            }).catch(err=>reject(err))
        })
    }
}
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
    },
    handleUserInfo:(state,user)=>{
        state.user_sex = user.sex,
        state.user_thumb = user.thumb,
        state.user_nickname = user.nickname
    },
    handleUserImg:(state,img)=>{
        state.user_thumb = img
    },
    handleUserSex:(state,sex)=>{
        state.user_sex = sex
    },
    handleUserNickName:(state,nickname)=>{
        state.user_nickname = nickname
    },
    handleUserHistoriesAndNews:(state,res)=>{
        state.histories = res.history.reverse();
        state.mynews = res.mynews;
    },
    handleCurrentTab:(state,tab)=>{
        state.currentTab = tab;
    },
    clearAllData:(state)=>{
        state.user_id = '';
        state.sex = '';
        state.thumb = '';
        state.user_nickname = '';
        state.last_login_time = '';
        state.histories = [];
        state.mynews = [];
        state.currentTab = 1;
    }
}
const state = {
    user_id: '' || localStorage.getItem('user_id'),
    // valid_time:2592000000,
    last_login_time:''|| localStorage.getItem('last_login_time'),
    user_sex:'',
    user_thumb:'',
    user_nickname:'',
    histories:[],
    mynews:[],
    currentTab:1
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    user_id: (state) => state.user_id,
    last_login_time: (state) => state.last_login_time,
    user_sex:(state)=>state.user_sex,
    user_thumb:(state)=>state.user_thumb,
    user_nickname:(state)=>state.user_nickname,
    his_number:state=>state.histories.length,
    mynews_number:state=>state.mynews.length
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }