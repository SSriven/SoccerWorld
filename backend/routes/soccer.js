/**
 * 足球
 */

const express = require('express');
const router = express.Router();
const request = require('request')
const NewsHistoryCon = require('../controller/user_history_news')
const NewsDetailCon = require('../controller/newsdetail')



const baseListUrl = 'http://localhost:5000/api/getSoccerNews/';//获取新闻列表基础接口
const baseDetailUrl = 'http://localhost:5000/api/getSoccerDetail/';//获取新闻详情页基础接口
const baseNextUrl = "http://localhost:5000/api/getSoccerNextNews/";//获取下一页新闻列表

/**
 * 获取新闻列表
 * 参数1：typeid
 */
router.get('/', function (req, res, next) {
  let typeid = req.query.typeid;
  if (!typeid) res.send({ "data": [] })
  console.log(req.query);
  let urlstr = baseListUrl + typeid;
  console.log(urlstr)
  request(urlstr, (error, response, body) => {
    let data = JSON.parse(body)
    //   console.log(data)
    //   res.render('index', { data });
    if (error) {
      console.log(error)
      res.json({ "data": [] })
    } else {
      res.json(data)
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
  if (!typeid || !last_time) res.send({ "data": [] })
  let urlstr = baseNextUrl + typeid + '/' + last_time;
  console.log(urlstr)
  request(urlstr, (error, response, body) => {
    let data = JSON.parse(body)
    //   console.log(data)
    //   res.render('index', { data });
    if (error) {
      console.log(error)
      res.send({ "data": [] })
    } else {
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
  if (!pageid || !typeid) res.send({ "data": [] })
  /**
   * 1.查询数据库中是否有有该条新闻数据，如果有则直接从数据库中读取出来渲染到前端界面上
   * 2.数据库中没有数据，则去第三方网站爬取数据
   * 3.将爬取到的数据放入数据库中
   */
  //1.查询数据库中是否有有该条新闻数据，如果有则直接从数据库中读取出来渲染到前端界面上
  NewsDetailCon.getNewsDetailById(pageid, (newsdetailobj) => {
    if (!newsdetailobj) {   //2.数据库中没有数据，则去第三方网站爬取数据
      let urlstr = baseDetailUrl + pageid + '/' + typeid;
      request(urlstr, (error, response, body) => {
        console.log(urlstr,"数据库中没有数据，则去第三方网站爬取数据")
        let data = JSON.parse(body);
        if (error) {
          console.log(error)
          res.send({ "data": [] })
        } else {
          //3.将爬取到的数据放入数据库中
          NewsDetailCon.addOneNewsDetail(data,(res)=>console.log("将爬取到的数据放入数据库中"))
          //4.添加一条历史记录
          // addHistory(userphone,data)
          res.send(data)
        }
      })
    } else {
      console.log("数据库中有记录")
      res.json(newsdetailobj)
    }
  }, err => {
    console.log(err)
    res.status(404).json(err)
  })

})

var formatDateTime = function (date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h=h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second=date.getSeconds();
  second=second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};
/**
 * 添加历史记录
 */
router.post("/addHistory",(req,res)=>{
  let userphone = req.body.params.userphone
  let newsobj = req.body.params.newsobj
  newsobj["see_time"] = formatDateTime(new Date())
  addHistory(userphone,newsobj)
})




function addHistory(userphone,newsobj){
  NewsHistoryCon.getHistoryNewsById(userphone).then(()=>{
    NewsHistoryCon.addOneHistoryNews(userphone,newsobj).then(res=>{
      console.log("添加一条历史记录",res)
    })
  })
}


module.exports = router;