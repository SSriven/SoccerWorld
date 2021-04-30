<template>
  <div class="news-detail" :style="{height:clientHeight + 'px'}">
    <header>
      <i class="el-icon-arrow-left back" @click="backHome"></i>
      <span class="app-name">足球天下</span>
      <div class="comment-number">{{page.read_num}}阅读量</div>
    </header>
    <section :style="{height:(clientHeight-80) + 'px'}">
      <article>
        <p class="title">{{page.news_title}}</p>
        <p class="author">{{page.author_nickname}}</p>
        <div v-html="page.news_content" class="content">{{page.news_content}}</div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import userData from "../api/api_users"
export default {
  name: "userNewsDetail",
  data() {
    return {
      clientHeight: document.body.clientHeight,
      page:{}
    };
  },
  computed: {
    ...mapState("soccerStore", {
      usernewsList: state => state.usernewsList
    })
  },
  created() {},
  mounted() {
    let news_id = this.$route.query.news_id;
    let index = this.$route.query.index;
    console.log(news_id)
    this.page = this.usernewsList[index]
    userData.addReadNum(news_id).then(res=>{
        console.log(res)
    })
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
</style>