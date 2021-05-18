<template>
  <div class="history">
    <header>
      <i class="el-icon-arrow-left back" @click="back"></i>
      <span>历史足迹</span>
    </header>
    <section id="his">
      <el-row
        v-for="(item,index) in histories"
        :key="index"
        :newsid="item.id"
        :typeid="item.type"
        :currentindex="index"
        @click="handleNewsItem"
        class="news-item"
      >
        <el-col :span="18">
          <p class="news-title">{{item.title}}</p>
          <time>{{item.published_time}}</time>
        </el-col>
        <el-col :span="6">
          <img style="height:100%;width:100%" :src="item.thumb" />
        </el-col>
      </el-row>
      <p v-if="histories.length == 0">你还没有浏览任何新闻，快去看看吧</p>
    </section>
  </div>
</template>


<script>
import { mapState } from "vuex";
import $ from 'jQuery'
export default {
  name: "my-histories",
  data() {
    return {};
  },
  computed: {
    ...mapState("userStore", {
      histories: state => state.histories
    })
  },
  mounted(){
      $("#his").on("click", ".news-item", this.handleNewsItem);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleNewsItem(e) {
      let pageid = e.currentTarget.attributes.newsid.value;
      let typeid = e.currentTarget.attributes.typeid.value;
      this.$router.push({ name: "detail", query: { pageid, typeid } });
    }
  }
};
</script>

<style lang="less" scoped>
.history {
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
.news-item {
  font-size: 14px;
  padding: 18px 8px;
  border-bottom: 3px solid #eee;
  position: relative;
  min-height: 110px;
}
.news-item.el-row:active {
  background: #eee;
}
.el-col-18 {
  padding-right: 10px;
}
.news-title {
  margin: 0 0 5px 0;
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-align: left;
}
time {
  position: absolute;
  bottom: 18px;
  font-size: 13px;
  color: #999;
  left: 8px;
}
</style>