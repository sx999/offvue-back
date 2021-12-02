<template>
    <div class="Invite-box">
        <div class="function">
            <el-input v-model="search.position" placeholder="职位查询"></el-input>
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
                prop="position"
                label="招聘职位"
                width="150">
            </el-table-column>
            <el-table-column
                prop="demand"
                label="岗位要求"
                width="300">
            </el-table-column>
             <el-table-column
                prop="conditions"
                label="岗位职责"
                width="300">
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
        <el-dialog title="正在编辑. . ." 
        :visible.sync="dialogVisible" 
        width="50%" 
        :before-close="handleDialogClose"
        :close-on-click-modal="false">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="招聘职位" prop="position">
                    <el-input v-model="ruleForm.position" placeholder="请输入职位名称"></el-input>
                </el-form-item>
                <el-form-item label="岗位要求" prop="demand">
                    <quill-editor 
                        v-model="ruleForm.demand" 
                        ref="myQuillEditor" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor> 
                </el-form-item>
                <el-form-item label="岗位职责" prop="conditions">
                   <quill-editor 
                        v-model="ruleForm.conditions" 
                        ref="myQuillEditor" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor> 
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
            // information:{},  //详情页存放数据
            tableData: [],
            ruleForm:{
                updateTime:"",
                id:"",
                deleted:0,
                position:"",
                demand:"",
                conditions:"",
            },
            file:"",
            detail:"",  //1修改 2添加
            search:{
                position:''
            },
            pageData:{}, //页码
            editorOption: {},
            rules: {
                position:[
                    {required: true, message: '招聘岗位为空', trigger: 'blur'}
                ],
                demand:[
                    {required: true, message: '要求不能为空', trigger: 'blur'}
                ],
                conditions:[
                    {required: true, message: '职责不能为空', trigger: 'blur'}
                ],
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
        //查询全部
        Queryall(){
                this.axios.post(this.$api_router.invite+'findAll')
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
        //时间格式化
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
        //新增
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
            this.ruleForm.updateTime="",
            this.ruleForm.position="",
            this.ruleForm.demand="",
            this.ruleForm.conditions="",
            this.file = ""
            this.Queryall()
        },
         //确认修改
        Affirm(){
            this.ruleForm.createTime =  ""
            this.ruleForm.endTime =  ""
            this.ruleForm.startTime =  ""
            this.ruleForm.updateTime =  ""
            this.ruleForm.dateTime = ""
             this.axios.post(this.$api_router.invite+'updateOne',this.ruleForm)
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.Queryall()
                        this.ruleForm.updateTime="",
                        this.ruleForm.position="",
                        this.ruleForm.demand="",
                        this.ruleForm.conditions="",
                        this.file = ''
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
            this.axios.post(this.$api_router.invite+'saveOne',this.ruleForm)
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                    this.Queryall()
                    this.dialogVisible = false
                    this.ruleForm.position="",
                    this.ruleForm.demand="",
                    this.ruleForm.conditions=""
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
                    this.axios.post(this.$api_router.invite+'delOne?id='+row[index].id)
                    .then(res=>{
                        console.log(res)
                        if(res.data.code == 200){
                            row.splice(index, 1);
                            this.$message({
                            message: '删除成功',
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
          //右上角
        handleDialogClose(){
           this.close()
        },
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(){//内容改变事件
        }
    }
}
</script>
<style>
    .Invite-box{
        width: 100%;
    }
    .Invite-box .function{
        width: 100%;
        display: flex;
    }
    .Invite-box .function .el-input{
        width: 260px;
    }
    .Invite-box .function .el-button{
        margin-left: 30px;
    }
    .Invite-box .function-1{
        padding-right: 20px;
        width: 60%;
        display: flex;
        justify-content:space-between;
    }
    .Invite-box .list .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .Invite-box .list .el-button{
        width: 60px;
        font-size: 13px;
        border: 1px solid #ccc;
    }
   .Invite-box .quill-editor .ql-container{
        height: 280px;
        overflow: auto;
    }
</style>