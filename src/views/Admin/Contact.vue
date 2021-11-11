<template>
     <div class="Contact-box">
           <!-- 头部功能 -->
        <div class="function">
            <div class="label"> 底部:公司详情(联系方式)</div>
            <div class="function-1">
                <div></div>
                <el-button type="primary" icon="el-icon-plus" @click="AddData()">新增</el-button>
            </div>
        </div>
         <!-- table -->
         <div class="list">
            <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                width="200">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="日期"
                width="200">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mailbox"
                label="邮箱"
                width="180">
            </el-table-column>
            <el-table-column
                prop="weixin"
                label="微信"
                width="180">
            </el-table-column>
            <el-table-column
                prop="qq"
                label="QQ"
                width="180">
            </el-table-column>
            <el-table-column
                prop="weibo"
                label="微博"
                width="180">
            </el-table-column>
           <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope" class="templateol">
                <el-button type="text" @click.native.prevent="Compile(scope.$index,tableData)">修改</el-button>
                <!-- <span>|</span> -->
                <el-button type="text" @click.native.prevent="Remove(scope.$index,tableData)">移除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
         <!-- 编辑框 -->
        <el-dialog title="正在编辑. . ." :visible.sync="dialogVisible" width="42%">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mailbox">
                    <el-input v-model="ruleForm.mailbox" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                 <el-form-item label="微信" prop="weixin">
                    <el-input v-model="ruleForm.weixin" placeholder="请输入微信"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                    <el-input v-model="ruleForm.qq" placeholder="请输入QQ"></el-input>
                </el-form-item>
                <el-form-item label="微博">
                    <el-input v-model="ruleForm.weibo" placeholder="请输入微博"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close()">取 消</el-button>
                <el-button type="primary" @click="Affirm()" v-if="detail==1">确 定</el-button>
                <el-button type="primary" @click="Affirm1()" v-if="detail==2">保存</el-button>
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
            information:{},
            tableData:[],
            search:{
                region:''
            },
            ruleForm:{
                phone:"",
                mailbox:"",
                weixin:"",
                qq:"",
                weibo:"",
                logo:"",
            },
            detail:"",  //1修改 2添加
            rules: {
                phone: [
                    { required: true, message: '手机号不能为空',trigger: 'blur'},   
                ],
                mailbox: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                weixin:[
                    {required: true, message: '微信不能为空', trigger: 'blur'}
                ],
            }
        }
    },
    created(){},
    mounted(){
        this.Queryall()
    },
    computed:{},
    methods: {
        //查询
        Queryall(){
            this.loading = true
                this.axios.post(this.$api_router.contact+'findAll')
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
        // 添加弹出
        AddData(){
           this.detail = 2
           this.dialogVisible = true 
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
            this.ruleForm = row[index]
        },
        //取消修改
        close(){
            this.dialogVisible = false
        },
        //确认修改
        Affirm(){
            this.axios.post(this.$api_router.contact+'updateOne',this.ruleForm)
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.Queryall()
                    this.ruleForm.phone= "",
                    this.ruleForm.mailbox = "",
                    this.ruleForm.weixin = "",
                    this.ruleForm.qq = "",
                    this.ruleForm.weibo = "",
                    this.ruleForm.logo = ""
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
        this.axios.post(this.$api_router.contact+'saveOne',this.ruleForm)
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
           console.log(row[index])
           this.$confirm("确定移除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(()=>{
                this.axios.post(this.$api_router.contact+'delOne?id='+row[index].id)
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
<style scoped>
    .flex{
        display: flex;
    }
    .Contact-box{
        width: 100%;
    }
    .Contact-box .function{
        margin: 20px 0;
        width: 100%;
        display: flex;
    }
    .Contact-box .function .label{
        padding: 0 10px;
        margin-right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #606266;
        font-size: 16px;
    }
    .Contact-box .function .el-input{
        width: 260px;
    }
    .Contact-box .function .el-button{
        margin-left: 30px;
    }
    .Contact-box .function-1{
        padding-right: 20px;
        width: 60%;
        display: flex;
        justify-content:space-between;
    }
    .Contact-box .list .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .Contact-box .list .el-button{
        width: 60px;
        font-size: 13px;
        border: 1px solid #ccc;
    }
</style>