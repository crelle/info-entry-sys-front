<template>
  <div>
    <el-dialog
      :modal="false"
      :title="status ? '新增字典' : '编辑字典'"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="resetForm('dynamicValidateForm')"
    >
      <div class="register_form_main">
        <el-row style="height: 100%; padding: 0px 28px">
          <el-col :span="24">
            <el-form
              class="demo-dynamic"
              :model="dynamicValidateForm"
              ref="dynamicValidateForm"
              size="small"
              label-position="left"
              label-width="80px"
            >
              <el-card>
                <el-form-item
                  class="fathecss"
                  prop="name"
                  label="父级名称"
                  :rules="[
                    {
                      required: true,
                      message: '请输入父级名称',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    placeholder="请输入父级名称"
                    v-model="dynamicValidateForm.name"
                    class="dictionary"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  prop="code"
                  label="父级编码"
                  :rules="[
                    {
                      required: true,
                      message: '请输入父级编码',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    placeholder="请输入父级编码"
                    v-model="dynamicValidateForm.code"
                    class="dictionary"
                  ></el-input>
                </el-form-item>
              </el-card>

              <el-card class="childCard">
                <div
                  v-for="(item, index) in dynamicValidateForm.children"
                  :key="index"
                  :class="status ? 'add' : 'edit'"
                >
                  <el-form-item
                    class="fathecss"
                    label="子级名称"
                    :prop="'children.' + index + '.name'"
                    :rules="{
                      required: true,
                      message: '子级名称不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      placeholder="请输入子级名称"
                      v-model="item.name"
                      class="dictionary"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="子级编码"
                    :prop="'children.' + index + '.code'"
                    :rules="{
                      required: true,
                      message: '子级编码不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      placeholder="请输入子级编码"
                      v-model="item.code"
                      class="dictionary"
                    ></el-input>
                  </el-form-item>
                  <div slot="footer" class="delbtn dialog-footer">
                    <el-button
                      @click.prevent="removeDomain(index)"
                      size="mini"
                      type="primary"
                      >删除</el-button
                    >
                  </div>
                </div>
              </el-card>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="resetForm('dynamicValidateForm')"
          v-if="status"
          >重置</el-button
        >
        <el-button @click="addDomain" type="primary" size="mini"
          >新增域名</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="submitForm('dynamicValidateForm')"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editDic, createDic } from "@/api/dictionary";
export default {
  data() {
    return {
      dialogVisible: false,
      dynamicValidateForm: {
        children: [],
        name: "",
        code: "",
      },
      resetData: "",
      status: true,
    };
  },
  mounted() {
    this.resetData = JSON.parse(JSON.stringify(this.dynamicValidateForm));
  },
  methods: {
    // 弹窗显示
    openDialog(raw) {
      if (raw) {
        console.log("有内容");
        // 去掉重置按钮
        this.status = false;
        this.dynamicValidateForm = JSON.parse(JSON.stringify(raw));
      } else {
        console.log("无内容");
        // 显示重置按钮
        this.status = true;
        // 初始化 清空内容
        this.dynamicValidateForm.children = [];
        this.dynamicValidateForm.name = "";
        this.dynamicValidateForm.code = "";
      }
      console.log("openDialog", this.status);
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dynamicValidateForm.id) {
            console.log(this.dynamicValidateForm, "编辑的内容---");
            editDic(this.dynamicValidateForm).then((res) => {
              if (res && res.code && res.code === "00000") {
                this.$message({
                  type: "success",
                  message: "编辑成功!",
                });
                this.dialogVisible = false;
                this.$parent.onSubmit();
              }
            });
          } else {
            console.log(this.dynamicValidateForm, "新增的内容---");
            createDic(this.dynamicValidateForm).then((res) => {
              if (res && res.code && res.code === "00000") {
                this.$message({
                  type: "success",
                  message: "新增成功!",
                });
                this.dialogVisible = false;
                this.$parent.onSubmit();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
}
.el-form-item {
  margin-bottom: 5px;
}
.edit {
  margin-top: 10px;
}
::v-deep .childCard .el-input__inner {
  height: 32px;
}
/* .childCard{
  max-height: 400px;
  overflow-y: scroll;
} */
.fathecss {
  margin-bottom: 20px;
}
.operate {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 10px;
}
</style>