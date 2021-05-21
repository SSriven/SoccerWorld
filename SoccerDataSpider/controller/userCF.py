

import pandas as pd
import pymongo
# from sklearn.metrics import jaccard_score
import numpy as np
# 计算Item1和Item2的杰卡德相似度
# print(jaccard_score(df["Item1"],df["Item2"]))

from sklearn.metrics.pairwise import pairwise_distances

# # 连接数据库

client = pymongo.MongoClient(host="localhost", port=27017)
db = client.sports

class BaseUserCF:

    def getRecommend():
        user_his = db["news_histories"]
        users = []
        items = []
        datasets = []
        news = []
        for news_his in user_his.find({},{"history":1,"userphone":1,"_id":0}):
            users.append(news_his['userphone'])
            for his in news_his['history']:
                if str(his['id']) not in items:
                    items.append(str(his['id']))
                    news.append(his)
        # print(users)
        # print(items)
        # print(news)
        for news_his in user_his.find({},{"history":1,"userphone":1,"_id":0}):
            user_data = [0 for i in range(len(items))]
            for his in news_his['history']:
                j = items.index(str(his['id']))
                user_data[j] = 1
            datasets.append(user_data)

        df = pd.DataFrame(datasets,columns=items,index=users)

        # print(df)
        # 计算用户间的相似度
        user_similar = 1 - pairwise_distances(df.values,metric="jaccard")
        user_similar = pd.DataFrame(user_similar,columns=users,index=users)
        # print("用户之间的两两相似度")
        # print(user_similar)

        topN_users = {}
        for i in user_similar.index:
            #取出每一列数据，并删除自身，然后排序数据
            _df = user_similar.loc[i].drop([i])
            _df_sorted = _df.sort_values(ascending=False)
            top2 = list(_df_sorted.index[:3])
            topN_users[i] = top2

        # print("top2相似用户:")
        # print(topN_users)

        rs_results = {}
        for user,sim_users in topN_users.items():
            rs_result = set()
            for sim_user in sim_users:
                rs_result = rs_result.union(df.loc[sim_user].replace(0,np.nan).dropna().index)
            rs_result -= set(df.loc[user].replace(0,np.nan).dropna().index)
            rs_results[user] = rs_result

        users_recommends = db['users_recommends']
        recommends = []
        # print("最终推荐结果：")
        for user,sim_items in rs_results.items():
            sim_items = list(sim_items)
            recommend = []
            for i in sim_items:
                for j in news:
                    if i == str(j['id']):
                        recommend.append(j)
                        break;
            user_recommends = {"userphone":user,"recommends":recommend}
            recommends.append(user_recommends)
        users_recommends.insert_many(recommends)
        print("生成推荐列表")



    
