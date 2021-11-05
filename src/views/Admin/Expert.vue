<template>
    <div>
        <div v-for="item in list" :key="item.id">
            <img :src="item.expertPic" alt="" width="50">
        </div>    
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.axios.post(this.$api_router.expertfindAll)
        .then(res=>{
            console.log(res)
            this.list =  res.data.data
        })
    },
    mounted(){

    },
    methods:{

    }
}
</script>
<style scoped>

</style>