<template>
    <div class="Mission-box">
        <div class="title">
            <p>基本信息</p>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="name">
                <el-input v-model="ruleForm.name" placeholder="文章标题"></el-input>
                <!-- <span class="hint">标题字数限制在35个字符</span> -->
            </el-form-item>
            <el-form-item label="发布时间" required>
                <el-form-item prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
            <el-form-item label="所在栏目" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option label="公司使命" value="1"></el-option>
                <el-option label="新闻资讯" value="2"></el-option>
                </el-select>
            </el-form-item>
            <div class="upimg">   
                <div class="updiv"> 上传图片</div>
                <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                        <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                        >
                        <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                        >
                        <i class="el-icon-download"></i>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <i class="el-icon-delete"></i>
                        </span>
                    </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </el-form>
        <div class="title top30">
            <p>备注资料</p>
        </div>
        <div class="bottom">
            <div class="updiv">文章编写</div>
            <quill-editor 
                v-model="content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>  
        </div>
        <div class="button">
            <el-button type="primary">确认修改</el-button>
        </div>
    </div>
        
</template>
<script>
export default {
    data(){
        return{
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            content:null,
            editorOption: {},
            ruleForm: {
                name: '',
                region: '1',
                date: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 3, max: 35, message: '标题字数限制在35个字符', trigger: 'blur' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
            }
        }
    },
    methods:{
        handleRemove(file) {
            console.log(file);
            this.dialogImageUrl = "";
            this.dialogVisible = false
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
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
    .Mission-box{
        font-size: 13px !important;

        /* background-color: #FFFFFF; */
    }
    .Mission-box .el-form-item{
        margin-bottom: 12px;
    }
    .Mission-box .is-error{
       margin-bottom: 0px;
    }
    .Mission-box .el-input{
        width: 50% !important;
    }
    .Mission-box .el-form-item__error{
        top: 28% !important;
        left: 54% !important;
    }
    .Mission-box .el-select{
        width: 220px !important;
    }
     .Mission-box .el-select .el-input{
        width: 100% !important;
    }
    .Mission-box .el-upload--picture-card{
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
   .Mission-box  .el-upload-list--picture-card .el-upload-list__item{
        width: 100px;
        height: 100px;
    }
    .hint{
        margin-left: 50px;
        color: #A5A5A5;
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
    .Mission-box .title{
        margin-bottom: 20px;
        border-bottom: 1px solid #cccccc;
    }
    .Mission-box .title p{
        width: 70px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        font-size: 16px;
        color: #111111;
        border-bottom: 2px solid #0E8BC5;
    }
    .Mission-box .top30{
        margin-top: 30px;
    }
    .Mission-box .bottom{
       display: flex;
    }
    .Mission-box .bottom .quill-editor{
        margin-left: 80px;
        width: 80%;
        height: 100%;
        clear:both
    }
    .Mission-box .button{
        margin-top:20px;
        margin-left: 160px;
    }
</style>