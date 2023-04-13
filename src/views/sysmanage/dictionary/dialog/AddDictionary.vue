<template>
  <div>
    <el-dialog
      title="新增字典"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-card>
          <el-form-item prop="father" class="father">
            <el-input
              placeholder="父级名称"
              v-model="dynamicValidateForm.name"
              class="name"
            ></el-input>
            <el-input
              placeholder="父级编码"
              v-model="dynamicValidateForm.code"
              class="code"
            ></el-input>
          </el-form-item>
        </el-card>

        <el-card>
          <el-form-item
            v-for="(children, index) in dynamicValidateForm.childrens"
            :key="children.key"
            :prop="'children.' + index + '.value'"
          >
            <el-input placeholder="子级名称" v-model="children.name"
              >name</el-input
            >
            <el-input placeholder="子级编码" v-model="children.code"
              >code</el-input
            >
            <el-button @click.prevent="removeDomain(children)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')"
              >提交</el-button
            >
            <el-button @click="addDomain">新增子级</el-button>
            <el-button @click="resetForm('dynamicValidateForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dynamicValidateForm: {
        childrens: [
          {
            name: "",
            code: "",
          },
        ],
        name: "",
        code: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.childrens.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.childrens.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.childrens.push({
        name: "",
        code: "",
      });
    },
    openDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
.father name {
  display: inline;
}

.father code {
  display: inline;
}
</style>