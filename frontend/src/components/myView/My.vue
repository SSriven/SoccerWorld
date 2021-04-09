<template>
  <div class="my">
    <header>个人资料</header>
    <section class="my-info">
      <div class="my-info-item">
          <span class="item-name">账号</span>
          <div class="item-value">15070136342</div>
      </div>
      <div class="my-info-item">
          <span class="item-name">头像</span>
          <div class="icon">
              <i class="el-icon-arrow-right"></i>
          </div>
          <div class="item-value item-value-img">
              <el-avatar :size="28" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          </div>
      </div>
      <div class="my-info-item">
          <span class="item-name">性别</span>
          <div class="icon">
              <i class="el-icon-arrow-right"></i>
          </div>
          <div class="item-value">
              男
          </div>
      </div>
      <div class="my-info-item">
          <span class="item-name">修改用户名</span>
          <div class="icon">
              <i class="el-icon-arrow-right"></i>
          </div>
          <div class="item-value">
              Sriven
          </div>
      </div>
      <!-- <el-input type="file" accept="image/*"></el-input> -->
    </section>
    <section class="my-info">
        <div class="my-info-item">
          <span class="item-name">我的发表</span>
          <div class="icon">
              <i class="el-icon-arrow-right"></i>
          </div>
          <div class="item-value">
              10篇
          </div>
       </div>
       <div class="my-info-item">
          <span class="item-name">历史足迹</span>
          <div class="icon">
              <i class="el-icon-arrow-right"></i>
          </div>
          <div class="item-value">
              100篇
          </div>
       </div>
    </section>
    <section class="exit">
      <el-button type="danger">退出登录</el-button>
    </section>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {};
  },
  componenets: {}
};
</script>
<style scoped>
.my {
  background: #eee;
  height: 100%;
}
header {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 8px;
  background: #fff;
}
.my-info {
  background: #fff;
  margin-bottom: 8px;
}
.my-info .my-info-item{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #efefef;
    padding: 0 10px;
    box-sizing: border-box;
}
.my-info-item:active{
    background: #eee;
}
.my-info .my-info-item .item-name{
    float:left;
    color: #000;
}
.my-info .my-info-item .item-value{
    float: right;
    font-size: 14px;
    color: #999;
}
.item-value-img{
    height: 28px;
    padding: 6px 0;
}
.icon{
    float:right;
    margin-left: 10px;
    color: #999;
}
</style>