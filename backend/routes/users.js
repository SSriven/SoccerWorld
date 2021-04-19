const express = require('express');
const router = express.Router();
const multer = require('multer')
const UserCon = require('../controller/user')
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

/* GET users listing. */
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
  console.log("oldpath",oldpath)
  console.log("newpath",newpath)
  UserCon.modifyUserThumb(userphone, newpath, (res) => {
    console.log(res)
  }, (err) => console.log(err))
  console.log(path.join(__dirname,"../public/uploads/"+oldpath))
  filepath = path.join(__dirname,"../public/uploads/"+oldpath)
  fs.unlink(filepath, function(err){
    if(err){
     throw err;
    }
    console.log('文件:'+filepath+'删除成功！');
   })
  res.json({res_code:'0'})
})

module.exports = router;
