<template>
    <div class="Operator-box">
        <div class="title">
            <el-page-header @back="goBack">
            </el-page-header>
            <p>基本信息</p>
        </div>
        <el-form :model="receiveData" :rules="rules" ref="receiveData" label-width="80px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="receiveData.title" placeholder="文章标题"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" required>
                <el-form-item prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="receiveData.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
            <el-form-item label="文章介绍" prop="detail">
                <el-input v-model="receiveData.detail" placeholder="文章标题"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所在栏目" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option label="公司使命" value="1"></el-option>
                <el-option label="新闻资讯" value="2"></el-option>
                </el-select>
            </el-form-item> -->
            <div class="upimg">   
                <div class="updiv"> 上传图片</div>
                <el-upload
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload="false">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span class="span">一张即可(项目宣传图)</span>
            </div>
        </el-form>
        <div class="overflowA">
            <div class="title top18">
                <p>备注资料</p>
            </div>
            <!-- 富文本 -->
            <div class="bottom">
                <div class="updiv">文章编写</div>
                <quill-editor 
                    v-model="receiveData.text" 
                    ref="myQuillEditor" 
                    :options="editorOption" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>  
            </div>
            <!-- 底部按钮 -->
            <div class="button">
                <el-button type="info  plain" @click="$router.back(-1)">取消</el-button>
                <el-button v-if="Buttonshow" type="primary" @click="Submit()">确认修改</el-button>
                <el-button v-if="!Buttonshow" type="primary" @click="Submit()">确认保存</el-button>
            </div>
        </div>
        
    </div>
        
</template>
<script>
export default {
    data(){
        return{
             //接收的参数 集合
            receiveData:{
                title:"",
                detail:"",
                date:"",
                text:"",
                dialogImageUrl: '',
            }, 
            dialogImageUrl: '',
            dialogVisible: false,
            Buttonshow:true,
            content:null, //富文本
            editorOption: {},
            rules: {
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 3, max: 20, message: '标题字数限制在20个字符', trigger: 'blur' }
                ],
                detail: [
                    { required: true, message: '请输入文章介绍', trigger: 'blur' },
                    { min: 3, max: 35, message: '标题字数限制在35个字符', trigger: 'blur' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                ],
            }
        }
    },
    created(){
      
    },
    mounted(){
            if(this.$route.query.data == ""){
                this.Buttonshow = false
            }else{
                this.receiveData =  this.$route.query.data
                console.log(this.receiveData)
                // this.Buttonshow = true
            }
            
    },
    methods:{
        goBack(){
            this.$router.back(-1)
        },
        handleRemove(file,fileList) {
            console.log(file,fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        Submit(){
              this.$confirm("您确定要提交吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			  }).then(() => {
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
				console.log(this.content)
			  });
            
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
    .Operator-box{
        font-size: 13px !important;
        /* background-color: #FFFFFF; */
    }
    .Operator-box .el-form-item{
        margin-bottom: 12px;
    }
    .Operator-box .is-error{
       margin-bottom: 0px;
    }
    .Operator-box .el-input{
        width: 50% !important;
    }
    .Operator-box .el-form-item__error{
        top: 28% !important;
        left: 54% !important;
    }
    .Operator-box .el-select{
        width: 220px !important;
    }
    .Operator-box .el-select .el-input{
        width: 100% !important;
    }
    .Operator-box .el-upload--picture-card{
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
   .Operator-box  .el-upload-list--picture-card .el-upload-list__item{
        width: 100px;
        height: 100px;
    }
    .hint{
        margin-left: 50px;
        color: #A5A5A5;
    }
    .upimg{
        display: flex;
        align-items: center;
    }
    .upimg .span{
        margin-left: 20px;
        color: #F56C6C;
        font-size: 12px;
    }
    .updiv{
        width: 80px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    } 
    .updiv::before{
        content: '*';
        color: #F56C6C;
        /* margin-right: 4px; */
    }
    .Operator-box .title{
        margin-bottom: 20px;
        border-bottom: 1px solid #cccccc;
    }
    .Operator-box .title p{
        width: 70px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        font-size: 16px;
        color: #111111;
        border-bottom: 2px solid #0E8BC5;
    }
    .Operator-box .top18{
        margin-top: 18px;
    }
    .Operator-box .bottom{
       display: flex;
    }
    .Operator-box .bottom .quill-editor{
        margin-left: 80px;
        width: 80%;
        height: 100%;
        clear:both
    }
    .Operator-box .button{
        margin-top:12px;
        margin-left: 120px;
    }
    .Operator-box .button .el-button{
        margin-left: 40px;
    }
    /* .overflowA{
        height: 100%;
        overflow: auto;
    } */
</style>