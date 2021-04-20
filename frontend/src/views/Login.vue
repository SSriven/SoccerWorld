<template>
  <div class="login" v-loading="loading">
    <div class="login-header">足球天下</div>
    <div class="login-box">
      <el-form :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">手机号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">
              <el-input type="text" v-model="ruleForm.count" autocomplete="off"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">验证码</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">
              <span class="code" v-if="!sendCode" @click="sendInformationCode()">获取验证码</span>
              <span :class="sendCode ? 'scode':'code'" v-if="sendCode">{{codeTime}}秒后重新获取</span>
              <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="submitForm()">登录</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-button @click="resetForm()">清除</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Message } from "element-ui";
import { mapMutations, mapActions } from "vuex";
Vue.prototype.$message = Message;
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        count: "",
        code: ""
      },
      sendCode: false,
      codeTime: 60,
      loading: false
    };
  },
  methods: {
    /**
     * 点击登录
     */
    submitForm() {
      if (this.ruleForm.count == "") {
        this.$message("请输入手机号");
        return false;
      }
      if (this.ruleForm.code == "") {
        this.$message("请输入验证码");
        return false;
      }

      if (this.codeTime <= 0) {
        this.$message("验证码已过期");
        return false;
      }
      this.loading = !this.loading;
      let loginSuccess = this.userLogin(
        this.ruleForm.count,
        this.ruleForm.code
      );
      if (!loginSuccess) {
        this.$message("验证码错误");
        return false;
      }
      let that = this;
      console.log(that.ruleForm.count)
      let userphone = that.ruleForm.count
      this.$store
        .dispatch("userStore/getUserById", userphone)
        .then((res) => {
          console.log("登陆成功",res)
          that.handleUserName(userphone);
          that.handleLastLoginTime(new Date().getTime());
          that.$router.push("/main");
          
        })
        .catch(err => {
          console.log(err);
          that.$message("请求超时");
        });
    },
    /**
     * 清除输入框
     */
    resetForm() {
      this.ruleForm.count = "";
      this.ruleForm.code = "";
      this.$message("清除成功");
    },
    /**
     * 点击获取验证码
     */
    sendInformationCode() {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      console.log(this.ruleForm.count);
      if (!myreg.test(this.ruleForm.count)) {
        this.$message("请输入正确的手机号码");
      } else {
        this.sendCode = true;
        this.codeTime = 60;
        setInterval(() => {
          this.codeTime -= 1;
          if (this.codeTime <= 0) {
            this.sendCode = false;
            clearInterval();
          }
        }, 1000);
      }
    },

    /**
     * 用户登录
     */
    userLogin(acct, code) {
      if (acct != "" && code != "") return true;
    },
    ...mapMutations("userStore", {
      handleUserName: "handleUserName",
      handleLastLoginTime: "handleLastLoginTime"
    }),
    ...mapActions("userStore", ["getUserById"])
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/mainicon.png") no-repeat center bottom;
  background-size: contain;
  background-color: honeydew;
}
.login-box {
  position: absolute;
  width: 100%;
  height: 150px;
  top: 50%;
  margin-top: -100px;
}
.login .login-header {
  position: relative;
  text-align: left;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
  margin-left: 20px;
}

.el-row {
  margin: 0 40px 20px 40px;
}
.el-col-6 {
  height: 40px;
  line-height: 40px;
}
.code {
  position: absolute;
  z-index: 999;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  right: 10px;
  color: #379af4;
}
.scode {
  position: absolute;
  z-index: 999;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  right: 10px;
  color: #999;
}
</style>