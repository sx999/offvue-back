<template>
    <div class="Project-box">
        <div class="function">
            <el-input v-model="search.title" placeholder="项目标题"></el-input>
            <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
            <div class="function-1">
                <div></div>
                <el-button type="primary" icon="el-icon-plus" @click="AddData()">新增</el-button>
            </div>
        </div>
        <!-- table -->
        <div class="list">
            <el-table
            v-loading="loading"
            :data="ftableData"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                width="80">
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="title"
                label="项目标题"
                width="120">
            </el-table-column>
            <el-table-column
                prop="detail"
                label="项目介绍"
                width="180">
            </el-table-column>
            <el-table-column
                prop="text"
                label="项目详情"
                width="180">
            </el-table-column>
           <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope" class="templateol">
                <el-button type="text" @click.native.prevent="Compile(scope.$index,tableData)">修改</el-button>
                <!-- <span>|</span> -->
                <el-button type="text" @click.native.prevent="Remove(scope.$index, tableData)">移除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:false, //加载动画
            // dialogVisible:false,  //详情框
            // information:{},  //详情页存放数据
            tableData: [{
                id:'1',
                date: '2016-05-02',
                title:"标题标题标题1",
                detail:'简介简介简介简介简介简介',
                text: '内容内容内容内容内容内容内容内容内容内容内容内容内容'
            }, {
                id:'2',
                date: '2016-05-02',
                title:"标题标题标题2",
                detail:'简介简介简介简介简介简介简介',
                text: '内容内容内容内容内容内容内容内容内容内容内容内容内'
            }, {
                id:'3',
                date: '2016-05-02',
                title:"标题标题标题3",
                detail:'简介简介简介简介简介简介简介',
                text: '内容内容内容内容内容内容内容内容内容内容内容内容'
            }, {
                id:'4',
                date: '2016-05-02',
                title:"标题标题标题4",
                detail:'简介简介简介简介简介简介简介',
                text: '内容内容内容内容内容内容内容内容内容内容内容内容内容'
            }],
            search:{
                title:''
            },
        }
    },
    created(){},
    mounted(){
        //进页面查询全部
          this.Queryall()
    },
    computed:{
			//过滤
			"ftableData":function(){	
			return this.tableData.filter(row=>{
				// 默认过滤出来所有内容
				var flag=true
				// 对搜索的内容进行循环
				for(var k in this.search){
					// 判断搜索的条件不为空，并且搜索的条件不满足的情况下
					if(!!this.search[k]&&!String(row[k]).includes(this.search[k])){
						flag=false
					}
				}
				return flag
			})
			},
	},
    methods:{
        // 查询全部
       Queryall(){
            this.axios.post(this.$api_router.project+'findAll')
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
						// this.tableData =  res.data.data
						this.$message({
						  message: '查询成功',
						  type: 'success'
						});
						this.loading = false
                }else{
                    this.$message({
                        message: '查询失败,'+res.data.msg,
                        type: 'warning'
                    });
                    return false
                }
            })
            
       },
       //新增
       AddData(){
           this.$router.push({path:'operator',query:{data:'',}})
       },
       //编辑
       Compile(index,row){
        //    console.log(row[index])
           var data = row[index]
           this.$router.push({path:'operator',query:{data:data}})
       },
       //删除
       Remove(index,row){
           console.log(row[index].id)
           this.$confirm("确定移除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(()=>{
                this.axios.post(this.$api_router.project+'delOne?id='+row[index].id)
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        row.splice(index, 1);
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.data.msg
                        });
                    }
                })
            })
       },
       
    }
}
</script>
<style>
    .Project-box{
        width: 100%;
    }
    .Project-box .function{
        width: 100%;
        display: flex;
    }
    .Project-box .function .el-input{
        width: 260px;
    }
    .Project-box .function .el-button{
        margin-left: 30px;
    }
    .Project-box .function-1{
        padding-right: 20px;
        width: 60%;
        display: flex;
        justify-content:space-between;
    }
    .Project-box .list .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .Project-box .list .el-button{
        width: 60px;
        font-size: 13px;
        border: 1px solid #ccc;
    }
    
</style>