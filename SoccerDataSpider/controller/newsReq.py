# -*- codeing=utf-8 -*-
# Author:wrs
# @Time :2021/2/26 14:45
# @Software :PyCharm

import json
import time
import urllib.request
import bs4
import pymongo
import re


def main():
    englandUrl = "https://www.dongqiudi.com/api/app/tabs/web/"
    t = int(time.time())
    newsList = getNewsList(englandUrl, 3, t)
    # saveDB(newsList)
    # print(newsList)
    for newsItem in newsList:
        time.sleep(1)
        url = newsItem["detail_url"]
        getNewsDetail(url, newsItem["id"], newsItem["type"], newsItem["label"])


# 获取新闻简介
def getNewsList(baseUrl, newsType, last_time):
    baseUrl = baseUrl + str(newsType) + ".json?after=" + str(int(last_time) - 1)
    print(baseUrl)
    json_str = askURL_toJson(baseUrl)
    newsList = []
    for item in json_str["articles"]:
        obj = {
            "id": item["id"],
            "type": json_str["id"],
            "label": json_str["label"],
            "detail_url": "https://www.dongqiudi.com/news/" + str(item["id"]) + ".html",
            "title": item["title"],
            "thumb": item["thumb"],
            "published_time": item["published_at"],
            "sort_timestamp": item["sort_timestamp"]
        }
        newsList.append(obj)
    return newsList


def getNewsDetail(detail_url):
    html = askURL_toHtml(detail_url)
    # print(html)
    soup = bs4.BeautifulSoup(html, "html.parser")
    title = str(soup.find_all("h1", class_="news-title")[0].text)
    # print(title)
    r1 = re.compile(r'style="display:none;"')
    r2 = re.compile(r'(data-height=".*?")')
    r3 = re.compile(r'(data-width=".*?")')
    r4 = re.compile(r'(data-)')
    r5 = re.compile(r'(orig-src=".*?")')
    content = soup.select(".con")[0]
    new_content = re.sub(r1, "", str(content))
    new_content = re.sub(r2, "", new_content)
    new_content = re.sub(r3, "width='100%'", new_content)
    new_content = re.sub(r4, "", new_content)
    new_content = re.sub(r5, "", new_content)
    author = soup.select(".news-left>.tips")[0].text
    print(new_content)
    # print(author)
    obj = {
        "title": title,
        "author": author,
        "content": new_content
    }
    return obj


def askURL_toHtml(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
    }
    html = ""
    req = urllib.request.Request(url=url, headers=headers)
    try:
        response = urllib.request.urlopen(req)
        html = response.read().decode('utf-8')
    except urllib.error.URLError as e:
        if hasattr(e, "code"):
            print(e.code)
        if hasattr(e, "reason"):
            print(e.reason)
    return html


def askURL_toJson(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
    }
    req = urllib.request.Request(url=url, headers=headers)
    json_str = {}
    try:
        response = urllib.request.urlopen(req)
        json_str = json.loads(response.read().decode('utf-8'))
    except urllib.error.URLError as e:
        if hasattr(e, "code"):
            print(e.code)
        if hasattr(e, "reason"):
            print(e.reason)
    return json_str
