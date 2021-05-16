<template>
    <div style="height:100%">
        <header>
            <ul>
                <li @click="selectTab('西甲')" :class="currentTab == '西甲' ? 'active' : ''">西甲</li>
                <li @click="selectTab('英超')" :class="currentTab == '英超' ? 'active' : ''">英超</li>
                <li @click="selectTab('意甲')" :class="currentTab == '意甲' ? 'active' : ''">意甲</li>
                <li @click="selectTab('德甲')" :class="currentTab == '德甲' ? 'active' : ''">德甲</li>
                <li @click="selectTab('法甲')" :class="currentTab == '法甲' ? 'active' : ''">法甲</li>
                <li @click="selectTab('中超')" :class="currentTab == '中超' ? 'active' : ''">中超</li>
            </ul>
        </header>
        <section :style="{height:sectionHeight + 'px'}">
            <league-match-page :seasonId="currentSeasonId"></league-match-page>
        </section>
    </div>
</template>

<script>
import leagueMatchPage from './leagueMatchPage'
import { mapActions, mapState } from "vuex";
export default {
    name:'MatchData',
    data(){
        return{
            currentTab:'西甲',
            currentSeasonId:"",
            sectionHeight:document.body.clientHeight - 120,
        }
    },
    computed:{
        ...mapState("matchesStore",{
            seasonIdArr:state=>state.seasonIdArr
        })
    },
    mounted(){
        this.getAllMatchesSeasonId().then(res=>{
            console.log(res)
            this.currentSeasonId = res[2].season_id
            console.log(this.currentSeasonId)
        })
    },
    components:{
        leagueMatchPage
    },
    methods:{
        selectTab(tab){
            this.currentTab = tab;
            this.seasonIdArr.forEach(ele => {
                if(ele.label == tab){
                    this.currentSeasonId = ele.season_id
                    return true;
                }
            })
            console.log(this.currentSeasonId)
        },
        ...mapActions("matchesStore",[
            "getAllMatchesSeasonId"
        ])
    }
}
</script>

<style scoped lang="less">
header{
    height:60px;
    position: relative;
}
header>ul{
    height: 100%;
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    align-items: center;
}
header>ul>li{
    flex: 1;
    font-size: 14px;
    color: #303133;
}
section{
    height: ~"calc(100% - 60px)";
}
.active{
    font-weight: bold;
    font-size: 16px;
}
</style>