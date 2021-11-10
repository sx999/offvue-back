<template>
    <div class="Picture-box">
        <!-- 头部功能 -->
         <div class="function">
            <!-- <el-input v-model="search.title" placeholder="图片名字"></el-input> -->
            <div class="label"> 轮播图类别:</div>
            <el-select v-model="search.region" placeholder="请选择图片归属">
                    <el-option label="首页" value="1"></el-option>
                    <el-option label="新闻动态" value="2"></el-option>
                    <el-option label="赛事活动" value="3"></el-option>
                    <el-option label="专家顾问" value="4"></el-option>
                    <el-option label="文创商城" value="5"></el-option>
                    <el-option label="关于我们" value="6"></el-option>
            </el-select>
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
                prop="rotationId"
                label="ID"
                width="200">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="日期"
                width="200">
            </el-table-column>
            <el-table-column
                prop="rotationName"
                label="图片分类名字"
                width="120">
            </el-table-column>
            <el-table-column
                label="图片"
                width="200">
                <template slot-scope="scope">
                    <el-link type="success" :underline="false" :href="scope.row.rotationUrl"  target="_blank"  >
						<img :src="scope.row.rotationUrl" alt="" width="100">
					</el-link>
                </template> 
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
        <!-- 编辑框 -->
        <el-dialog title="正在编辑. . ." :visible.sync="dialogVisible" width="42%">
            <div>
                <p>图片修改</p>
                <img class="compileImg" :src="information.rotationUrl" alt=""> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Affirm()">确 定</el-button>
            </span>
		</el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:false, //加载动画
            dialogVisible:false, //编辑框
            dialogImageUrl: '',
            dialogVisible1: false,
            information:{},
            tableData:[],
            search:{
                region:''
            },
        }
    },
    created(){},
    mounted(){
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
    methods: {
        //查询
        Queryall(){
            this.loading = true
                this.axios.post(this.$api_router.banner+'findAll')
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){ 
                            this.loading = false
                            this.tableData =  res.data.data
                            this.Dateformatting()
                            this.$message({
                            message: '查询成功',
                            type: 'success'
                            });
                            
                    }else{
                        this.$message({
                            message: '查询失败,'+res.data.msg,
                            type: 'warning'
                        });
                        return false
                    }
                })
                
        },
        // 时间格式化
        Dateformatting(){
                for(var i=0;i<this.tableData.length;i++){
                    this.tableData[i].createTime = this.moment(this.tableData[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                    this.tableData[i].updateTime = this.moment(this.tableData[i].updateTime).format("YYYY-MM-DD HH:mm:ss")
                    this.tableData[i].startTime = this.moment(this.tableData[i].startTime).format("YYYY-MM-DD HH:mm:ss")
                    this.tableData[i].endTime = this.moment(this.tableData[i].endTime).format("YYYY-MM-DD HH:mm:ss")
                }
        },
        //修改弹出
        Compile(index,row){
            console.log(row[index])
            this.dialogVisible = true
            this.information = row[index]
            // this.dialogImageUrl=row[index].rotationUrl
        },
        //确认修改
        Affirm(){

        },
         //删除
       Remove(index,row){
           console.log(row[index].rotationId)
           this.$confirm("确定移除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(()=>{
                this.axios.post(this.$api_router.banner+'delOne?id='+row[index].rotationId)
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
       handleRemove(file, fileList) {
        console.log(file, fileList);
       },
       handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
       }
    }
}
</script>
<style scoped="scoped">
    .Picture-box{
        width: 100%;
    }
    .Picture-box .function{
        margin: 20px 0;
        width: 100%;
        display: flex;
    }
    .Picture-box .function .label{
        padding: 0 10px;
        margin-right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #606266;
        font-size: 16px;
    }
    .Picture-box .function .el-input{
        width: 260px;
    }
    .Picture-box .function .el-button{
        margin-left: 30px;
    }
    .Picture-box .function-1{
        padding-right: 20px;
        width: 60%;
        display: flex;
        justify-content:space-between;
    }
    .Picture-box .list .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .Picture-box .list .el-button{
        width: 60px;
        font-size: 13px;
        border: 1px solid #ccc;
    }
    .compileImg{
        width: 100px;
        /* height: 100px; */
    }
</style>