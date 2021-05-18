<template>
  <div style="height:100%;" v-loading="loading">
    <el-table :data="standingDataArr" style="width: 100%">
      <el-table-column type="index" label="排名" width="40"></el-table-column>
      <el-table-column label width="150">
        <template slot-scope="scope">
          <div style="width:20px;height:20px;float:left; margin-right:10px;">
            <img :src="scope.row.team_logo" height="100%" width="100%" />
          </div>
          <div style="float:left;">
            <span style="font-size:14px">{{ scope.row.team_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="matches_total" label="赛" width="20"></el-table-column>
      <el-table-column prop="matches_won" label="胜" width="20"></el-table-column>
      <el-table-column prop="matches_draw" label="平" width="20"></el-table-column>
      <el-table-column prop="matches_lost" label="负" width="20"></el-table-column>
      <el-table-column prop="goals_pro" label="进" width="20"></el-table-column>
      <el-table-column prop="goals_against" label="失" width="20"></el-table-column>
      <el-table-column prop="points" label="积分" width="40"></el-table-column>
    </el-table>
    <div class="match-info">
      <p>赛事说明</p>
      {{standingData.description}}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "standing",
  data() {
    return {
      standingDataArr: [],
      loading: true
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
    }
  },
  mounted() {
    if (this.seasonId == "0") return false;
    this.getMatchesStandingData(this.seasonId).then(res => {
      this.loading = false;
      this.standingDataArr = res.data;
    });
  },
  computed: {
    ...mapState("matchesStore", {
      standingData: state => state.standingData
    })
  },
  methods: {
    ...mapActions("matchesStore", ["getMatchesStandingData"]),
    init() {
      this.getMatchesStandingData(this.seasonId).then(res => {
        this.loading = false;
        this.standingDataArr = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
/deep/ .el-table .cell {
  font-size: 13px !important;
  font-weight: 500 !important;
  padding: 0;
}
/deep/ .el-table .cell {
  text-align: center;
}
/deep/ .el-table td {
  border: none;
}
/deep/ .el-table th.is-leaf {
  border: none;
}
/deep/ .el-table__header {
  width: 100% !important;
}
/deep/ .el-table__body {
  width: 100% !important;
}
/deep/ .el-table__body .el-table__row:nth-child(1) {
  background-color: oldlace;
}
/deep/ .el-table__body .el-table__row:nth-child(2) {
  background-color: oldlace;
}
/deep/ .el-table__body .el-table__row:nth-child(3) {
  background-color: oldlace;
}
/deep/ .el-table__body .el-table__row:nth-child(4) {
  background-color: oldlace;
}
/deep/ .el-table__body .el-table__row:nth-child(5) {
  background-color: #f0f9eb;
}
/deep/ .el-table__body .el-table__row:nth-child(6) {
  background-color: #f0f9eb;
}
.match-info {
  padding: 0 10px 20px 10px;
  white-space: pre-wrap;
  font-size: 13px;
  color: #666;
  text-align: left;
}
.match-info p {
  font-weight: bold;
  color: #333;
  font-size: 14px;
}
</style>