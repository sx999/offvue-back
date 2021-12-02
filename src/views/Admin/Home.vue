<template>
     <div>
       <h1>首页</h1>
     </div>
</template>
<script>
export default {
    data(){
        return{
            count: 0,
            loading: false
        }
    },
    created(){
      
    },
    computed:{
        noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods:{
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      }
    }
}
</script>
<style scoped='scoped'>
	
</style>
