from flask import Flask
from controller.getSoccer import getSoccerNews, getSoccerDetail, getSoccerNewsNext
from controller.userCF import BaseUserCF
from flask_apscheduler import APScheduler  # 引入APScheduler


class Config(object):  # 创建配置
    JOBS = [  # 任务列表
        {  # 任务字典（细节）
            'id': 'job1',
            'func': '__main__:BaseUserCF.getRecommend',
            'trigger': 'cron', # 任务执行类型，定时器
            'second' : '*/10'
        }
    ]

app = Flask(__name__)
app.config.from_object(Config())  # 为实例化的flask引入配置


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
    scheduler = APScheduler()  # 实例化APScheduler
    scheduler.init_app(app)  # 把任务列表放进flask
    scheduler.start()  # 启动任务列表
    app.run(debug=True) # 启动flask
