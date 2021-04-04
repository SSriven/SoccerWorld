from flask import Flask
from controller.getSoccer import getSoccerNews, getSoccerDetail, getSoccerNewsNext
app = Flask(__name__)

#获取足球新闻列表
@app.route('/api/getSoccerNews/<typeid>')
def getSoccerNewsList(typeid):
    newsTuple = {}
    newsList = getSoccerNews(typeid)
    newsTuple["data"] = newsList
    return newsTuple

#获取足球新闻下一页列表
@app.route('/api/getSoccerNextNews/<typeid>/<last_time>')
def getSoccerNextNewsList(typeid, last_time):
    newsTuple = {}
    newsList = getSoccerNewsNext(typeid, last_time)
    newsTuple["data"] = newsList
    return newsTuple

#获取足球新闻详情页
@app.route('/api/getSoccerDetail/<pageid>/<typeid>')
def getSoccerDetailNews(pageid, typeid):
    newsTuple = getSoccerDetail(pageid, typeid)
    return newsTuple

if __name__ == '__main__':
    app.run(debug=True)
