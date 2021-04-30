<template>
  <div id="send">
    <header>
      <span class="title">标题：</span>
      <input type="text" v-model="title" placeholder="请输入标题" />
    </header>
    <div id="wangEditor" >
      <div id="toolbar-container" class="toolbar"></div>
      <div id="text-container" class="text" :style="{height:clientHeight+'px'}"></div>
    </div>
    <footer>
      <el-button type="primary" @click="publish">发表</el-button>
    </footer>
  </div>
</template>  
<script>
import E from "wangeditor";
import { mapState } from "vuex";
import Vue from "vue";
import { Message } from "element-ui";
import userData from "../../api/api_users";
Vue.prototype.$message = Message;
export default {
  name: "wangEditor",
  data() {
    return {
      title: "",
      contentHtml: "",
      editor: null,
      clientHeight: document.body.clientHeight - 300,
    };
  },
  mounted() {
    this.wangEditorInit();
  },
  computed: {
    ...mapState("userStore", {
      user_id: state => state.user_id,
      user_thumb: state => state.user_thumb,
      user_sex: state => state.user_sex,
      user_nickname: state => state.user_nickname
    })
  },
  methods: {
    wangEditorInit() {
      this.editor = new E("#toolbar-container", "#text-container"); // 传入两个元素
      this.editor.config.showFullScreen = false;
      this.editor.config.uploadImgShowBase64 = true;
      this.editor.config.menus = [
        "color", //字体颜色
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "undo", // 撤销
        "redo" // 重复
      ];
      let that = this;
      this.editor.config.onchange = function(newHtml) {
        that.contentHtml = newHtml;
      };
      // 配置触发 onchange 的时间频率，默认为 200ms
      this.editor.config.onchangeTimeout = 500; // 修改为 500ms
      this.editor.create();
    },
    publish() {
      if (this.title == "") {
        this.$message("标题不能为空");
        return false;
      }
      if (this.title.length > 50) {
        this.$message("标题不能超过50个字符");
        return false;
      }
      if (this.contentHtml == "") {
        this.$message("正文内容不能为空");
        return false;
      }
      var formatDateTime = function(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = date.getSeconds();
        second = second < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      };
      let time = new Date();
      let obj = {
        author_nickname: this.user_nickname,
        author_id: this.user_id,
        author_thumb: this.user_thumb,
        news_id: this.user_id + "" + time.getTime(),
        news_content: this.contentHtml,
        published_time: formatDateTime(time),
        sort_time: time.getTime(),
        news_title: this.title,
        read_num: 0
      };
      console.log(obj);

      userData
        .addOneUserNews(obj)
        .then(res => {
            console.log(res)
          this.title = "";
          this.contentHtml = "";
          this.editor.txt.clear();
          this.$message("发表成功");
        })
        .catch(err => {console.log(err)});
    }
  }
};
</script>  

<style lang="less" scoped>
header {
  height: 60px;
  text-align: left;
  line-height: 60px;
  font-size: 18px;
  color: #999;
  padding: 0 10px;
}
input {
  box-sizing: border-box;
  border: none;
  height: 50px;
  padding: 5px 0;
  font-size: 18px;
  outline: none;
  width: 80%;
}
.title {
  display: inline-block;
  width: 20%;
}
.toolbar {
  border-top: 1px solid #ccc;
}
.text {
  border-bottom: 1px solid #ccc;
  min-height: 400px;
}
footer {
  margin-top: 20px;
}
</style>