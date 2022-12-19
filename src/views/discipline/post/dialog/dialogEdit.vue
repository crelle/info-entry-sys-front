<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      lock-scroll
      @close="closeDialog"
    >
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
                <el-form-item label="岗位名称 :" prop="postName">
                  <el-input
                    type="text"
                    v-model="userEditForm.postName"
                    placeholder="请填写岗位名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="岗位技能 :" prop="skill">
                  <el-select
                    v-model="userEditForm.skill"
                    placeholder="请选择岗位技能"
                    filterable
                  >
                    <el-option
                      v-for="item in skill"
                      :key="item.index"
                      :label="item.ski"
                      :value="item.ski"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目 :" prop="projectId">
                  <el-select
                    v-model="userEditForm.projectId"
                    placeholder="请选择接项目"
                    filterable
                    @change="queryson"
                  >
                    <el-option
                      v-for="item in projectData"
                      :key="item.index"
                      :label="item.project"
                      :value="item.projectId"
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
                <el-form-item label="最晚到岗时间" prop="latestArrivalTime">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="userEditForm.latestArrivalTime"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>

                <el-form-item label="办公地点 :" prop="address">
                  <el-cascader
                    size="large"
                    :options="options"
                    v-model="userEditForm.address"
                    clearable
                  >
                  </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址 :" prop="detailAddress">
                  <el-input
                    type="text"
                    v-model="userEditForm.detailAddress"
                    placeholder="详细地址"
                  ></el-input>
                </el-form-item>
                <el-form-item label="岗位职责 :" prop="position">
                  <el-input
                    type="textarea"
                    v-model="userEditForm.position"
                    placeholder="请输入岗位职责..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="岗位要求 :" prop="requirements">
                  <el-input
                    type="textarea"
                    v-model="userEditForm.requirements"
                    placeholder="请输入岗位要求..."
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="onCertain"
            >保 存</el-button
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
//创建岗位/编辑岗位
import { establishPost, editPost } from "@/api/post";
// 假的 查询接口人 查客户
// import { reqgetInterface } from "@/mockjs/reqMock";

import { regionData, CodeToText, TextToCode } from "element-china-area-data";

export default {
  props: {
    toChild: String,
    tableData: "",
    projectData: "",
  },
  data() {
    return {
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      nowIndex: -1,
      options: regionData,
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
        address: "",
        customer: "",
        date: "",
        detailAddress: "",
        latestArrivalTime: "",
        number: "",
        position: "",
        postId: "",
        postName: "",
        projectId: "",
        requirements: "",
        skill: "",
      },
      initFormData: {},
      userEditFormRules: {
        postName: [
          {
            required: true,
            message: "请填写岗位名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        position: [
          {
            required: false,
            message: "请填写岗位职责",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        skill: [
          {
            required: false,
            message: "请选择岗位技能",
            trigger: ["blur", "change"],
          },
        ],
        requirements: [
          {
            required: false,
            message: "请填写岗位需求",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        project: [
          {
            required: false,
            message: "请填写项目名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        customer: [
          {
            required: false,
            message: "请填写客户名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        number: [
          {
            required: false,
            message: "请填写需求人数",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        date: [
          {
            required: false,
            message: "请选择完成时间",
            trigger: ["blur", "change"],
          },
        ],
        latestArrivalTime: [
          {
            required: false,
            message: "请选择最晚到岗时间",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          {
            required: false,
            message: "请填写办公地点",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        detailAddress: [
          {
            required: false,
            message: "请填写详细地址",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //自动选择
    queryson(e) {
      this.projectData.forEach((item) => {
        if (item.projectId == e) {
          // 项目
          let projectData = item;
          let data = { records: [{ ...this.formOptions }] };
          data.current = 1;
          data.size = 100;
          // // //  假数据接口人查询方法
          // reqgetInterface(data).then((res) => {
          //   res.data.forEach((item) => {
          //     if (item.interfaceId == projectData.interfaceId) {
          //       let names = item;
          //       this.userEditForm.customer = names.name;
          //     }
          //   });
          // });
        }
      });
    },
    //
    // 弹窗
    openDialog(row) {
      console.log(row, "表单的数据");
      this.dialogFormVisible = true; // 让弹窗显示
      // console.log(this.tableData,"-------------");
      if (row) {
        let editRow = JSON.parse(JSON.stringify(row));
        editRow.address = this.getCityCode(editRow.address);
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(editRow); // 为表单赋值
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
      this.resetFormData();
    },
    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
    },
    /* 保存  */
    onCertain() {
      if (this.userEditForm.address) {
        var loc = "";
        for (let i = 0; i < this.userEditForm.address.length; i++) {
          loc = loc + CodeToText[this.userEditForm.address[i]] + " ";
        }
        this.userEditForm.address = loc;
      }

      if (this.initFormData.postId) {
        this.userEditForm.postId = this.initFormData.postId;
        this.initFormData = this.userEditForm;
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            editPost(this.userEditForm, this.userEditForm.postId).then(
              (res) => {
                console.log(res, "res11111");
                if (res && res.code && res.code === "00000") {
                  this.$message.success("修改成功！");
                  this.dialogClose();
                  this.resetForm();
                  console.log("修改成功！");
                  this.$parent.queryPost();
                }
              }
            );
          } else {
            return false;
          }
        });
      } else {
        this.$refs["userEditRef"].validate((valid) => {
          console.log("增加了...", this.userEditForm);
          if (valid) {
            establishPost(this.userEditForm).then((res) => {
              console.log(res, "增加了.........");
              if (res && res.code && res.code === "00000") {
                this.$message.success("创建成功！");
                this.dialogClose();
                console.log("创建成功！");
                this.$parent.queryPost();
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    getCityCode(cityText) {
      var codeArray = [];
      if (cityText != "") {
        var cityArray = cityText.trim().split(" ");
        if (cityArray.length == 1) {
          codeArray.push(TextToCode[cityArray[0]].code);
        } else if (cityArray.length == 2) {
          codeArray.push(TextToCode[cityArray[0]].code);
          codeArray.push(TextToCode[cityArray[0]][cityArray[1]].code);
        } else if (cityArray.length == 3) {
          codeArray.push(TextToCode[cityArray[0]].code);
          codeArray.push(TextToCode[cityArray[0]][cityArray[1]].code);
          codeArray.push(
            TextToCode[cityArray[0]][cityArray[1]][cityArray[2]].code
          );
        }
      }

      return codeArray;
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

.dialog-footer {
  text-align: right;
  padding: 10px 20px 20px;
}
::v-deep .el-dialog__body {
  padding: 0;
}
</style>