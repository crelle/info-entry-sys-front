<template>
  <div>
    <el-dialog :title="toChild" :visible.sync="dialogFormVisible" :close-on-click-modal='false' lock-scroll   @close="closeDialog">
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form
                :model="userEditForm"
                :rules="userEditFormRules"
                ref="userEditRef"
                size="mini"
              >
                <el-form-item label="岗位名称 :" prop="pstname">
                  <el-input
                    type="text"
                    v-model="userEditForm.pstname"
                    placeholder="请填写岗位名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="岗位技能 :" prop="skill">
                  <el-select
                    v-model="userEditForm.skill"
                    placeholder="请选择岗位技能"
                    filterable
                    @change="queryson"
                  >
                    <el-option
                      v-for="item in skill"
                      :key="item.index"
                      :label="item.ski"
                      :value="item.ski"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目 :" prop="project">
                  <el-select
                    v-model="userEditForm.project"
                    placeholder="请选择接项目"
                    filterable
                    @change="queryson"
                  >
                    <el-option
                      v-for="(item, index) in tableData"
                      :key="item.index"
                      :label="item.nameZh"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="客户 :" prop="customer">
                  <el-input
                    type="text"
                    v-model="userEditForm.customer"
                    placeholder="客户"
                  ></el-input>
                </el-form-item>
                <el-form-item label="岗位需求人数 :" prop="number">
                  <el-input
                    type="text"
                    v-model="userEditForm.number"
                    placeholder="岗位需求人数"
                  ></el-input>
                </el-form-item>
                <el-form-item label="计划满足日期 :" prop="date">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="计划满足日期"
                      v-model="userEditForm.date"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="最晚到岗时间" prop="date_do">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="userEditForm.date_do"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>

                <el-form-item label="办公地点 :" prop="place">
                  <el-cascader
                    size="large"
                    :options="options"
                    v-model="userEditForm.place"
                  >
                  </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址 :" prop="detail">
                  <el-input
                    type="text"
                    v-model="userEditForm.detail"
                    placeholder="详细地址"
                  ></el-input>
                </el-form-item>
                <el-form-item label="岗位职责 :" prop="duty">
                  <el-input
                    type="textarea"
                    v-model="userEditForm.duty"
                    placeholder="请输入岗位职责..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="岗位要求 :" prop="requirement">
                  <el-input
                    type="textarea"
                    v-model="userEditForm.requirement"
                    placeholder="请输入岗位要求..."
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="onCertain"
            >保存</el-button
          >
          <el-button
            class="cancel"
            type="primary"
            @click="dialogClose"
            size="mini"
            >取 消</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateRole, deleteRole } from "@/api/role";
import { regionData, CodeToText } from "element-china-area-data";

export default {
  props: {
    toChild: String,
    tableData: "",
  },
  data() {
    return {
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      nowIndex: -1,
      options:regionData,
      // baseURL: BaseURL,
      skill: [
        {
          ski: "JAVA",
        },
        {
          ski: "WEB",
        },
        {
          ski: "UI",
        },
      ],
      userEditForm: {
        id: "",
        pstname: "",
        skill: "",
        project: "",
        customer: "",
        number: "",
        date_do: "",
        date: "",
        region: "",
        place: "",
        detail:'',
        duty: "",
        requirement: "",
      },
      initFormData: {},
      userEditFormRules: {
        pstname: [
          {
            required: true,
            message: "请填写岗位名称",
            trigger: ["blur", "change"],
          },
        ],
        duty: [
          {
            required: false,
            message: "请填写岗位职责",
            trigger: ["blur", "change"],
          },
        ],
        skill: [
          {
            required: false,
            message: "请选择岗位技能",
            trigger: ["blur", "change"],
          },
        ],
        requirement: [
          {
            required: false,
            message: "请填写岗位需求",
            trigger: ["blur", "change"],
          },
        ],
        project: [
          {
            required: false,
            message: "请填写项目名称",
            trigger: ["blur", "change"],
          },
        ],
        customer: [
          {
            required: false,
            message: "请填写客户名称",
            trigger: ["blur", "change"],
          },
        ],
        number: [
          {
            required: false,
            message: "请填写需求人数",
            trigger: ["blur", "change"],
          },
        ],
        date: [
          {
            required: false,
            message: "请填写完成时间",
            trigger: ["blur", "change"],
          },
        ],
        date_do: [
          {
            required: false,
            message: "请填最晚到岗时间",
            trigger: ["blur", "change"],
          },
        ],
        place: [
          {
            required: false,
            message: "请填写办公地点",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    //自动选择
    queryson(e) {
      // console.log("选择的触发///////////");
      // console.log(e, "----------------");
      // console.log(this.tableData[e], "+++++++++++++++");
      // this.userEditForm = this.tableData[e];
      this.userEditForm.id = this.tableData[e].id;
      console.log(
        this.userEditForm,
        "----this.userEditForm-this.tableData[e]",
        this.tableData[e]
      );
    },
    //
    // 弹窗
    openDialog(row) {
      console.log(this.userEditForm, "001001");
      this.dialogFormVisible = true; // 让弹窗显示
      // console.log(this.tableData,"-------------");
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
        });
      } else {
        console.log("我是新增");
        // this.initForm("");
      }
    },
    initForm(data) {
      Object.keys(this.userEditForm).forEach((item) => {
        this.userEditForm[item] = data[item] ? data[item] : null;
      });
    },
    closeDialog() {
      this.resetFormData(); // 初始化弹窗数据 重置 包含头像信息等
      this.resetForm("userEditRef"); // 重置表单
    },
    // 取消
    dialogClose() {
      this.dialogFormVisible = false;
      console.log(this.userEditForm, "取消231取消3131");
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.userEditForm);
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
    },

    /* 保存  */
    onCertain() {
      if (this.initFormData.id) {
        this.userEditForm.id = this.initFormData.id;
        this.initFormData = this.userEditForm;
        console.log(this.userEditForm, "userEditFormuserEditForm123");
        console.log(
          this.userEditForm.id,
          this.userEditForm,
          "this.initFormData.id"
        );
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            updateRole(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "res11111");
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                this.dialogClose();
                console.log("修改成功！");
                this.$parent.queryRoles();
              }
            });
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
      // else {
      //   console.log("增加了...");
      //   this.$refs["userEditRef"].validate((valid) => {
      //     console.log(valid, "增加了的valid");
      //     if (valid) {
      //       addUser(this.userEditForm, this.userEditForm.id).then((res) => {
      //         console.log(res, "增加了...res11111");
      //         if (res && res.code && res.code === "00000") {
      //           // this.$parent.resetForm();
      //           // this.nowIndex = -1; // 重置选中
      //           this.$message.success("创建成功！");
      //         }
      //       });
      //     } else {
      //       return false;
      //     }
      //   });
      // }
    },
  },
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
@{deep} .register_form_main {
  position: relative;
  min-width: 30%;
  overflow: hidden;
  > span {
    display: block;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    padding: 20px 0;
    color: #409eff;
    background-color: #383f49;
    text-shadow: 0 1px -3px #409eff;
  }
  .grid-content-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    .avatar-uploader .el-upload {
      border: 1px dashed #8c939d;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
    .demo-image__lazy {
      height: 88px;
      .el-image {
        width: 80px;
        height: 80px;
        border: 1px solid #eee;
        margin: 2px;
      }
      .default_img_chioce {
        &::before {
          width: 80px;
          height: 80px;
          background-color: rgba(139, 197, 252, 0.5);
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          content: "已选";
          color: #409eff;
          font-size: 12px;
        }
      }
    }
  }
}
.el-form {
  padding: 10px 50px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .el-input-group__append {
    padding: 0 2px;
  }
}
.passwordat {
  display: none;
}
.el-form-item {
  display: flex;
  margin-right: 50px;
}
::v-deep .el-form-item__label {
  width: 110px;
  text-align: left;
}
::v-deep .el-input__inner {
  width: 250px;
}
::v-deep .el-textarea__inner {
  min-height: 100px !important;
  width: 250px;
  color: #606266;
  font-size: 12px;
  font-family: "微软雅黑";
}
::v-deep .el-dialog {
  width: 30%;
}
.cancel {
  background-color: #999 !important;
  border: 1px solid #999 !important;
}
.dialog-footer {
  text-align: right;
  padding: 10px 20px 20px;
}
::v-deep .el-dialog__body {
  padding: 0;
}
</style>