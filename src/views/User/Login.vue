<template>
	<div class="box">
		<div class="container right-panel-active">
				<!-- Sign Up -->
				<div class="container__form container--signup">
					<div  class="form" id="form1">
						<h2 class="form__title">Sign In</h2>
						<input type="text" v-model="formLabelAlign.username" placeholder="User" class="input" />
						<input type="password" v-model="formLabelAlign.password" placeholder="Password" class="input"/>
						<button class="btn" @click="SignUp()" @keyup.enter="SignUp()" >Sign Up</button>
					</div>
				</div>

				<!-- Sign In -->
				<!-- <div class="container__form container--signin">
					<form action="#" class="form" id="form2">
						<h2 class="form__title"></h2>
						<input type="email" placeholder="Email" class="input" />
						<input type="password" placeholder="Password" class="input" />
						<a href="#" class="link">Forgot your password?</a>
						<button class="btn">Sign In</button>
					</form>
				</div> -->

				<!-- Overlay -->
				<div class="container__overlay">
					<div class="overlay">
						<div class="overlay__panel overlay--left">
							<button class="btn" id="signIn">Hello-world</button>
						</div>
						<div class="overlay__panel overlay--right">
							<button class="btn" id="signUp">Hello-world</button>
						</div>
					</div>
				</div>
		</div>
	</div>
</template>
<script>

    export default {
        name:'Login',
        data(){
            return{
				formLabelAlign:{
					username:"",
					password:"",
				}
            }
        },
        created(){
			
        },
		mounted(){
			// 绑定监听事件
			 window.addEventListener("keydown", this.keyDown);
		},
		destroyed() {
		    // 销毁事件
		    window.removeEventListener("keydown", this.keyDown, false);
		},
        methods:{
				SignUp(){
					console.log(this.formLabelAlign.username,this.formLabelAlign.password)
					if(this.formLabelAlign.username!= "" && this.formLabelAlign.password != ""){
						this.axios.post(this.$api_router.login+'?adminAccount='+this.formLabelAlign.username+'&adminPassword='+this.formLabelAlign.password)
						.then(res=>{
							console.log(res)
							if(res.data.code==200){
								this.$message({
									showClose: true,
									offset: 60,
									message: '欢迎登录行由心后台管理',
									type: 'success',
									duration: 600,
								});
								//登录成功保存登录信息
								localStorage.setItem("username",res.data.data.adminName);
								//保存唯一id
								localStorage.setItem("userid",res.data.data.adminId);
								//保存一个登录数据token
								window.sessionStorage.setItem('cat_token', res.data.data.token)
								this.$router.push({path:"/"})
							}
							else{
								this.$message({
									message: res.data.msg,
									type: 'warning',
									// center: true
								});
							}
						})
					}else{
						 this.$message({
						  message: '输入不完整',
						  type: 'warning',
						//   center: true
						});
					}
					
				},
				keyDown(e){
				// 回车则执行登录方法 enter键的ASCII是13	
					if (e.keyCode === 13) {
						this.SignUp(); // 定义的登录方法
					}
				},
        }
    }
</script>
<style scoped='scoped'>
	@import "../../assets/css/login.css";
</style>
