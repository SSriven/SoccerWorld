<template>
  <div class="news-detail" :style="{height:clientHeight + 'px'}" v-loading="loading">
    <header>
      <i class="el-icon-arrow-left back" @click="backHome"></i>
      <span class="app-name">足球天下</span>
      <div class="comment-number">999+评论</div>
    </header>
    <section :style="{height:(clientHeight-80) + 'px'}">
      <article>
        <p class="title">{{page.title}}</p>
        <p class="author">{{page.author}}</p>
        <div v-html="page.content" class="content">{{page.content}}</div>
      </article>
      <div class="reply">
        <p class="reply-head">
          <span class="tiao"></span>
          <span class="reply-head-title">精彩评论</span>
        </p>
        <div class="reply-content">
          <div class="reply-content-item" v-for="i in [1,2,3,4,5]" :key="i">
            <div class="reply-content-item-header">
              <div class="reply-content-item-header-left">
                <img
                  src="http://192.168.0.10:3000/uploads/file-ee09c33608054894b362e539c9f23824.png"
                />
              </div>
              <div class="reply-content-item-header-right">
                <p class="comment-people">绝对忠告</p>
                <p class="comment-time">2021-04-21 14:18:36</p>
              </div>
            </div>
            <div class="reply-content-item-comment">2020印象最深的是两回合踢国安</div>
          </div>
        </div>
      </div>
    </section>
    <div class="send-comment">
      <input type="text" placeholder="请发表你的言论" />
      <el-button type="primary">发表</el-button>
    </div>
  </div>
</template>

<script>
import detailData from "../api/api_soccer";
export default {
  name: "NewsDetail",
  data() {
    return {
      clientHeight: document.body.clientHeight,
      page: {},
      loading: true
    };
  },
  created() {
    console.log("created newsdatail");
  },
  mounted() {
    console.log("mounted newsdatail", this.$route.query);
    let pageid = this.$route.query.pageid;
    let typeid = this.$route.query.typeid;
    detailData
      .getNewsDetail(pageid, typeid)
      .then(res => {
        console.log(res);
        this.page = res;
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    backHome() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.news-detail {
  position: relative;
  background: #fefefe;
}
header {
  height: 40px;
  background: #fff;
  line-height: 40px;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  z-index: 999;
}
section {
  position: relative;
  top: 40px;
  position: relative;
  top: 40px;
  overflow: hidden;
  overflow-y: scroll;
  height: ~"calc(100% - 80px)";
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
.comment-number{
  margin-right: 10px;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 13px;
    color: #379af4;
    border: 1px solid #379af4;
    box-sizing: border-box;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    padding: 0 10px;
}
article {
  overflow: scroll;
  overflow-y: scroll;
  padding: 10px;
}
.content {
  text-align: left;
  width: 100%;
}
.content img {
  width: 100%;
}
.title {
  font-size: 23px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
}
.author {
  color: #379af4;
  font-size: 13px;
  padding-bottom: 10px;
  text-align: left;
}
.reply {
  margin-top: 20px;
  border-top: 2px solid #eee;
  position: relative;
}
.reply .reply-head {
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin-bottom: 10px;
}
.reply .reply-head .tiao {
  background: #379af4;
  display: inline-block;
  width: 5px;
  height: 16px;
  float: left;
  margin-left: 10px;
  margin-top: 7px;
}
.reply .reply-head .reply-head-title {
  font-size: 14px;
  margin-left: 10px;
  font-weight: bold;
}
.reply-content {
}
.reply-content-item {
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  padding: 0 10px 10px 10px;
}
.reply-content-item-header {
  height: 40px;
}
.reply-content-item-header-left {
  float: left;
  position: relative;
  img {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    top: 2px;
  }
}
.reply-content-item-header-right {
  float: left;
  margin-left: 5px;
}
.comment-people {
  font-size: 13px;
  color: #379af4;
  margin-top: 0;
  margin-bottom: 2px;
  text-align: left;
}
.comment-time {
  font-size: 11px;
  color: #999;
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
}
.reply-content-item-comment {
  font-size: 15px;
  text-align: left;
}
.send-comment {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  padding: 5px 0;
  box-shadow: 8px 4px 8px #000;
  background: #fff;
}
.send-comment input {
  float: left;
  height: 30px;
  border: none;
  box-sizing: border-box;
  background: #eee;
  border-radius: 5px;
  padding: 0 5px;
  font-size: 13px;
  width: 70%;
  margin-left: 10px;
}
/deep/ .el-button--primary {
  height: 30px;
  line-height: 30px;
  padding: 0;
  width: 20%;
  float: right;
  margin-right: 10px;
}
</style>