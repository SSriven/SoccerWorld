/**
 * 足球
 */

const express = require('express');
const router = express.Router();
const request = require('request')



const baseListUrl = 'http://localhost:5000/api/getSoccerNews/';//获取新闻列表基础接口
const baseDetailUrl = 'http://localhost:5000/api/getSoccerDetail/';//获取新闻详情页基础接口
const baseNextUrl = "http://localhost:5000/api/getSoccerNextNews/";//获取下一页新闻列表

/**
 * 获取新闻列表
 * 参数1：typeid
 */
router.get('/', function (req, res, next) {
  let typeid = req.query.typeid;
  if(!typeid) res.send({"data":[]})
  console.log(req.query);
  let urlstr = baseListUrl + typeid;
  console.log(urlstr)
  request(urlstr, (error, response, body) => {
    let data = JSON.parse(body)
    //   console.log(data)
    //   res.render('index', { data });
    if(error){
      console.log(error)
      res.send({"data":[]})
    }else{
      res.send(data)
    }
  })
});
/**
 * 获取新闻下一页列表
 * 参数1：typeid
 * 参数2：last_time
 */
router.get('/next', function (req, res, next) {
  let typeid = req.query.typeid;
  let last_time = req.query.last_time;
  if(!typeid || ! last_time) res.send({"data":[]})
  let urlstr = baseNextUrl + typeid + '/' + last_time;
  console.log(urlstr)
  request(urlstr, (error, response, body) => {
    let data = JSON.parse(body)
    //   console.log(data)
    //   res.render('index', { data });
    if(error){
      console.log(error)
      res.send({"data":[]})
    }else{
      res.send(data)
    }
    

  })

});
/**
 * 获取新闻详情页
 * 参数一：pageid
 * 参数二：typeid
 *
 */
router.get('/detail', function (req, res, next) {
  let pageid = req.query.pageid;
  let typeid = req.query.typeid;
  if(!pageid || !typeid) res.send({"data":[]})
  let urlstr = baseDetailUrl + pageid + '/' + typeid;

  request(urlstr, (error, response, body) => {
    console.log(urlstr)
    let data = JSON.parse(body);
    console.log(data)
    if(error){
      console.log(error)
      res.send({"data":[]})
    }else{
      res.send(data)
    }

  })
})

module.exports = router;