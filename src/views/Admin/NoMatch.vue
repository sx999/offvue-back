<template>
    <div class="Nomatch-box">
        <!-- <h1>页面不存在</h1> -->
        <img src="../../assets/images/nomatch.jpg" alt="">
        <el-button type="info" plain @click="backhome()">返回首页</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        //反回首页
        backhome(){
            this.$router.push({path:'home',query:{}})
        }
    }
}
</script>
<style scoped>
    .Nomatch-box{
        width: 100%;
        height: 100vh;
        /* background: url('../../assets/images/nomatch.png') no-repeat; */
        position: relative;
    }
    .Nomatch-box img{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .Nomatch-box .el-button{
        z-index: 98;
        position: absolute;
        left: 50%;
        top: 68%;
        transform: translate(-50%,-50%);
    }
</style>