<template>
  <div class="home-container">
    <header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#16b13a"
        @select="handleSelect"
      >
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-menu-item index="0">推荐</el-menu-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-menu-item index="9">世界</el-menu-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-menu-item index="1">快讯</el-menu-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-menu-item index="5">西甲</el-menu-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-menu-item index="4">意甲</el-menu-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-menu-item index="3">英超</el-menu-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-menu-item index="6">德甲</el-menu-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-menu-item index="57">五洲</el-menu-item>
            </div>
          </el-col>
        </el-row>
      </el-menu>
    </header>
    <section :style="{height:sectionHeight + 'px'}">
        <!-- 这是推荐
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        还是说 -->
        <news-list-page :news-type="activeIndex"></news-list-page>
    </section>
  </div>
</template>

<script>
import NewsListPage from "./NewsListPage"
export default {
  name: "home",
  data() {
    return {
      activeIndex: "0",
      sectionHeight:document.body.clientHeight - 120,
    };
  },
  components: {
      NewsListPage
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
    }
  },
  destroyed(){
    this.activeIndex = "0";
  }
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
section{
  height: ~"calc(100% - 60px)";
}
.el-menu-item{
    padding:0;
    height: 60px;
}
.el-row{
  margin:0 !important;
}
.el-col-4{
    display: inline-block;
    float: unset;
}

header{
    height: 60px;
    position: relative;
    width: 100%;
    z-index: 999;
    overflow: scroll;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    border-bottom: solid 1px #e6e6e6;
    box-sizing: border-box;
}
header::-webkit-scrollbar{
      display: none;
}
section{
    position: relative;
}
</style>