var express = require('express');
var router = express.Router();
const UserCon = require('../controller/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  UserCon.getAllUsers(users=>{
    res.json(users)
  },err=>{
    res.status(404).json(err)
  })
});

/**
 * 根据用户手机号查询用户信息，如果查无此人，则插入一条数据
 */
router.get('/findById', function (req, res, next) {
  let userphone = req.query.id
  UserCon.getUserfindById(userphone,user=>{
    res.json(user)
  },err=>{
    res.status(404).json(err)
  })
});

module.exports = router;
