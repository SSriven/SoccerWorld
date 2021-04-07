<template>
    <div class="news-content" v-loading="loading" @scroll="scrollEvent" ref="scrollDiv">
        <el-row v-for="(item,index) in soccerNewsList" 
        :key="index" 
        :newsid="item.id" 
        :typeid="item.type" 
        @click="handleNewsItem"
        class="news-item">
            <el-col :span="18" >
                <p class="news-title">{{item.title}}</p>
                <time>{{item.published_time}}</time>
            </el-col>
            <el-col :span="6" >
                <img style="height:100%;width:100%" :src="item.thumb">
            </el-col>
        </el-row>
        <div v-if="soccerNewsList.length > 0" class="load-more" @click="handleLoadMore">点击加载更多</div>
        <div v-else class="no-more">没有更多了</div>
        <div class="back-top" @click="handleBackTop"><i class="el-icon-top"></i></div>
    </div>
</template>

<script>
import {mapState ,mapActions} from "vuex"
import $ from "jQuery"
import Vue from "vue";
import { Message } from "element-ui";
Vue.prototype.$message = Message;
export default {
    name:"news-list-page",
    data(){
        return{
            msg:"",
            loading:false
        }
    },
    props:{
        newsType:String
    },
    watch:{
        newsType:{
            handler(n){
                this.newsType = n;
                this.init();
            }
        }
    },
    computed:{
        ...mapState('soccerStore',{
            soccerNewsList:state => state.soccerNewsList
        }),
        ...mapState('userStore',{
            user_id:state => state.user_id
        })
    },
    created(){
        this.init()
        console.log("created")
    },
    mounted(){
        //监听新闻item的点击事件
        $(".news-content").on("click",".news-item",this.handleNewsItem);
        console.log("mounted")
    },
    destroyed(){
        console.log("destroyed")
    },
    methods:{
        /**
         初始化
         */
        init(){
            console.log("初始化 "+this.newsType)
            $(".news-content").scrollTop(0);
            $(".back-top").hide()
            this.loading = true;
            switch(this.newsType){
                case "0":this.msg = "推荐";this.getRecommendData();break;
                case "1":this.msg = "快讯";this.getSoccerData("1");break;
                case "3":this.msg = "英超";this.getSoccerData("3");break;
                case "4":this.msg = "意甲";this.getSoccerData("4");break;
                case "5":this.msg = "西甲";this.getSoccerData("5");break;
                case "6":this.msg = "德甲";this.getSoccerData("6");break;
                case "57":this.msg = "五洲";this.getSoccerData("57");break;
                default:this.msg = "error";break;
            }
        },
        /**
         * 获取推荐信息
         */
        getRecommendData(){
            this.loading = false;
            this.$store.dispatch('soccerStore/getRecommendNewsList',this.user_id)
        },
        /**
         * 获取足球新闻列表
         */
        getSoccerData(typeid){
            let that = this;
            this.$store.dispatch('soccerStore/getSoccerNewsList',typeid).then(() => {
                that.loading =  false;
            }).catch(err=>{
                console.log(err)
                that.loading =  false;
                that.$message("请求超时")
            });
        },
        /**
         * 点击查看新闻详情
         */
        handleNewsItem(e){
            console.log(e);
            let pageid = e.currentTarget.attributes.newsid.value;
            let typeid = e.currentTarget.attributes.typeid.value;
            this.$router.push({ name: 'detail', query: { pageid, typeid } });
        },
        /**
         * 监听滚动事件
         */
        scrollEvent(){
            // console.log("滚动距离：",this.$refs.scrollDiv.scrollTop);
            // console.log("offset:",$(".load-more").offset())
            let offsettop = Math.floor($(".load-more").offset().top) - 30;
            let divHeight = $(".news-content").height();
            // console.log(offsettop,divHeight);
            if(this.$refs.scrollDiv.scrollTop >= 1000)
                $(".back-top").fadeIn("slow")
            else{
                $(".back-top").fadeOut("slow")
            }
            if(offsettop - divHeight <= 0)
                this.handleLoadMore()
        },
        /**
         * 点击加载更多
         */
        handleLoadMore(){
            console.log("到底了，加载更多")
            let arrLength = this.soccerNewsList.length - 1
            let typeid = this.soccerNewsList[arrLength].type;
            let last_time = this.soccerNewsList[arrLength].sort_timestamp;
            let obj = {
                typeid,last_time
            }
            console.log(typeid,last_time)
            this.getMoreSoccerNewsList(obj)
        },
        /**
         * 回到顶部
         */
        handleBackTop(){
            let begin = $(".news-content").scrollTop(),target = 0,speed = 0;
            let timer;
            timer = setInterval(function () {
                 //获取步长
                speed = (target - begin) * 0.2;
                //判断是向下还是向上取整
                speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);
                
                $(".news-content").scrollTop(speed + begin)
                begin = speed + begin
                if(begin <= target){
                    //清除定时器
                    clearInterval(timer);
                }

            },20);
        },
        ...mapActions('soccerStore',[
            'getSoccerNewsList',
            'getMoreSoccerNewsList',
            'getRecommendNewsList'
        ])
    }
}
</script>

<style scoped>
.news-content{
    height: 100%;
    overflow: scroll;
    overflow-y: scroll;
    position: relative;
}
.news-item{
    font-size: 14px;
    padding:18px 8px;
    border-bottom: 3px solid #eee;
    position: relative;
}
.news-item.el-row:active{
    background: #eee;
}
.el-col-18{
    padding-right: 10px;
}
.news-title{
    margin:0 0 5px 0;
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    text-align: left;
}
time{
    position:absolute;
    bottom: 18px;
    font-size: 13px;
    color: #999;
    left: 8px;
}
.load-more{
    height: 30px;
    line-height: 30px;
    background: #eee;
    font-size: 13px;
}
.back-top{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #eee;
    line-height: 55px;
    text-align: center;
    position: fixed;
    bottom: 70px;
    right: 20px;
    z-index: 999;
    font-size: 30px;
}
.back-top:active{
    background: #666;
}
.no-more{
    font-size: 13px;
    margin-top: 10px;
    color: #aaa;
}
</style>