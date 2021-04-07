<template>
  <div class="news-detail" :style="{height:clientHeight + 'px'}">
    <header>
      <i class="el-icon-arrow-left back" @click="backHome"></i>
      <span class="app-name">足球天下</span>
    </header>
    <section :style="{height:(clientHeight-40) + 'px'}">
      <article>
        <p class='title'>{{page.title}}</p>
        <p class="author">{{page.author}}</p>
        <div v-html="page.content" class="content">{{page.content}}</div>
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
import detailData from "../api/api_soccer"
export default {
  name: "NewsDetail",
  data() {
    return {
      clientHeight: document.body.clientHeight,
      page:{}
    };
  },
  created(){
    console.log("created newsdatail")
  },
  mounted(){
    console.log("mounted newsdatail",this.$route.query)
    let pageid = this.$route.query.pageid
    let typeid = this.$route.query.typeid
    detailData.getNewsDetail(pageid,typeid).then(res=>{
      console.log(res)
      this.page = res
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    backHome(){
      this.$router.go(-1)
    }
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
.content{
    text-align: left;
    width: 100%;
}
.content img{
  width: 100%;
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