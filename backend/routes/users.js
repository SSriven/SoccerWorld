const express = require('express');
const router = express.Router();
const multer = require('multer')
const UserCon = require('../controller/user')
const NewsCon = require('../controller/user_history_news')
const UserNewsCon = require('../controller/user_news')
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const path = require('path')
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹需要手动创建！！！
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".");
    let strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    let strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符，使用空格代替
    cb(null, file.fieldname + '-' + strUUID2 + "." + fileFormat[fileFormat.length - 1]);
  }
});
//添加配置文件到muler对象。
let upload = multer({
  storage: storage
});

router.get('/', function (req, res, next) {
  UserCon.getAllUsers(users => {
    res.json(users)
  }, err => {
    res.status(404).json(err)
  })
});

/**
 * 根据用户手机号查询用户信息，如果查无此人，则插入一条数据
 */
router.get('/findById', function (req, res, next) {
  let userphone = req.query.id
  UserCon.getUserfindById(userphone, user => {
    res.json(user)
  }, err => {
    res.status(404).json(err)
  })
});

/**
 * 上传头像
 */
router.post('/upload', upload.single('file'), (req, res, next) => {
  let file = req.file;
  console.log(file)
  res.json({ path: file.filename })
})

/**
 * 修改头像
 */
router.post('/modifyThumb', (req, res, next) => {
  let oldpathArr = req.body.oldpath.split("/");
  let newpath = req.body.newpath;
  let userphone = req.body.id;
  let oldpath = oldpathArr[oldpathArr.length-1];
  UserCon.modifyUserThumb(userphone, newpath, (res) => {
    console.log(res)
  }, (err) => console.log(err))
  filepath = path.join(__dirname,"../public/uploads/"+oldpath)
  fs.unlink(filepath, function(err){
    if(err){
     console.log(err);
    }else{
      console.log('文件:'+filepath+'删除成功！');
    }
   })
  res.json({res_code:'0'})
})

/**
 * 修改用户性别
 */
router.post('/modifySex',(req,res,next)=>{
  let userphone = req.body.id;
  let user_sex = req.body.user_sex;
  UserCon.modifyUserSex(userphone,user_sex,(result)=>{
    console.log(result)
    res.json({"success":true,"info":result})
  },(err)=>res.json({"success":false,"info":err}))
})

/**
 * 修改用户昵称
 */
router.post('/modifyNickName',(req,res,next)=>{
  let userphone = req.body.id;
  let nickname = req.body.nickname;
  UserCon.modifyUserNickName(userphone,nickname,(result)=>{
    console.log(result)
    res.json({"success":true,"info":result})
  },(err)=>res.json({"success":false,"info":err}))
})

/**
 * 查找用户的历史足迹
 */
router.get('/findUserHistories',(req,res,next)=>{
  let userphone = req.query.id;
  NewsCon.getHistoryNewsById(userphone).then(result=>{
    res.json(result)
  })
})

/**
 * 获取用户动态
 */
router.get('/getUserNewsList',(req,res,next)=>{
  UserNewsCon.getUserNewsList().then(result=>{
    res.json(result)
  }).catch(err=>res.json(err))
})

/**
 * 获取下一页
 */
router.get('/getNextUserNewsList',(req,res,next)=>{
  let lasttime = req.query.lasttime;
  UserNewsCon.getNextUserNewsList(lasttime).then(result=>{
    res.json(result)
  }).catch(err=>res.json(err))
})

/**
 * 增加一条用户动态
 */
router.post('/addOneUserNews',(req,res,next)=>{
  let usernewsobj = req.body.usernewsobj;
  let mynewsobj = {
    author_id:usernewsobj.author_id,
    news_id:usernewsobj.news_id,
    news_title:usernewsobj.news_title,
    author_nickname:usernewsobj.author_nickname,
    author_thumb:usernewsobj.author_thumb,
    published_time:usernewsobj.published_time
  }
  // console.log(usernewsobj)
  UserNewsCon.addNewsToUser(mynewsobj)
  UserNewsCon.addOneUserNews(usernewsobj).then(result=>{
    res.json({"success":true})
  }).catch(err=>res.json(err))
})

/**
 * 根据id查询用户动态
 */
router.get('/getUserNewsById',(req,res,next)=>{
  let news_id = req.query.news_id;
  UserNewsCon.getUserNewsById(news_id).then(result=>{
    res.json(result)
  }).catch(err=>res.json(err))
})

/**
 * 增加阅读量
 */
router.get('/addReadNum',(req,res,next)=>{
  let news_id = req.query.news_id;
  UserNewsCon.addReadNumber(news_id).then(result=>{
    res.json(result)
  }).catch(err=>res.json(err))
})

module.exports = router;
