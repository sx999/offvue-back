<template>
    <div class="Mission-box">
        <!-- 功能 -->
        <div class="function">
            <div class="flex">
                <el-input v-model="search.headline" placeholder="标题"></el-input>
                <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
            </div> 
            <el-button type="primary" icon="el-icon-edit" @click="Reset()">重置筛选条件</el-button>
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
                width="180">
            </el-table-column>
             <el-table-column
                prop="createTime"
                label="开始-日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                label="更新-日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="headline"
                label="标题"
                width="180">
            </el-table-column>  
            <el-table-column
                prop="content"
                label="内容简介"
                width="180">
            </el-table-column> 
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope" class="templateol">
                <el-button type="text" @click.native.prevent="Compile(scope.$index,tableData)">修改</el-button>
                <el-button type="text" @click.native.prevent="Remove(scope.$index, tableData)">移除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
         <!-- 编辑框 -->
        <el-dialog title="正在编辑. . ." 
        :visible.sync="dialogVisible" 
        width="50%" 
        :before-close="handleDialogClose"
        :close-on-click-modal="false">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                 <el-form-item label="标题" prop="headline">
                    <el-input v-model="ruleForm.headline" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" v-model="ruleForm.content" placeholder="内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close()">取 消</el-button>
                <el-button type="primary" @click="Affirm()" v-if="detail==1">确 定</el-button>
                <el-button type="primary" @click="Affirm1()" v-if="detail==2">保 存</el-button>
            </span>
		</el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:false, //加载动画
            dialogVisible:false,  //详情框
            information:{},  //详情页存放数据
            tableData: [],
            search:{
               headline:'',
            },
            ruleForm:{
                content:"",
                headline:"",
            },
            detail:"",  //1修改 2添加
            rules: {
                headline:[
                    {required: true, message: '标题不能为空', trigger: 'blur'}
                ],
                content:[
                    {required: true, message: '内容不能为空', trigger: 'blur'}
                ]
            }
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
            this.axios.post(this.$api_router.mission+'findAll')
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
                        this.tableData =  res.data.data
                       
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
        // 时间格式化
        Dateformatting(){
            for(var i=0;i<this.tableData.length;i++){
                this.tableData[i].createTime = this.moment(this.tableData[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].updateTime = this.moment(this.tableData[i].updateTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].startTime = this.moment(this.tableData[i].startTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].endTime = this.moment(this.tableData[i].endTime).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        //添加弹出
        AddData(){
            this.detail = 2
            this.dialogVisible = true   
        },
        //修改弹出
        Compile(index,row){
                this.detail = 1
                console.log(row[index])
                this.dialogVisible = true
                // row[index].createTime =  ""
                // row[index].endTime =  ""
                // row[index].startTime =  ""
                // row[index].updateTime =  ""
                // row[index].dateTime = ""
                this.ruleForm = row[index]
        },
        //取消修改
        close(){
            this.dialogVisible = false
            // this.ruleForm.content=""
            // this.ruleForm.headline=""
            // this.newimg = ""
        },
        //确认修改
        Affirm(){
                this.ruleForm.createTime =  ""
                this.ruleForm.endTime =  ""
                this.ruleForm.startTime =  ""
                this.ruleForm.updateTime =  ""
                this.ruleForm.dateTime = ""
                //this.ruleForm.memberPic = this.newimg
                this.axios.post(this.$api_router.mission+'updateOne',this.ruleForm)
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.Queryall()
                        this.ruleForm.headline="",
                        this.ruleForm.content=""
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                        return false
                    }
                })
                this.dialogVisible = false
        },
        //确认保存
        Affirm1(){
            // this.ruleForm.memberPic = this.newimg
            this.axios.post(this.$api_router.mission+'saveOne',this.ruleForm)
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                    this.Queryall()
                    this.dialogVisible = false
                }else{
                    this.$message({
                    message: res.data.msg,
                    type: 'warning'
                });
                }
            })  
        },
        //删除
        Remove(index,row){
            console.log(row[index].id)
            this.$confirm("确定移除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(()=>{
                    this.axios.post(this.$api_router.mission+'delOne?id='+row[index].id)
                    .then(res=>{
                        console.log(res)
                        if(res.data.code == 200){
                            row.splice(index, 1);
                            this.$message({
                            message: '修改成功',
                            type: 'success'
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.data.msg
                            });
                        }
                    })
                })
        },
         //重置筛选条件
        Reset(){
            this.search.headline = ""
            // this.search.region = ""

        },
        //右上角
        handleDialogClose(){
            this.close()
        }
    }
}
</script>
<style>
    .flex{
        display: flex;
    }
    .Mission-box{
        width: 100%;
    }
    .Mission-box .function{
        width: 100%;
        display: flex;
    }
    .Mission-box .function .el-input{
        width: 220px;
    }
    .Mission-box .function .el-button{
        margin-left: 30px;
    }
    .Mission-box .function-1{
        padding-right: 20px;
        width: 60%;
        display: flex;
        justify-content: space-between;
    }
    .Mission-box .list .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .Mission-box .list .el-button{
        width: 60px;
        font-size: 13px;
        border: 1px solid #ccc;
    }
    .Mission-box .title{
        margin-left: 50px;
        padding: 0 10px;
        width: 50px;
        display: flex;
        align-items: center;
        color: #606266;
    }
    .Mission-box .el-dialog .el-input__inner{
        width: 60%;
    }
    .Mission-box .red{
        font-size: 14px;
        color:#f58f98;
        margin-left: 20px;
    }
</style> 