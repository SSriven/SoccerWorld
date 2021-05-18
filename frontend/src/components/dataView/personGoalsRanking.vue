<template>
  <div style="height:100%;" v-loading="loading">
    <el-table :data="personGoalsRankingArr" style="width: 100%">
      <el-table-column type="index" label="排名" width="40"></el-table-column>
      <el-table-column label width="150">
        <template slot-scope="scope">
          <div class="logo">
            <img :src="scope.row.person_logo" height="100%" width="100%" />
          </div>
          <div class="person-name">{{ scope.row.person_name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="team_name" label="球队" width="100"></el-table-column>
      <el-table-column prop="count" label="进球(点球)" width="80"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "person-golas-ranking",
  data() {
    return {
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
  computed: {
    ...mapState("matchesStore", {
      personGoalsRankingArr: state => state.personGoalsRankingArr
    })
  },
  mounted() {
    if (this.seasonId == "0") return false;
    this.init()
  },
  methods: {
    ...mapActions("matchesStore", ["getPersonGoalsRanking"]),
    init() {
      this.getPersonGoalsRanking(this.seasonId).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-table .cell {
  font-size: 13px !important;
  font-weight: 500 !important;
  padding: 0;
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
.logo {
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 10px;
}
.person-name {
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  width: 110px;
  text-align: left;
}
</style>