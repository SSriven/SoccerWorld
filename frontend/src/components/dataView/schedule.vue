<template>
  <div style="height:100%;" v-loading="loading">
    111
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "schedule",
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
      personAssistRankingArr: state => state.personAssistRankingArr
    })
  },
  mounted() {
    if (this.seasonId == "0") return false;
    this.init()
  },
  methods: {
    ...mapActions("matchesStore", ["getPersonAssistRanking"]),
    init() {
      this.getPersonAssistRanking(this.seasonId).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>

</style>