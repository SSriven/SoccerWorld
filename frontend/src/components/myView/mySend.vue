<template>
  <div :style="{height:clientHeight + 'px'}">
    <header>
      <i class="el-icon-arrow-left back" @click="back"></i>
      <span class="name">我的发表</span>
    </header>
    <section id="card">
      <el-card
        class="box-card"
        v-for="(item,index) in mynews"
        :newsid="item.news_id"
        :key="index"
        shadow="never"
      >
        <div class="user_info">
          <img :src="item.author_thumb" />
          <span class="nickname">{{item.author_nickname}}</span>
          <span class="send-time">{{item.published_time}}</span>
        </div>
        <div class="box-card-title">{{item.news_title}}</div>
      </el-card>
    </section>
  </div>
</template>


<script>
import {mapState} from "vuex"
import $ from "jQuery";
export default {
  name: "my-send",
  data() {
    return {
      clientHeight: document.body.clientHeight
    };
  },
  computed:{
      ...mapState("userStore",{
          mynews:state=>state.mynews
      })
  },
  mounted(){
      $("#card").on("click", ".box-card", this.handleUserNewsItem);
  },
  methods: {
    back() {
      this.$router.push('/main');
    },
    handleUserNewsItem(e){
        let news_id = e.currentTarget.attributes.newsid.value;
        this.$router.push({ name: "mynewsdetail", query: { news_id } });
    }
  }
};
</script>

<style lang="less" scoped>
header {
  height: 40px;
  background: #fff;
  line-height: 40px;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
  z-index: 999;
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
.name {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
section {
  position: relative;
  top: 40px;
  overflow: hidden;
  overflow-y: scroll;
  height: ~"calc(100% - 40px)";
}
.box-card {
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  border-top: none;
  border-left: none;
  border-right: none;
}
.user_info {
  height: 30px;
  line-height: 30px;
}
.user_info img {
  display: block;
  float: left;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.user_info .nickname {
  float: left;
  margin-top: 2px;
  color: #ff8140;
}
.box-card-title {
  clear: both;
  font-weight: 600;
  font-size: 14px;
}
.send-time{
    float: left;
    font-size: 13px;
    color: #aaa;
    margin-left: 10px;
    margin-top: 2px;
}
.box-card-footer{
    font-size: 13px;
    color:#999;
}
.box-card-footer-read{
    float: right;
}
</style>