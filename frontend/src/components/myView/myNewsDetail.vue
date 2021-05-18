<template>
  <div class="mynews-detail" :style="{height:clientHeight + 'px'}">
    <header>
      <i class="el-icon-arrow-left back" @click="backHome"></i>
      <span class="app-name">我的发表</span>
      <div class="comment-number">{{page.read_num}}阅读量</div>
    </header>
    <section :style="{height:(clientHeight-80) + 'px'}">
      <article>
        <p class="title">{{page.news_title}}</p>
        <p class="author">{{page.author_nickname+" "+page.published_time}}</p>
        <div v-html="page.news_content" class="content">{{page.news_content}}</div>
      </article>
    </section>
  </div>
</template>

<script>
import userData from "../../api/api_users"
export default {
  name: "myNewsDetail",
  data() {
    return {
      clientHeight: document.body.clientHeight,
      page:{}
    };
  },
  computed: {
    
  },
  created() {},
  mounted() {
    let news_id = this.$route.query.news_id;
    console.log(this.$router)
    userData.getNewsById(news_id).then(res=>{
        console.log(res[0])
        this.page = res[0];
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
.mynews-detail {
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