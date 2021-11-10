<template>
    <div>   
        <el-container class="main">
          <!-- 侧边导航 -->
            <Navigation></Navigation>
          <!-- 中间部分 -->
          <el-container>
            <!-- 头部 -->
              <el-header class="header">
               <HeaderAdmin></HeaderAdmin>
              </el-header>
              <!-- 子路由内容切换 -->
              <el-main class="center">
                <router-view/>
              </el-main>
              <!-- 底部样式 -->
              <!-- <el-footer class="bottom">
                底部
              </el-footer> -->
          </el-container>
        </el-container>
    </div>
</template>
<script>
//引入组件模板
import Navigation from '@/components/Navigation.vue'
import HeaderAdmin from '@/components/HeaderAdmin.vue'

export default {  
    data(){
        return{

        }
    },
    components: {Navigation,HeaderAdmin},
    created(){

    },
}
</script>
<style scoped>
    .main{
      width: 100vw;
      height: 100vh;
      display: flex;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .header{
      display: flex;
      align-items: center;
      width: 98%;
      margin-left: 30px;
      height: 100px;
      border-radius: 0 0 0 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #a0b4ba;
      
    }
    .center{
      width: 98%;
      margin-top: 30px;
      margin-left: 30px;
      padding: 10px 20px;
      border-radius: 4px 0;
      /* background-color: #dbe6f6; */
      background-color: #FFFFFF;
      box-shadow: 0px 0px 4px #333;
      overflow-y: hidden;
          /* background: linear-gradient(to right, rgb(26, 41, 128), rgb(38, 208, 206)); */
    }
    .bottom{
      margin:  0 0 0 30px;
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
</style>