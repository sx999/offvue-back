<template>
	<div class="box">
		<div class="container right-panel-active">
				<!-- Sign Up -->
				<div class="container__form container--signup">
					<form  class="form" id="form1">
						<h2 class="form__title">Sign In</h2>
						<input type="text" v-model="formLabelAlign.username" placeholder="User" class="input" />
						<input type="password" v-model="formLabelAlign.password" placeholder="Password" class="input"/>
						<button class="btn" @click="SignUp()" @keyup.enter="SignUp()" >Sign Up</button>
					</form>
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
					usernmae:"",
					password:"",
				}
            }
        },
        created(){
            
        },
        methods:{
				SignUp(){
					console.log(this.formLabelAlign.username,this.formLabelAlign.password)
				}
        }
    }
</script>
<style scoped>
	@import "../../assets/css/login.css";
</style>
