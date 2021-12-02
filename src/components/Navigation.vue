<template>
    <el-aside width="200px" :style="{'width':isCollapse ? '73px':'200px','background-color':'#545c64','overflow':'hidden'}">
        <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse" 
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true">
        <div>
 			<img src="../assets/images/logo.png" alt="" id="in-img" width="200" style="margin-right: 30px;height: 80px;">
 		</div>
            <el-menu-item>
                <i class="el-icon-menu" 
                :icon="isCollapse?'el-icon-menu':'el-icon-s-grid'"
                @click="isCollapse=!isCollapse"></i>
                <span slot="title" v-if="!isCollapse">收起</span>
                <span slot="title" v-if="isCollapse">展开</span>
            </el-menu-item>
            <el-menu-item  index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/picture">
                <i class="el-icon-picture"></i>
                <span slot="title">图片处理</span>
            </el-menu-item>
            <!-- <el-menu-item index="/expert" disabled>
                <i class="el-icon-s-custom"></i>
                <span slot="title" disabled>专家顾问</span>
            </el-menu-item>
            <el-menu-item index="/mission" disabled>
                <i class="el-icon-s-promotion" ></i>
                <span slot="title">公司使命</span>
            </el-menu-item> -->
            <!-- <el-submenu index="/events">
                <template slot="title">
                <i class="el-icon-s-claim"></i>
                <span slot="title">活动/赛事</span>
                </template>
                    <el-menu-item index="/events/competition">赛事</el-menu-item>
                    <el-menu-item index="/events/activity">活动</el-menu-item>
 			</el-submenu> -->
            <el-menu-item index="/events">
                <i class="el-icon-user-solid"></i>
                <span slot="title">活动/赛事</span>
            </el-menu-item>
            <el-menu-item index="/members">
                <i class="el-icon-user-solid"></i>
                <span slot="title">成员介绍</span>
            </el-menu-item>
             <el-menu-item index="/contact">
                <i class="el-icon-phone"></i>
                <span slot="title">联系方式</span>
            </el-menu-item>
            <el-menu-item index="/tradenews">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title">行业新闻</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-s-claim"></i>
                <span slot="title">服务信息</span>
                </template>
                    <el-menu-item index="/invite">招聘信息</el-menu-item>
                    <el-menu-item index="/joinme">加入我们</el-menu-item>
 			</el-submenu>
            <el-menu-item index="/project" disabled>
                <i class="el-icon-s-management"></i>
                <span slot="title" >项目专栏</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>
<script>
    export default {
        data(){
            return{
                isCollapse:false,
				data:[],
				state:{
					packup:"收起",
					unfold:"展开"
				},
				keyname:""
            }
        },
        components:{},
		created() {
			
		},
        methods: {
           
        }
    }
</script>
<style scoped>
    .el-menu{
        border-right: 0px !important; 
      
    }
    .el-aside{
      transition: all .3s;
      -webkit-transition: all .3s;
    }
   /* .el-menu--collapse{
        width: 70px !important;
    } */
</style>