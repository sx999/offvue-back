<template>
    <div id="box">
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="轮播图" name="first">
            轮播图

        </el-tab-pane>
        <el-tab-pane label="图1" name="second">
            图1
        </el-tab-pane>
        <el-tab-pane label="图2" name="third">
            图2
        </el-tab-pane>
    </el-tabs>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeName: 'first'
        }
    },
     methods: {
   
    }
}
</script>
<style scoped="scoped">
    #box{
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
    }
</style>