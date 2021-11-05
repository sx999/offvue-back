<template>
    <el-aside width="200px" :style="{'width':isCollapse ? '64px':'200px','background-color':'#545c64','overflow':'hidden'}">
        <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse" 
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true">
        <div>
 			<img src="../assets/images/logo.jpg" alt="" id="in-img" width="200" style="margin-right: 30px;height: 100px;">
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
            <el-menu-item index="/demond">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">测试1</span>
            </el-menu-item>
            <el-submenu index="1">
 			      <template slot="title">
 			        <i class="el-icon-user-solid"></i>
 			        <span slot="title">测试2</span>
 			      </template>
 					 <el-menu-item index="1-1">测试2-1</el-menu-item>
 					 <el-menu-item index="1-1">测试2-2</el-menu-item>
					 <el-menu-item index="1-3r">测试2-3</el-menu-item>
 			  </el-submenu>
            <el-menu-item index="/expert">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">专家顾问</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">测试4</span>
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
   /* .el-menu--collapse{
        width: 70px !important;
    } */
</style>