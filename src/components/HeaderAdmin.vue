<template>
<div>
    <div class="header-list">
        <img src="../assets/images/gg.png" style="width:50px" alt="无法显示图片">
        <div class="header-text">
            <span class="header-text-1">欢迎您，管理员:<span style="color:#4f5555;">{{username}}</span></span>
            <span class="header-text-2" @click="Signout">退出</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            username:""
        }
    },
    mounted(){
        //获取本地存储
        this.username = localStorage.getItem('username');
    },
    methods:{
        Signout(){
           this.$confirm("退出登录, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			  }).then(() => {
				sessionStorage.clear();
                localStorage.clear()
				this.$router.push({ path: "/login" });
			  });
			},
    },
}
</script>
<style scoped>
    .header-list{
		display: flex;
		align-items: center;
	}
	.header-text{
		margin-left: 40px;
	}
	.header-text span:nth-child(2){
		margin-left: 15px;
		color: #5e7c85;
		cursor: pointer;
	}
</style>