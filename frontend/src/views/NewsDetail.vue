<template>
  <div class="news-detail" :style="{height:clientHeight + 'px'}">
    <header>
      <i class="el-icon-arrow-left back"></i>
      <span class="app-name">足球天下</span>
    </header>
    <section :style="{height:(clientHeight-40) + 'px'}">
      <article>
        <p class='title'>皇马多赛一场积分暂时反超巴萨，落后榜首马竞3分</p>
        <p class="author">桀骜丶野心家 04-04 00:28</p>
        <div class="con">
          <div>
            <p>皇马2-0击败埃瓦尔，在最新的西甲积分榜上，他们也暂时超过了巴萨。</p>
            <p>
              <img src="https://xyimg1.qunliao.info/fastdfs6/M00/02/B6/720x-/-/-/rBUCgGBolwiAVDZ_AATC2NkDL6w216.jpg?watermark/1/image/aHR0cDovL2ltZzEuZG9uZ3FpdWRpLmNvbS9mYXN0ZGZzMi9NMDAvMkEvRTIvQ2hPcU0xb1MtZVdBUERxM0FBQkE1VWdyQlQ4MTQyLnBuZz9pbWFnZVZpZXcyLzAvdy8xMjA=/dissolve/100/dx/14/dy/10"/>
            </p>
            <p>皇马本轮西甲率先出战，依靠本泽马和阿森西奥的进球，皇马在主场2-0轻取埃瓦尔。</p>
            <p>本场胜利后，皇马在多赛一场的情况下积63分，反超了少赛一场的巴萨(62分)，并距离榜首少赛一场的马竞3分。</p>
            <p>
              本轮西甲联赛，巴萨将对阵巴拉多利德，马竞将
              客战塞维利亚。
            </p>
          </div>
        </div>
      </article>
      <div class="reply">
          <p class="reply-head">
              <span class="tiao"></span>
              <span class="reply-head-title">精彩评论</span>
          </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "NewsDetail",
  data() {
    return {
      clientHeight: document.body.clientHeight
    };
  }
};
</script>

<style scoped>
.news-detail {
  position: relative;
  background: #fefefe;
}
header {
  height: 40px;
  background: #fff;
  line-height: 40px;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.back {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: absolute;
  left: 10px;
  top: 20px;
  margin-top: -15px;
  line-height: 30px;
  font-size: 22px;
  font-weight: 500;
}
.app-name {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
article{
    overflow: scroll;
    overflow-y: scroll;
    padding:10px;
}
article p{
    text-align: left;
}
.title{
    font-size: 23px;
    text-align: left;
    margin-top: 0;
    margin-bottom: 0;
}
.author{
    color: #379af4;
    font-size: 13px;
    padding-bottom: 10px;
    text-align: left;
}
.con img{
    width: 100%;
}
.reply{
    margin-top: 20px;
    border-top: 2px solid #eee;
    position: relative;
}
.reply .reply-head{
    height: 30px;
    line-height: 30px;
    text-align: left;
}
.reply .reply-head .tiao{
    background: #379af4;
    display: inline-block;
    width: 5px;
    height: 16px;
    float: left;
    margin-left: 10px;
    margin-top: 7px;
}
.reply .reply-head .reply-head-title{
    font-size: 14px;
    margin-left: 10px;
    font-weight: bold;
}
</style>