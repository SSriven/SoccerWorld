import request from '../http/request.js'


const ip = "192.168.9.96:3000"

const baseUrl = 'http://'+ip+'/users';

export default {

    /**
     * 获取所有用户信息
     */
    getAllUsersList(){
        return new Promise((resolve,reject)=>{
            request.get(baseUrl).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    },

    /**
     * 通过id查询用户信息
     * @param {* 用户手机号} userphone 
     */
    getUserfindById(userphone){
        return new Promise((resolve,reject)=>{
            request.get(baseUrl+'/findById',{params:{id:userphone}}).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },

    /**
     * 上传用户头像
     * @param {*} userphone 
     * @param {*} imgdata 
     */
    uploadUserImg(imgdata){
        return new Promise((resolve,reject)=>{
            request.post(baseUrl + '/upload',imgdata).then(res=>{
                let imgPath = 'http://'+ip+'/uploads/'+res.path
                resolve(imgPath)
            }).catch(err=>{
                reject(err)
            })
        })
    },

    /**
     * 修改用户头像
     */
    modifyUserThumb:(userphone,oldpath,newpath)=>{
        console.log(userphone,oldpath,newpath)
        return new Promise((resolve,reject)=>{
            request.post(baseUrl + '/modifyThumb',{id:userphone,oldpath:oldpath,newpath:newpath}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 修改用户性别
     */
    modifyUserSex:(userphone,user_sex)=>{
        return new Promise((resolve,reject)=>{
            request.post(baseUrl + '/modifySex',{id:userphone,user_sex:user_sex}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 修改用户昵称
     */
    modifyUserNickName:(userphone,nickname)=>{
        return new Promise((resolve,reject)=>{
            request.post(baseUrl + '/modifyNickName',{id:userphone,nickname:nickname}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 查找用户历史足迹和动态
     */
    findUserHistories:(userphone)=>{
        return new Promise((resolve,reject)=>{
            request.get(baseUrl + "/findUserHistories",{params:{id:userphone}}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 获取用户动态
     */
    getAllUserNewsList:()=>{
        return new Promise((resolve,reject)=>{
            request.get(baseUrl + "/getUserNewsList").then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 获取下一页动态
     */
    getNextUserNewsList:(lasttime)=>{
        return new Promise((resolve,reject)=>{
            request.get(baseUrl + "/getNextUserNewsList",{params:{lasttime:lasttime}}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 增加一条用户动态
     */
    addOneUserNews:(userNewsObj)=>{
        return new Promise((resolve,reject)=>{
            request.post(baseUrl + "/addOneUserNews",{usernewsobj:userNewsObj}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 增加阅读量
     */
    addReadNum:(news_id)=>{
        return new Promise((resolve,reject)=>{
            request.get(baseUrl + "/addReadNum",{params:{news_id:news_id}}).then(res=>{
                resolve(res)
            }).catch(err=>reject(err))
        })
    },

    /**
     * 根据id查询用户动态
     */
    getNewsById:(news_id)=>{
        return new Promise((resolve,reject)=>{
            request.get(baseUrl+"/getUserNewsById",{params:{news_id:news_id}}).then(res=>resolve(res)).catch(err=>reject(err))
        })
    }
}



