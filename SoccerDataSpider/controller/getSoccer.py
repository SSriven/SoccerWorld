# -*- codeing=utf-8 -*-
# Author:wrs
# @Time :2021/2/26 14:33
# @Software :PyCharm


import time
from controller.newsReq import getNewsList, getNewsDetail

# # 连接数据库
# client = pymongo.MongoClient(host="localhost", port=27017)
# db = client.sports

baseUrl = "https://www.dongqiudi.com/api/app/tabs/web/"


'''
 3：英超
 4：意甲
 5：西甲
 6：德甲
 57：更多赛事
'''
# 获取足球新闻列表
def getSoccerNews(typeid):
    t = int(time.time())
    newsList = getNewsList(baseUrl, typeid, t)
    return newsList

# 获取下一页新闻列表
def getSoccerNewsNext(typeid, last_time):
    newsList = getNewsList(baseUrl, typeid, last_time)
    return newsList

#获取足球新闻详情页
def getSoccerDetail(page_id, type_id):
    detail_url = "https://www.dongqiudi.com/news/" + str(page_id) + ".html"
    detail_page = getNewsDetail(detail_url)
    detail_page["page_id"] = page_id
    detail_page["type"] = type_id
    label = ''
    if int(type_id) == 3:
        label = '英超'
    elif int(type_id) == 4:
        label = '意甲'
    elif int(type_id) == 5:
        label = '西甲'
    elif int(type_id) == 6:
        label = '德甲'
    else:
        label = "五洲"
    detail_page["label"] = label
    # print(detail_page)
    return detail_page
