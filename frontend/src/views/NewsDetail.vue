<template>
  <div class="news-detail" :style="{height:clientHeight + 'px'}">
    <header>
      <i class="el-icon-arrow-left back" @click="backHome"></i>
      <span class="app-name">足球天下</span>
      <div class="comment-number">{{comment.length}}评论</div>
    </header>
    <section :style="{height:(clientHeight-80) + 'px'}" v-loading="loading">
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
          <div class="reply-content-item" v-for="(item,index) in comment" :key="index">
            <div class="reply-content-item-header">
              <div class="reply-content-item-header-left">
                <img
                  :src="item.user_thumb"
                />
              </div>
              <div class="reply-content-item-header-right">
                <p class="comment-people">{{item.user_nickname}}</p>
                <p class="comment-time">{{item.reply_time}}</p>
              </div>
            </div>
            <div class="reply-content-item-comment">{{item.content}}</div>
          </div>
        </div>
      </div>
    </section>
    <div class="send-comment">
      <input type="text" v-model="replyContent" placeholder="请发表你的言论" />
      <el-button type="primary" @click="sendComment()">发表</el-button>
    </div>
  </div>
</template>

<script>
import detailData from "../api/api_soccer";
import { mapState } from "vuex";
import Vue from "vue";
import { Message } from "element-ui";
Vue.prototype.$message = Message;
export default {
  name: "NewsDetail",
  data() {
    return {
      clientHeight: document.body.clientHeight,
      page: {}, //详情页信息
      comment: [], //评论
      loading: true,
      replyContent: ""
    };
  },
  computed: {
    ...mapState("userStore", {
      user_id: state => state.user_id,
      user_thumb: state => state.user_thumb,
      user_nickname: state => state.user_nickname
    })
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
        this.comment = res.comment;
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    backHome() {
      this.$router.go(-1);
    },
    sendComment() {
      if(this.replyContent == ""){
        this.$message("请发表你的评论！");
        return false;
      }
      var formatDateTime = function(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = date.getSeconds();
        second = second < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      };
      let commentobj = {
        user_id: this.user_id,
        user_thumb: this.user_thumb,
        user_nickname: this.user_nickname,
        news_id: this.page.page_id,
        content: this.replyContent,
        reply_time: formatDateTime(new Date())
      };
      detailData.addComment(this.page.page_id,commentobj).then(res=>{
        console.log(res)
        this.$message("发表成功");
        this.comment.push(commentobj)
        this.replyContent = ""
      }).catch(err=>{
        console.log(err)
        this.$message("网络繁忙，请稍后再试");
        this.replyContent = ""
      });
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
.comment-number {
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
  display: block;
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