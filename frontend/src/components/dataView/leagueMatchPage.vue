<template>
  <div style="height:100%">
    <header>
      <div class="box">
        <div @click="selectTab(1)" :class="currentTabType == 1 ? 'active' : ''">积分榜</div>
        <div @click="selectTab(2)" :class="currentTabType == 2 ? 'active' : ''">进球榜</div>
        <div @click="selectTab(3)" :class="currentTabType == 3 ? 'active' : ''">助攻榜</div>
        <div @click="selectTab(4)" :class="currentTabType == 4 ? 'active' : ''">赛程</div>
      </div>
    </header>
    <section>
      <standing v-show="currentTabType == 1" :seasonId="seasonId"></standing>
      <person-goals-ranking v-show="currentTabType == 2" :seasonId="seasonId"></person-goals-ranking>
      <person-assist-ranking v-show="currentTabType == 3" :seasonId="seasonId"></person-assist-ranking>
      <schedule v-show="currentTabType == 4" :seasonId="seasonId"></schedule>
    </section>
  </div>
</template>

<script>
import standing from './standing'
import personGoalsRanking from './personGoalsRanking'
import personAssistRanking from './personAssistRanking'
import schedule from './schedule'
export default {
  name: "league-match-page",
  data() {
    return {
      currentTabType:1
    };
  },
  components:{
    standing,personGoalsRanking,personAssistRanking,schedule
  },
  props: {
    seasonId:Number
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
      console.log(this.seasonId,this.currentTabType);
    },
    selectTab(tab){
      this.currentTabType = tab;
      console.log(this.seasonId,this.currentTabType);
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
section{
  height: ~"calc(100% - 50px)";
  overflow: scroll;
  overflow-y: scroll;
}
</style>