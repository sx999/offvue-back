<template>
    <div class="Events-box">
        <div class="function">
            <div class="flex">
                <el-input v-model="search.competitionName" placeholder="活动/赛事名称"></el-input>
                <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
            </div> 
            <div class="flex">
                <p class="title">类别:</p>
                <el-select  el-select v-model="region" placeholder="活动/赛事" @change="Screen()">
                    <el-option label="赛事" value="0"></el-option>
                    <el-option label="活动" value="1"></el-option>
                </el-select>
            </div>
            <div>
               
            </div>
            <div class="function-1">
                <div> <el-button type="primary" icon="el-icon-edit" @click="Reset()">重置筛选条件</el-button></div>
                <el-button type="primary" icon="el-icon-plus" @click="AddData()">新增</el-button>
            </div>
        </div>
        <!-- table -->
        <div class="list">
            <el-table
            v-loading="loading"
            :data="ftableData"
            :max-height='tableHeight'
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                width="180">
            </el-table-column>
            <!-- <el-table-column
                prop="updateTime"
                label="发布日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开始时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间"
                width="180">
            </el-table-column> -->
             <el-table-column
                prop="competitionName"
                label="活动/赛事名称"
                width="300">
            </el-table-column>  
            <el-table-column
                label="活动/赛事图片"
                width="220">
                <template slot-scope="scope">
                    <el-link type="success" :underline="false" :href="scope.row.competitionPic"  target="_blank"  >
						<img :src="scope.row.competitionPic" alt="" width="100">
					</el-link>
                </template> 
            </el-table-column>
            <el-table-column
                prop="competitionSynopsis"
                label="内容简介"
                width="300">
            </el-table-column>
            <el-table-column
                label="类别"
                width="150">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.sort==0">赛事</el-tag>
                    <el-tag v-if="scope.row.sort==1" type="success">活动</el-tag>
                </template>
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
        <div class="block">
			 <el-pagination
			   @current-change="getLista($event)"
			   :current-page="this.pageData.currentPage"
			   :page-size="this.pageData.pageSize"
			   layout="prev, pager, next"
			   :total="this.pageData.totalRecord">
			 </el-pagination>
		</div>
         <!-- 编辑框 -->
        <el-dialog title="正在编辑. . ." 
        :visible.sync="dialogVisible" 
        width="50%" 
        :before-close="handleDialogClose"
        :close-on-click-modal="false">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="项目名称" prop="competitionName">
                    <el-input class="no1" v-model="ruleForm.competitionName" placeholder="请输入活动/赛事名称"></el-input>
                </el-form-item>
                 <el-form-item label="开始时间"  required prop="startTime">
                    <el-date-picker
                        v-model="ruleForm.startTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间"  required prop="endTime">
                    <el-date-picker
                        v-model="ruleForm.endTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上传图片">
                    <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                </el-form-item>
                <el-form-item label="预览图片:">
                     <el-link type="success" :underline="false" :href="ruleForm.competitionPic"  target="_blank"  >
						<img :src="ruleForm.competitionPic" alt="" width="100">
					</el-link>
                </el-form-item>
                <el-form-item label="类别">
                    <el-select class="select" v-model="ruleForm.sort" placeholder="1活动/0赛事">
                        <el-option label="赛事" value="0"></el-option>
                        <el-option label="活动" value="1"></el-option>
                    </el-select>
                    <!-- <span class="red">(1活动 / 0赛事)</span> -->
                </el-form-item>
                <el-form-item label="项目简介" prop="competitionSynopsis">
                    <quill-editor 
                        v-model="ruleForm.competitionSynopsis" 
                        ref="myQuillEditor" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>  
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close()">取 消</el-button>
                <el-button type="primary" @click="Affirm('ruleForm')" v-if="detail==1">确 定</el-button>
                <el-button type="primary" @click="Affirm1('ruleForm')" v-if="detail==2">保 存</el-button>
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
            tableHeight: 600,
            search:{
               competitionName:'',
            },
            region:"0",
            ruleForm:{
                classify:"",
                startTime:"",
                endTime:"",
                competitionName:"",
                competitionSynopsis:"",
                competitionPic:"",
                sort:""
            },
            editorOption: {},
            file:"",
            newimg:"",
            detail:"",  //1修改 2添加
            rules: {
                competitionName:[
                    {required: true, message: '活动/赛事名称', trigger: 'blur'}
                ],
                competitionSynopsis:[
                    {required: true, message: '简介不能为空', trigger: 'blur'}
                ],
                startTime:[
                    {required: true, message: '开始日期不能为空', trigger: 'blur'}
                ],
                endTime:[
                    {required: true, message: '结束日期不能为空', trigger: 'blur'}
                ]
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
        // 查询全部
        Queryall(){
                this.axios.post(this.$api_router.events+'list?currentPage=1&limit=6&sort='+this.region)
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
        // 时间格式化
        Dateformatting(){
            // for(var i=0;i<this.tableData.length;i++){
            //     this.tableData[i].createTime = this.moment(this.tableData[i].createTime).format("YYYY-MM-DD HH:mm:ss")
            //     this.tableData[i].updateTime = this.moment(this.tableData[i].updateTime).format("YYYY-MM-DD HH:mm:ss")
            //     this.tableData[i].startTime = this.moment(this.tableData[i].startTime).format("YYYY-MM-DD HH:mm:ss")
            //     this.tableData[i].endTime = this.moment(this.tableData[i].endTime).format("YYYY-MM-DD HH:mm:ss")
            // }
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
                this.ruleForm.competitionPic =  res.data.msg
            }).catch(err => {
                console.log(err);
            });
        },
        //添加弹出
        AddData(){
            this.detail = 2
            this.dialogVisible = true
            this.ruleForm.sort = this.region
            this.ruleForm.competitionName = "",
            this.ruleForm.competitionSynopsis = "",
            this.ruleForm.competitionPic = "",
            this.ruleForm.endTime= "",
            this.ruleForm.startTime = ""
        },
        //修改弹出
        Compile(index,row){
                this.detail = 1
                console.log(row[index])
                this.dialogVisible = true
                row[index].createTime =  ""
                row[index].endTime =  ""
                row[index].startTime =  ""
                row[index].updateTime =  ""
                row[index].dateTime = ""
                this.ruleForm = row[index]
        },
        //取消修改
        close(){
            // this.Queryall()
            this.dialogVisible = false
            this.file = ""
            // this.ruleForm.competitionName = "",
            // this.ruleForm.competitionSynopsis = "",,
            // this.ruleForm.competitionPic = "",
            // this.ruleForm.competitionName = ""
            // this.newimg = ""
        },
        //确认修改
        Affirm(){
                // this.ruleForm.memberPic = this.newimg
                // this.ruleForm.startTime = this.moment(this.tableData.startTime).format("YYYY-MM-DD HH:mm:ss")
                // this.ruleForm.endTime = this.moment(this.tableData.endTime).format("YYYY-MM-DD HH:mm:ss")
                this.axios.post(this.$api_router.events+'updateOne',this.ruleForm)
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.Queryall()
                        this.ruleForm.competitionName="",
                        this.ruleForm.competitionSynopsis="",
                        this.ruleForm.competitionPic="",
                        this.ruleForm.sort="",
                        this.ruleForm.startTime="",
                        this.ruleForm.endTime=""
                        this.file = '',
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
        Affirm1(ruleForm){
             this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                        this.axios.post(this.$api_router.events+'saveOne',this.ruleForm)
                        .then(res=>{
                            console.log(res)
                            if(res.data.code == 200){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.Queryall()
                            this.dialogVisible = false
                            this.ruleForm.competitionName="",
                            this.ruleForm.competitionSynopsis="",
                            this.ruleForm.competitionPic=""
                            this.ruleForm.startTime="",
                            this.ruleForm.endTime=""
                        }else{
                            this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                }
            })  
          }else{
                this.$message({
                    message: "您还没输入完整",
                    type: 'warning'
                });
            return false;
          }
        });
            // this.ruleForm.memberPic = this.newimg
           
        },
        //删除
        Remove(index,row){
            console.log(row[index].id)
            this.$confirm("确定移除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(()=>{
                    this.axios.post(this.$api_router.events+'delOne?id='+row[index].id)
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
            this.search.competitionName = "",
            this.region = ""
            this.Queryall()
        },
        //筛选类别
        Screen(){
            this.axios.post(this.$api_router.events+'findSort?sort='+this.region)
            .then(res=>{
                console.log(res)
                this.tableData = res.data.data
            })
        },
        handleDialogClose(){
            this.close()
        },
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(){//内容改变事件
        },
         //分页
       getLista(event){
            console.log(event)
             this.axios.post(this.$api_router.events+'list?currentPage='+event+'&limit=6&sort='+this.region)
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
   .flex{
        display: flex;
    }
    .Events-box{
        width: 100%;
    }
    .Events-box .function{
        width: 100%;
        display: flex;
    }
    .Events-box .function .el-input{
        width: 220px;
    }
    .Events-box .function .el-button{
        margin-left: 30px;
    }
    .Events-box .function-1{
        padding-right: 20px;
        width: 60%;
        display: flex;
        justify-content: space-around;
    }
    .Events-box .list .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .Events-box .list .el-button{
        width: 60px;
        font-size: 13px;
        border: 1px solid #ccc;
    }
    .Events-box .title{
        margin-left: 50px;
        padding: 0 10px;
        width: 50px;
        display: flex;
        align-items: center;
        color: #606266;
    }
    .Events-box .el-dialog .no1{
        width: 60%;
    }
    
    .Events-box .red{
        font-size: 14px;
        color:#f58f98;
        margin-left: 20px;
    }
   .Events-box .el-dialog .select .el-input__inner{
        width: 100% !important;
    } 
    .Events-box .el-dialog .quill-editor .ql-container{
        height: 280px;
        overflow: auto;
    }
    .Events-box .block{
        position: fixed;
        bottom: 30px;
        left: 300px;

    }
</style>