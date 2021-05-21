<template>
  <div class="news-content" v-loading="loading" @scroll="scrollEvent" ref="scrollDiv">
    <div v-if="newsType == '0'">
      <el-row
        v-for="(item,index) in recommendList"
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
      <div v-if="soccerNewsList.length > 0" class="load-more" @click="handleLoadMore">点击加载更多</div>
      <div v-else class="no-more">没有更多了</div>
      <div class="back-top" @click="handleBackTop">
        <i class="el-icon-top"></i>
      </div>
    </div>
    <div v-else-if="newsType == '9'">
      <el-card
        class="box-card"
        v-for="(item,index) in usernewsList"
        :newsid="item.news_id"
        :newsindex="index"
        :key="index"
        shadow="never"
      >
        <div class="user_info">
          <img :src="item.author_thumb" />
          <span class="nickname">{{item.author_nickname}}</span>
          <span class="send-time">{{item.published_time}}</span>
        </div>
        <div class="box-card-title">{{item.news_title}}</div>
        <div class="box-card-footer">
          <span class="box-card-footer-read">阅读量{{item.read_num}}</span>
        </div>
      </el-card>
      <div v-if="usernewsList.length > 0" class="load-more" @click="handleLoadMoreUserNews">点击加载更多</div>
      <div v-else class="no-more">没有更多了</div>
      <div class="back-top" @click="handleBackTop">
        <i class="el-icon-top"></i>
      </div>
    </div>
    <div v-else>
      <el-row
        v-for="(item,index) in soccerNewsList"
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
      <div v-if="soccerNewsList.length > 0" class="load-more" @click="handleLoadMore">点击加载更多</div>
      <div v-else class="no-more">没有更多了</div>
      <div class="back-top" @click="handleBackTop">
        <i class="el-icon-top"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import $ from "jQuery";
import Vue from "vue";
import { Message } from "element-ui";
import soccerData from "../../api/api_soccer";
Vue.prototype.$message = Message;
export default {
  name: "news-list-page",
  data() {
    return {
      msg: "",
      loading: false
    };
  },
  props: {
    newsType: String
  },
  watch: {
    newsType: {
      handler(n) {
        this.newsType = n;
        this.init();
      }
    }
  },
  computed: {
    ...mapState("soccerStore", {
      soccerNewsList: state => state.soccerNewsList,
      usernewsList: state => state.usernewsList,
      recommendList: state => state.recommendNewsList
    }),
    ...mapState("userStore", {
      user_id: state => state.user_id
    })
  },
  created() {
    this.init();
    console.log("news-list-page created");
  },
  mounted() {
    //监听新闻item的点击事件
    $(".back-top").fadeIn();
    $(".news-content").on("click", ".news-item", this.handleNewsItem);
    $(".news-content").on("click", ".box-card", this.handleUserNewsItem);
    console.log("news-list-page mounted");
  },
  destroyed() {
    console.log("news-list-page destroyed");
  },
  methods: {
    /**
         初始化
         */
    init() {
      console.log("初始化 " + this.newsType);
      $(".news-content").scrollTop(0);
      $(".back-top").hide();
      this.loading = true;
      switch (this.newsType) {
        case "0":
          this.msg = "推荐";
          this.getRecommendData();
          break;
        case "9":
          this.msg = "世界";
          this.getWorldData();
          break;
        case "1":
          this.msg = "快讯";
          this.getSoccerData("1");
          break;
        case "3":
          this.msg = "英超";
          this.getSoccerData("3");
          break;
        case "4":
          this.msg = "意甲";
          this.getSoccerData("4");
          break;
        case "5":
          this.msg = "西甲";
          this.getSoccerData("5");
          break;
        case "6":
          this.msg = "德甲";
          this.getSoccerData("6");
          break;
        case "57":
          this.msg = "五洲";
          this.getSoccerData("57");
          break;
        default:
          this.msg = "error";
          break;
      }
    },
    /**
     * 获取推荐信息
     */
    getRecommendData() {
      this.loading = false;
      let that = this;
      this.getRecommendNewsList(this.user_id).then(() => {
        console.log(that.recommendList);
      });
    },
    /**
     * 获取用户发表的动态信息
     */
    getWorldData() {
      let that = this;
      this.getUserNewsList()
        .then(res => {
          console.log(res);
          that.loading = false;
        })
        .catch(err => {
          console.log(err);
          that.loading = false;
          that.$message("请求超时");
        });
    },
    /**
     * 获取足球新闻列表
     */
    getSoccerData(typeid) {
      let that = this;
      this.$store
        .dispatch("soccerStore/getSoccerNewsList", typeid)
        .then(() => {
          that.loading = false;
        })
        .catch(err => {
          console.log(err);
          that.loading = false;
          that.$message("请求超时");
        });
    },
    /**
     * 点击查看新闻详情
     */
    handleNewsItem(e) {
      console.log(e);
      let pageid = e.currentTarget.attributes.newsid.value;
      let typeid = e.currentTarget.attributes.typeid.value;
      let index = e.currentTarget.attributes.currentindex.value;
      let newsobj = this.newsType == '0' ? this.recommendList[index] : this.soccerNewsList[index];
      soccerData.addHistory(this.user_id, newsobj);
      this.$router.push({ name: "detail", query: { pageid, typeid } });
    },

    /**
     * 点击查看用户动态详情
     */
    handleUserNewsItem(e) {
      let news_id = e.currentTarget.attributes.newsid.value;
      let index = e.currentTarget.attributes.newsindex.value;
      this.$router.push({ name: "userNewsDetail", query: { news_id, index } });
    },
    /**
     * 监听滚动事件
     */
    scrollEvent() {
      // console.log("滚动距离：",this.$refs.scrollDiv.scrollTop);
      // console.log("offset:",$(".load-more").offset())
      if (this.newsType == "0") return false;
      let offsettop = Math.floor($(".load-more").offset().top) - 30;
      let divHeight = $(".news-content").height();
      // console.log(offsettop,divHeight);
      if (this.$refs.scrollDiv.scrollTop >= 1000) $(".back-top").fadeIn("slow");
      else {
        $(".back-top").fadeOut("slow");
      }
      if (offsettop - divHeight <= 0) {
        if (this.newsType == "0") {
          console.log("推荐");
        } else if (this.newsType == "9") {
          this.handleLoadMoreUserNews();
        } else {
          this.handleLoadMore();
        }
      }
    },
    /**
     * 点击加载更多
     */
    handleLoadMore() {
      let arrLength = this.soccerNewsList.length - 1;
      let typeid = this.soccerNewsList[arrLength].type;
      let last_time = this.soccerNewsList[arrLength].sort_timestamp;
      let obj = {
        typeid,
        last_time
      };
      console.log(typeid, last_time);
      this.getMoreSoccerNewsList(obj);
    },
    /**
     * 点击加载更多用户动态
     */
    handleLoadMoreUserNews() {
      let arrLength = this.usernewsList.length - 1;
      let last_time = this.usernewsList[arrLength].sort_time;
      this.getNextUserNewsList(last_time);
    },
    /**
     * 回到顶部
     */
    handleBackTop() {
      let begin = $(".news-content").scrollTop(),
        target = 0,
        speed = 0;
      let timer;
      timer = setInterval(function() {
        //获取步长
        speed = (target - begin) * 0.2;
        //判断是向下还是向上取整
        speed = target > begin ? Math.ceil(speed) : Math.floor(speed);

        $(".news-content").scrollTop(speed + begin);
        begin = speed + begin;
        if (begin <= target) {
          //清除定时器
          clearInterval(timer);
        }
      }, 20);
    },
    ...mapActions("soccerStore", [
      "getSoccerNewsList",
      "getMoreSoccerNewsList",
      "getRecommendNewsList",
      "getUserNewsList",
      "getNextUserNewsList"
    ])
  }
};
</script>

<style scoped>
.news-content {
  height: 100%;
  overflow: scroll;
  overflow-y: scroll;
  position: relative;
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
.load-more {
  height: 30px;
  line-height: 30px;
  background: #eee;
  font-size: 13px;
}
.back-top {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #eee;
  line-height: 55px;
  text-align: center;
  position: fixed;
  bottom: 70px;
  right: 20px;
  z-index: 999;
  font-size: 30px;
}
.back-top:active {
  background: #666;
}
.no-more {
  font-size: 13px;
  margin-top: 10px;
  color: #aaa;
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
.send-time {
  float: left;
  font-size: 13px;
  color: #aaa;
  margin-left: 10px;
  margin-top: 2px;
}
.box-card-footer {
  font-size: 13px;
  color: #999;
}
.box-card-footer-read {
  float: right;
}
</style>