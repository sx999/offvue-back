<template>
    <div class="Operator-box">
        <div class="title">
            <el-page-header @back="goBack">
            </el-page-header>
            <p>基本信息</p>
        </div>
        <el-form :model="receiveData" :rules="rules" ref="receiveData" label-width="80px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="consultTopic">
                <el-input v-model="receiveData.consultTopic" placeholder="文章标题"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" required>
                <el-form-item prop="updateTime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="receiveData.updateTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
            <el-form-item label="所在栏目" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                <!-- <el-option v-if="ruleForm.region==1" label="公司使命" value="1"></el-option> -->
                <el-option label="新闻资讯" value="2"></el-option>
                </el-select>
            </el-form-item>
            <div class="upimg">   
                <div class="updiv"> 上传图片</div>
                <div class="oldImg">
                    <p>原图:</p>
                    <img :src="receiveData.consultPic" alt="" width="100">
                </div>
                <div class="newImg">
                    <!-- 预览 -->
                     <el-link type="success" :underline="false" :href="newImg"  target="_blank"  >
						<img :src="newImg" alt="" width="100">
					</el-link>
                </div>
                 <div class="control-form">
                    <input type="file" class="upload" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    <span class="span">宣传图((建议图片格式为：JPG/PNG/JPEG))</span>
                </div>
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
                    v-model="receiveData.consultSynopsis" 
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
             //新闻
            receiveData:{
                consultBrowse:"",
                consultTopic:"",
                consultSynopsis:"",
                consultPic:"",
                consultTop:"0",
                dateTime:"",
                deleted: 0,
                id: "",
                updateTime:"",
            }, 
            //判断是哪个页面
            ruleForm:{
                region:"2"
            },
            file:"",
            newImg:"",
            dialogVisible: true,
            Buttonshow:true,
            content:null, //富文本
            editorOption: {},
            rules: {
               consultTopic:[
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                updateTime:[
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
                this.ruleForm.region = this.$route.query.type
                console.log(this.receiveData)
                // this.Buttonshow = true
            }
            
    },
    methods:{
        //返回
        goBack(){
            this.$router.back(-1)
        },
        //图片回显
        updateFace(event){
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
                this.newImg  =  res.data.msg
            }).catch(err => {
                console.log(err);
			});
        },
        Submit(){
              this.$confirm("您确定要提交吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			  }).then(() => {
                this.receiveData.createTime =  ""
                this.receiveData.endTime =  ""
                this.receiveData.startTime =  ""
                this.receiveData.updateTime =  ""
                this.receiveData.dateTime = ""
                this.receiveData.consultPic = this.newImg
                this.axios.post(this.$api_router.tradeNews+'saveOne',this.receiveData)
                .then(res=>{
                    console.log(res)
                      if(res.data.code == 200){
                    this.$message({
                        message: '成功',
                        type: 'success'
                    });
                    this.receiveData.consultTopic="",
                    this.receiveData.consultSynopsis="",
                    this.receiveData.consultPic=""
                    this.goBack()
                    this.Queryall()
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                    return false
                }
                })
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
    .Operator-box .oldImg,
    .Operator-box .newImg{
        display: flex;
        align-items: center;
    }
    .Operator-box .oldImg p{
        font-size: 14px;
        color: #606266;

    }
    .Operator-box .oldImg img{
        height: 100px;
        margin-left: 10px;
    }
     .Operator-box .control-form{
         display: flex;
         flex-direction: column;
     }
    .Operator-box .control-form input{
        margin-left: 20px;
    }
    .Operator-box .newImg{
        height: 100px;
        margin-left: 50px;
    }
</style>