import request from '../http/request.js'


const ip = "192.168.0.10:3000"

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
        console.log("通过id查询用户信息"+userphone)
        return new Promise((resolve,reject)=>{
            request.get(baseUrl+'/findById',{params:{id:userphone}}).then(res=>{
                console.log(res)
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
    }
}



