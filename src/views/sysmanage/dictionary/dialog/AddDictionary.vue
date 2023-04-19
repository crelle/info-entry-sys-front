<template>
  <div>
    <el-dialog
      :title="status?'新增字典':'编辑字典'"
      :visible.sync="dialogVisible"
      width="500px"
      @closed="resetForm"
    >
      <el-form label-width="100px" class="demo-dynamic">
        <el-card>
          <el-form-item prop="father" label="父级名称">
            <el-input
              placeholder="请输入父级名称"
              v-model="dynamicValidateForm.name"
              class="dictionary"
            ></el-input>
          </el-form-item>
          <el-form-item prop="father" label="父级编码">
            <el-input
              placeholder="请输入父级编码"
              v-model="dynamicValidateForm.code"
              class="dictionary"
            ></el-input>
          </el-form-item>
        </el-card>

        <el-card class="childCard">
          <div
            v-for="(item, index) in dynamicValidateForm.children" :key="index"   :class="status?'add':'edit'"
          >
            <el-form-item label="子级名称">
              <el-input
                placeholder="请输入子级名称"
                v-model="item.name"
                class="dictionary"
              ></el-input>
            </el-form-item>
            <el-form-item label="子级编码">
              <el-input
                placeholder="请输入子级编码"
                v-model="item.code"
                class="dictionary"
              ></el-input>
            </el-form-item>
            <div class="delbtn">
              <el-button
                @click.prevent="removeDomain(index)"
                size="small"
                type="danger"
                v-if="status"
                >删除</el-button
              >
            </div>
          </div>
          <el-form-item style="margin-top: 10px">
            <el-button type="primary" @click="submitForm('dynamicValidateForm')"
              >提交</el-button
            >
            <el-button @click="addDomain">新增子级</el-button>
            <el-button @click="resetForm('dynamicValidateForm')" v-if="status"
              >重置</el-button
            >
          </el-form-item>
        </el-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { editDic ,createDic} from "@/api/dictionary";
export default {
  data() {
    return {
      dialogVisible: false,
      dynamicValidateForm: {
        children: [
          
        ],
        name: "",
        code: "",
      },
      resetData: "",
      
      status:true
    };
  },
  mounted() {
    this.resetData = JSON.parse(JSON.stringify(this.dynamicValidateForm));
  },
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      if(this.status){
        createDic(this.dynamicValidateForm).then(res=>{
          if (res && res.code && res.code === "00000") {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.dialogVisible = false;
          this.$parent.onSubmit()
          
        }
        })
      }else{
        editDic(this.dynamicValidateForm).then(res=>{
        if (res && res.code && res.code === "00000") {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          });
          this.dialogVisible = false;
          this.$parent.onSubmit()
          
        }
      })
      }
      
      
    },
    resetForm() {
      this.dynamicValidateForm = JSON.parse(JSON.stringify(this.resetData));
    },
    removeDomain(index) {
      
        this.dynamicValidateForm.children.splice(index, 1);
     
    },
    addDomain() {
      this.dynamicValidateForm.children.push({
        name: "",
        code: "",
      });
    },
    openDialog(raw) {
      if(raw){
        console.log("有内容");
        this.status=false
        this.dynamicValidateForm=raw
      }else{
        console.log("无内容");
        this.status=true
      }
      console.log('openDialog',this.status);
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.dictionary {
  width: 83%;
}
.delbtn {
  display: flex;
  justify-content: right;
  padding-right: 50px;
}
.el-form-item {
  margin-bottom: 5px;
}
.edit{
  margin-top: 10px;
}
::v-deep .childCard .el-input__inner{
  height: 32px;
}
/* .childCard{
  max-height: 400px;
  overflow-y: scroll;
} */
</style>