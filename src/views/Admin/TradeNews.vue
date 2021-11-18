<template>
    <div class="TradeNews-box">
        <div class="function">
            <el-input v-model="search.consultTopic" placeholder="新闻标题"></el-input>
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
            max-height="700"
            style="width:100%">
            <el-table-column
                prop="id"
                label="ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="consultTopic"
                label="新闻标题"
                width="150">
            </el-table-column>
            <el-table-column
                prop="consultSynopsis"
                label="新闻内容简介"
                width="300">
            </el-table-column>
            <el-table-column
                label="图片"
                width="200">
                <template slot-scope="scope">
                    <el-link type="success" :underline="false" :href="scope.row.consultPic"  target="_blank"  >
						<img :src="scope.row.consultPic" alt="" width="100">
					</el-link>
                </template> 
            </el-table-column>
             <el-table-column
                prop="consultBrowse"
                label="阅读量"
                width="120">
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
        <div class="block">
			 <el-pagination
			   @current-change="getLista($event)"
			   :current-page="this.pageData.currentPage"
			   :page-size="this.pageData.pageSize"
			   layout="prev, pager, next"
			   :total="this.pageData.totalRecord">
			 </el-pagination>
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
            tableData: [],
            search:{
                consultTopic:''
            },
            pageData:{}, //页码
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
        //查询全部
       Queryall(){
            this.axios.post(this.$api_router.tradeNews+'list?currentPage=1&limit=6')
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
						this.tableData =  res.data.data.page.dataList
                        this.pageData =  res.data.data.page
						this.$message({
						  message: '查询成功',
						  type: 'success'
						});
                        this.Dateformatting()
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
       //时间格式化
       Dateformatting(){
                for(var i=0;i<this.tableData.length;i++){
                    this.tableData[i].createTime = this.moment(this.tableData[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                    this.tableData[i].updateTime = this.moment(this.tableData[i].updateTime).format("YYYY-MM-DD HH:mm:ss")
                    this.tableData[i].startTime = this.moment(this.tableData[i].startTime).format("YYYY-MM-DD HH:mm:ss")
                    this.tableData[i].endTime = this.moment(this.tableData[i].endTime).format("YYYY-MM-DD HH:mm:ss")
                }
       },
       //新增
       AddData(){
           this.$router.push({path:'operator',query:{data:'',type:"2"}})
       },
       //编辑
       Compile(index,row){
        //    console.log(row[index])
           var data = row[index]
           this.$router.push({path:'operator',query:{data:data,type:"2"}})
       },
       //删除
       Remove(index,row){
           console.log(row[index].id)
           this.$confirm("确定移除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(()=>{
                this.axios.post(this.$api_router.tradeNews+'delOne?id='+row[index].id)
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
       //分页
       getLista(event){
            console.log(event)
             this.axios.post(this.$api_router.tradeNews+'list?currentPage='+event+'&limit=6')
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
						this.tableData =  res.data.data.page.dataList
                        this.pageData =  res.data.data.page
						this.$message({
						  message: '查询成功',
						  type: 'success'
						});
                        this.Dateformatting()
						this.loading = false
                }else{
                    this.$message({
                        message: '查询失败,'+res.data.msg,
                        type: 'warning'
                    });
                    return false
                }
            })
	  }
    }
}
</script>
<style>
    .TradeNews-box{
        width: 100%;
    }
    .TradeNews-box .function{
        width: 100%;
        display: flex;
    }
    .TradeNews-box .function .el-input{
        width: 260px;
    }
    .TradeNews-box .function .el-button{
        margin-left: 30px;
    }
    .TradeNews-box .function-1{
        padding-right: 20px;
        width: 60%;
        display: flex;
        justify-content:space-between;
    }
    .TradeNews-box .list .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .TradeNews-box .list .el-button{
        width: 60px;
        font-size: 13px;
        border: 1px solid #ccc;
    }
    
</style>