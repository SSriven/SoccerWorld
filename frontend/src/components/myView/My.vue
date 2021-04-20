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
      <div class="my-info-item" @click="dialogFormVisibleSex = true">
        <span class="item-name">性别</span>
        <div class="icon">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="item-value">{{user_sex}}</div>
      </div>
      <el-dialog title="选择性别" :visible.sync="dialogFormVisibleSex">
        <el-radio v-model="sex" label="男">男</el-radio>
        <el-radio v-model="sex" label="女">女</el-radio>
      </el-dialog>
      <div class="my-info-item" @click="dialogFormVisibleName = true">
        <span class="item-name">昵称</span>
        <div class="icon">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="item-value">{{user_nickname}}</div>
      </div>
      <el-dialog title="修改昵称" :visible.sync="dialogFormVisibleName">
        <el-input v-model="nickName" autocomplete="off"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleName = false">取 消</el-button>
          <el-button type="primary" @click="modifyUserNickName">确 定</el-button>
        </div>
      </el-dialog>
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
    return {
      dialogFormVisibleSex: false,
      dialogFormVisibleName:false,
      sex: "男",
      nickName:""
    };
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
  watch: {
    sex: {
      handler(n) {
        this.sex = n;
        console.log(n);
        let obj = {
          userphone: this.user_id,
          user_sex: n
        };
        this.$store.dispatch("userStore/modifySex", obj);
      }
    }
  },
  mounted() {
    this.$store.dispatch("userStore/getUserById", this.user_id);
  },
  methods: {
    /**
     * 选择文件
     */
    selectFile() {
      document.getElementById("firmware").click();
    },
    /**
     * 修改用户头像
     */
    selected() {
      let fileData = this.$refs.up_avatar.files[0];
      // 使用FormData打包
      let formData = new FormData();
      formData.append("file", fileData);
      let obj = {
        userphone: this.user_id,
        imgData: formData,
        oldpath: this.user_thumb
      };
      this.$store.dispatch("userStore/uploadUserImg", obj).then(res => {
        console.log(res);
      });
    },
    /**
     * 修改用户昵称
     */
    modifyUserNickName(){
      this.dialogFormVisibleName = false
      let obj = {
        userphone:this.user_id,
        nickname:this.nickName
      }
      console.log(obj)
      this.$store.dispatch("userStore/modifyNickName",obj)
    },
    ...mapActions("userStore", ["uploadUserImg", "getUserById", "modifySex","modifyNickName"])
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
/deep/.el-dialog {
  width: 80%;
}
</style>