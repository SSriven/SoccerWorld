<template>
  <div style="height:100%">
    <header>
      <div class="box">
        <div class="active">积分榜</div>
        <div>进球榜</div>
        <div>助攻榜</div>
        <div>赛程</div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "league-match-page",
  data() {
    return {};
  },
  props: {
    seasonId: Number
  },
  watch: {
    seasonId: {
      handler(n) {
        this.seasonId = n;
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.seasonId);
    }
  }
};
</script>

<style lang="less" scoped>
header {
  height: 50px;
  position: relative;
  padding: 0 60px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
header>.box{
    width: 100%;
    background-color: #eeefff;
    border-radius: 5px;
    padding:1px;
    box-sizing: border-box;
}
header > .box > div {
  display: inline-block;
  width: 25%;
  line-height: 30px;
  font-size: 13px;
}
.active{
    background-color:#fff;
    border-radius: 5px;
}
</style>