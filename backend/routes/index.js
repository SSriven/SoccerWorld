var express = require('express');
var router = express.Router();
const request = require('request')

/**
 * 获取推荐新闻列表
 */
router.get('/', function(req, res, next) {
  request('http://localhost:5000/api/getSoccerNews/3',(error,response,body)=>{
    let data = JSON.parse(body).data
      console.log(data)
      res.render('index', { data });
  })
  
});

module.exports = router;
