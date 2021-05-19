<template>
  <div style="height:100%;">
    <header>
      <div class="prev" v-if="currentGameweek > 1" @click="prev">
        <i class="el-icon-caret-left"></i>上一轮
      </div>
      <el-select v-model="currentGameweek" placeholder="请选择" size="mini">
        <el-option v-for="item in rounds" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div class="next" v-if="currentGameweek < rounds.length" @click="next">
        下一轮
        <i class="el-icon-caret-right"></i>
      </div>
    </header>
    <section v-loading="loading">
      <ul>
        <li v-for="(item,index) in matchesScheduleData.matches" :key="index">
          <div class="time">{{item.start_play}}</div>
          <div class="team_info">
            <div class="team_A">
              <div class="team_logo"><img :src="item.team_A_logo" width="100%" height="100%"></div>
              <div class="team_name">{{item.team_A_name}}</div>
            </div>
            <div class="middle-info">
              <span v-if="item.status == 'Played'">{{item.fs_A}}-{{item.fs_B}}</span>
              <span v-else>VS</span>
            </div>
            <div class="team_B">
              <div class="team_logo"><img :src="item.team_B_logo" width="100%" height="100%"></div>
              <div class="team_name">{{item.team_B_name}}</div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "schedule",
  data() {
    return {
      loading: true,
      currentGameweek: 1,
      rounds: [],
      isInit: false
    };
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
    },
    currentGameweek: {
      handler(n) {
        this.currentGameweek = n;
        this.loadMatches();
      }
    }
  },
  computed: {
    ...mapState("matchesStore", {
      matchesScheduleData: state => state.matchesScheduleData
    })
  },
  mounted() {
    if (this.seasonId == "0") return false;
    this.init();
  },
  methods: {
    ...mapActions("matchesStore", ["getMatchesSchedule"]),
    /**
     * 初始化
     */
    init() {
      this.isInit = true;
      this.rounds = [];
      this.currentGameweek = 1;
      this.getMatchesSchedule({ season_id: this.seasonId, gameweek: 1 }).then(
        res => {
          this.loading = false;
          for (let i = 1; i <= res.gameweek_total; i++) {
            let obj = {
              value: i,
              label: "第" + i + "轮"
            };
            this.rounds.push(obj);
          }
          this.isInit = false;
        }
      );
    },
    /**
     * 加载指定轮次赛程
     */
    loadMatches() {
      let that = this;
      if (!this.isInit)
        this.getMatchesSchedule({
          season_id: this.seasonId,
          gameweek: this.currentGameweek
        }).then(() => {
          this.loading = false;
          console.log(that.matchesScheduleData);
        });
    },

    prev(){
      this.currentGameweek -= 1;
    },
    next(){
      this.currentGameweek += 1;
    }
  }
};
</script>

<style lang="less" scoped>
header {
  height: 40px;
  position: relative;
}
.prev {
  float: left;
  line-height: 30px;
  font-size: 14px;
  margin: 5px 0 5px 10px;
}
.el-select {
      width: 90px;
    margin-top: -15px;
    position: absolute;
    left: 50%;
    margin-left: -45px;
    top: 50%;
}
.next {
  float: right;
  line-height: 30px;
  font-size: 14px;
  margin: 5px 10px 5px 0;
}
section{
  height: ~"calc(100% - 40px)";
  overflow: scroll;
  overflow-y: scroll;
}
ul{
  list-style: none;
  padding:0;
  margin: 0;
}
section ul li{
  height: 70px;
  border-bottom: 1px solid #eeefff;
  box-sizing: border-box;
  margin-bottom: 10px;
}
ul li .time{
  font-size: 12px;
  color:#999;
  height: 20px;
  line-height: 20px;
}
ul li .team_info{
  height: 50px;
}
ul li .team_info .team_A{
  float: left;
  width:40%;
}
ul li .team_info .team_A .team_name{
  float: right;
  margin-right: 10px;
}
ul li .team_info .team_A .team_logo{
  float: right;
}
ul li .team_info .middle-info{
  width: 20%;
  float: left;
  line-height: 40px;
  font-size: 22px;
}
ul li .team_info .team_B{
  float: left;
  width: 40%;
}
ul li .team_info .team_B .team_logo{
  float: left;
}
ul li .team_info .team_B .team_name{
  float: left;
  margin-left: 10px;
}
ul li .team_info .team_name{
  color:#333;
  font-size: 14px;
  display: inline-block;
  line-height: 40px;
}
ul li .team_info .team_logo{
  width:30px;
  height: 30px;
  margin-top: 5px;
}
</style>