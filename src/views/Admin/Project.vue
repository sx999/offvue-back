<template>
    <div class="Project-box">
        <!-- 功能 -->
        <div class="function">
            <el-input v-model="search.title" placeholder="项目名称"></el-input>
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
                width="180">
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="itemsName"
                label="项目名称"
                width="180">
            </el-table-column>
            <el-table-column
                label="图片"
                width="200">
                <template slot-scope="scope">
                    <el-link type="success" :underline="false" :href="scope.row.itemsPic"  target="_blank"  >
						<img :src="scope.row.itemsPic" alt="" width="100">
					</el-link>
                </template> 
            </el-table-column>
            <el-table-column
                prop="itemsContent"
                label="项目内容"
                width="180">
            </el-table-column>
             <el-table-column
                prop="itemsBrowse"
                label="浏览量"
                width="80">
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
                <el-form-item label="项目名称" prop="itemsName">
                    <el-input v-model="ruleForm.itemsName" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                </el-form-item>
                <el-form-item label="预览图片:">
                     <el-link type="success" :underline="false" :href="ruleForm.itemsPic"  target="_blank"  >
						<img :src="ruleForm.itemsPic" alt="" width="100">
					</el-link>
                </el-form-item>
                <el-form-item label="项目内容" prop="itemsContent">
                    <el-input type="textarea" v-model="ruleForm.itemsContent" placeholder="项目内容"></el-input>
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
            // dialogVisible:false,  //详情框
            // information:{},  //详情页存放数据
            tableData:[],
            dialogVisible:false,  //详情框
            search:{
                title:''
            },
            file:"",
            detail:"",  //1修改 2添加
            ruleForm:{
                updateTime:"",
                dateTime:"",
                id:"",
                deleted:0,
                itemsBrowse:"",
                itemsName:"",
                itemsPic:"",
                itemsContent:""
            },
             rules: {
                itemsName:[
                    {required: true, message: '项目标题为空', trigger: 'blur'}
                ],
                itemsContent:[
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
                this.axios.post(this.$api_router.project+'findAll')
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                            this.tableData =  res.data.data
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
                this.ruleForm.itemsPic =  res.data.msg
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
            this.ruleForm.itemsName="",
            this.ruleForm.itemsPic="",
            this.ruleForm.itemsContent="",
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
                this.axios.post(this.$api_router.project+'updateOne',this.ruleForm)
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.Queryall()
                        this.ruleForm.itemsName="",
                        this.ruleForm.itemsPic="",
                        this.ruleForm.itemsContent="",
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
            // this.ruleForm.memberPic = this.newimg
            this.axios.post(this.$api_router.project+'saveOne',this.ruleForm)
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
          //重置筛选条件
        Reset(){
            this.search.itemsName = ""
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