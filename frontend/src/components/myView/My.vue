<template>
  <div class="my">
    <header>个人资料</header>
    <section class="my-info">
      <div class="my-info-item">
        <span class="item-name">账号</span>
        <div class="item-value">{{user_id}}</div>
      </div>
      <div class="my-info-item" @click="selectFile">
        <span class="item-name">头像</span>
        <div class="icon">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="item-value item-value-img">
          <el-avatar :size="28" :src="user_thumb"></el-avatar>
          <input
            type="file"
            id="firmware"
            ref="up_avatar"
            style="display:none"
            accept="image/*"
            name="myfile"
            @change="selected"
          />
        </div>
      </div>
      <div class="my-info-item">
        <span class="item-name">性别</span>
        <div class="icon">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="item-value">{{user_sex}}</div>
      </div>
      <div class="my-info-item">
        <span class="item-name">修改用户名</span>
        <div class="icon">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="item-value">{{user_nickname}}</div>
      </div>
      <!-- <el-input type="file" accept="image/*"></el-input> -->
    </section>
    <section class="my-info">
      <div class="my-info-item">
        <span class="item-name">我的发表</span>
        <div class="icon">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="item-value">10篇</div>
      </div>
      <div class="my-info-item">
        <span class="item-name">历史足迹</span>
        <div class="icon">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="item-value">100篇</div>
      </div>
    </section>
    <section class="exit">
      <el-button type="danger">退出登录</el-button>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "my",
  data() {
    return {};
  },
  componenets: {},
  computed: {
    ...mapState("userStore", {
      user_id: state => state.user_id,
      user_thumb: state => state.user_thumb,
      user_sex: state => state.user_sex,
      user_nickname: state => state.user_nickname
    })
  },
  mounted() {
    this.$store.dispatch("userStore/getUserById", this.user_id)
  },
  methods: {
    selectFile() {
      document.getElementById("firmware").click();
    },
    selected() {
      let fileData = this.$refs.up_avatar.files[0];
      // 使用FormData打包
      let formData = new FormData();
      formData.append("file", fileData);
      let obj = {
        userphone: this.user_id,
        imgData: formData,
        oldpath:this.user_thumb
      };
      this.$store.dispatch("userStore/uploadUserImg", obj).then(res => {
        console.log(res);
      });
    },
    ...mapActions("userStore", ["uploadUserImg", "getUserById"])
  }
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
.my-info .my-info-item {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #efefef;
  padding: 0 10px;
  box-sizing: border-box;
}
.my-info-item:active {
  background: #eee;
}
.my-info .my-info-item .item-name {
  float: left;
  color: #000;
}
.my-info .my-info-item .item-value {
  float: right;
  font-size: 14px;
  color: #999;
}
.item-value-img {
  height: 28px;
  padding: 6px 0;
}
.icon {
  float: right;
  margin-left: 10px;
  color: #999;
}
</style>