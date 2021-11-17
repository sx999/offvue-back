<template>
    <div class="Expert-box">
        <!-- 功能 -->
        <div class="function">
            <div class="flex">
                <el-input v-model="search.expertName" placeholder="专家姓名"></el-input>
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
                prop="updateTime"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="expertName"
                label="专家姓名"
                width="100">
            </el-table-column>  
            <el-table-column
                prop="expertTitle"
                label="职位"
                width="160">
            </el-table-column>
            <el-table-column
                prop="expertPhone"
                label="手机号"
                width="150">
            </el-table-column>  
            <el-table-column
                prop="expertMailbox"
                label="邮箱"
                width="150">
            </el-table-column>  
            <el-table-column
                label="图片"
                width="200">
                <template slot-scope="scope">
                    <el-link type="success" :underline="false" :href="scope.row.expertPic"  target="_blank"  >
						<img :src="scope.row.expertPic" alt="" width="100">
					</el-link>
                </template> 
            </el-table-column>
            <el-table-column
                prop="expertDetails"
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
                <el-form-item label="专家名称" prop="expertName">
                    <el-input v-model="ruleForm.expertName" placeholder="请输入专家名称"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="expertTitle">
                    <el-input v-model="ruleForm.expertTitle" placeholder="请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="expertPhone">
                    <el-input v-model="ruleForm.expertPhone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="expertMailbox">
                    <el-input v-model="ruleForm.expertMailbox" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                </el-form-item>
                <el-form-item label="预览图片:">
                     <el-link type="success" :underline="false" :href="ruleForm.expertPic"  target="_blank"  >
						<img :src="ruleForm.expertPic" alt="" width="100">
					</el-link>
                </el-form-item>
                <el-form-item label="内容" prop="expertDetails">
                    <el-input type="textarea" v-model="ruleForm.expertDetails" placeholder="内容"></el-input>
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
               expertName:'',
            },
            ruleForm:{
                expertName:"",
                expertDetails:"",
                expertPic:"",
                expertTitle:"",
                expertPhone:"",
                expertMailbox:"",
            },
            file:"",
            newimg:"",
            detail:"",  //1修改 2添加
            rules: {
                expertName:[
                    {required: true, message: '专家姓名为空', trigger: 'blur'}
                ],
                expertTitle:[
                    {required: true, message: '职位不能为空', trigger: 'blur'}
                ],
                expertDetails:[
                    {required: true, message: '内容不能为空', trigger: 'blur'}
                ],
                expertPhone:[
                    {required: true, message: '手机号不能为空', trigger: 'blur'},
                ],
                 expertMailbox:[
                    {required: true, message: '邮箱不能为空', trigger: 'blur'},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
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
                this.axios.post(this.$api_router.expert+'findAll')
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                            this.tableData =  res.data.data
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
        // 时间格式化
        Dateformatting(){
            for(var i=0;i<this.tableData.length;i++){
                this.tableData[i].createTime = this.moment(this.tableData[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].updateTime = this.moment(this.tableData[i].updateTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].startTime = this.moment(this.tableData[i].startTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].endTime = this.moment(this.tableData[i].endTime).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        //图片回显
        updateFace(event) {
            this.file = event.target.files[0];
            console.log(this.file);
            let formData = new FormData();
            // 向 formData 对象中添加文件
            formData.append('file',this.file);
            console.log(formData)
            this.axios.post(this.$api_router.upImg,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(res => {
                console.log(res);
                this.ruleForm.expertPic =  res.data.msg
            }).catch(err => {
                console.log(err);
            });
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
                this.ruleForm = row[index]
        },
        //取消修改
        close(){
            this.dialogVisible = false
            this.ruleForm.expertName="",
            this.ruleForm.expertDetails="",
            this.ruleForm.expertPic="",
            this.ruleForm.expertTitle="",
            this.ruleForm.expertPhone="",
            this.ruleForm.expertMailbox="",
            this.file = ""
            this.Queryall()
            // this.newimg = ""
        },
        //确认修改
        Affirm(){
                this.ruleForm.createTime =  ""
                this.ruleForm.endTime =  ""
                this.ruleForm.startTime =  ""
                this.ruleForm.updateTime =  ""
                this.ruleForm.dateTime = ""
                this.axios.post(this.$api_router.expert+'updateOne',this.ruleForm)
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.Queryall()
                        this.ruleForm.expertName="",
                        this.ruleForm.expertTitle="",
                        this.ruleForm.expertDetails="",
                        this.ruleForm.expertPic="",
                        this.ruleForm.expertPhone="",
                        this.ruleForm.expertMailbox="",
                        this.file = ''
                        this.newimg = ''
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
            this.axios.post(this.$api_router.expert+'saveOne',this.ruleForm)
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
                    this.axios.post(this.$api_router.expert+'delOne?id='+row[index].id)
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
         //重置筛选条件
        Reset(){
            this.search.expertName = ""
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
    .Expert-box{
        width: 100%;
    }
    .Expert-box .function{
        width: 100%;
        display: flex;
    }
    .Expert-box .function .el-input{
        width: 220px;
    }
    .Expert-box .function .el-button{
        margin-left: 30px;
    }
    .Expert-box .function-1{
        padding-right: 20px;
        width: 60%;
        display: flex;
        justify-content: space-between;
    }
    .Expert-box .list .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .Expert-box .list .el-button{
        width: 60px;
        font-size: 13px;
        border: 1px solid #ccc;
    }
    .Expert-box .title{
        margin-left: 50px;
        padding: 0 10px;
        width: 50px;
        display: flex;
        align-items: center;
        color: #606266;
    }
    .Expert-box .el-dialog .el-input__inner{
        width: 60%;
    }
    .Expert-box .red{
        font-size: 14px;
        color:#f58f98;
        margin-left: 20px;
    }
</style>