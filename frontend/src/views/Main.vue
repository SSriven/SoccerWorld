<template>
  <div class="main">
    <el-container>
      <el-main :style="{height:clientHeight + 'px'}">
        <Home v-show="currentTab == 1" v-if="user_id != ''"></Home>
        <match-data v-show="currentTab == 2" v-if="user_id != ''"></match-data>
        <Send v-show="currentTab == 3" v-if="user_id != ''"></Send>
        <My v-show="currentTab == 4" v-if="user_id != ''"></My>
      </el-main>
      <el-footer>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple" @click="clickTab(1)">
              <div :class="currentTab == 1 ? 'tab-item active' : 'tab-item'">
                <i class="el-icon-s-home"></i>
                <span class="tab-item-title">首页</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="grid-content bg-purple" @click="clickTab(2)">
              <div class="grid-content bg-purple">
                <div :class="currentTab == 2 ? 'tab-item active' : 'tab-item'">
                  <i class="el-icon-s-data"></i>
                  <span class="tab-item-title">数据</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="grid-content bg-purple" @click="clickTab(3)">
              <div class="grid-content bg-purple">
                <div :class="currentTab == 3 ? 'tab-item active' : 'tab-item'">
                  <i class="el-icon-circle-plus"></i>
                  <span class="tab-item-title">发布</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" @click="clickTab(4)">
              <div class="grid-content bg-purple">
                <div :class="currentTab == 4 ? 'tab-item active' : 'tab-item'">
                  <i class="el-icon-s-custom"></i>
                  <span class="tab-item-title">我的</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapMutations ,mapState} from "vuex";
import Home from "../components/homeView/Home"
import MatchData from "../components/dataView/MatchData"
import Send from "../components/sendView/Send"
import My from "../components/myView/My"
export default {
  data() {
    return {
      main: "欢迎来到足球世界",
      clientHeight: document.body.clientHeight - 60,
    };
  },
  computed:{
    ...mapState('userStore',{
      user_id:state=>state.user_id,
      currentTab:state=>state.currentTab
    })
  },
  components: {
      Home,MatchData,My,Send
  },
  mounted() {
    //更新最近登陆时间
    console.log("更新最近登陆时间")
    this.handleLastLoginTime(new Date().getTime());
  },
  methods: {
      clickTab(tab){
          this.handleCurrentTab(tab)
      },
    ...mapMutations("userStore", {
      handleLastLoginTime: "handleLastLoginTime",
      handleCurrentTab:"handleCurrentTab"
    })
    
  }
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  height: 100%;
}
.el-main {
  padding: 0 !important;
  position: absolute;
  top: 0;
  width: 100%;
  overflow: unset;
  height: ~"calc(100% - 60px)";
}
.el-footer {
  padding: 0 !important;
  border-top: 1px solid #eee;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: content-box;
}
.el-row {
  height: 100%;
  margin:0 !important;
}
.el-col-6 {
  height: 100%;
}
.tab-item {
  padding: 10px 0;
  height: 40px;
}
.tab-item-title {
  font-size: 11px;
  display: block;
}
.active {
  color: #16b13a;
}
</style>