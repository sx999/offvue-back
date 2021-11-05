<template>
    <div>
        <el-card style="height: 610px;position:relative">
            <h1>测试富文本</h1>
            <div class="butclass">
                <el-button class="sub-button" @click="Submit()" type="primary" round>提交</el-button>
            </div>
            
            <br>
            <quill-editor 
                v-model="content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
           
        </el-card>
          <!-- <Editor v-model="article.content"/> -->
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'

export default {
    // name: 'Demond',
    omponents: {
      quillEditor
    },
    data(){
        return{
            content:null,
            editorOption: {
              
            },
            //  article: {
            //      content: null
            // }
        }
    },
    methods:{
            Submit(){
              this.$confirm("您确定要提交吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			  }).then(() => {
                console.log(this.$api_router.login)
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
<style scoped>
   
    .butclass{
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: right;
    }
   .butclass .sub-button{
       margin-right: 20px;
   }
</style>