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
                <el-form-item label="地域名称 :" prop="regionName">
                  <el-input
                    v-model="userEditForm.regionName"
                    clearable
                    filterable
                  >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onCertain"
          >保 存</el-button
        >
        <el-button type="info" @click="dialogClose" size="mini"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 新增 * 编辑
import { establishRegion, editRegion } from "@/api/region";
// 地图
// import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      // options: regionData,
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
        regionName: "",
      },
      initFormData: {},
      userEditFormRules: {
        regionName: [
          {
            required: true,
            message: "请输入地域名称",
            trigger: ["blur", "change"],
          },
         {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
           {
            pattern: /^(?![0-9]).*$/,
            message: "不能以数字开头",
            trigger: "blur",
          },
          {
            pattern: /^([\u4E00-\u9FA5])*$/,
            message: "请输入中文名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    openDialog(row) {
      console.log(row, "表单的数据");
      this.dialogFormVisible = true; // 让弹窗显示
      if (row) {
        // let editRow = JSON.parse(JSON.stringify(row));
        // editRow.regionName = this.getCityCode(editRow.regionName);
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
      this.resetFormData();
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
    },
    /* 保存  */
    onCertain() {
      console.log("保存了------", this.userEditForm.regionName);
      // if (this.userEditForm.regionName) {
      //   var loc = "";
      //   for (let i = 0; i < this.userEditForm.regionName.length; i++) {
      //     loc = loc + CodeToText[this.userEditForm.regionName[i]] + "/";
      //   }
      //   loc = loc.slice(0, loc.length - 1);
      //   this.userEditForm.regionName = loc;
      //   console.log("保存了------", this.userEditForm.regionName);
      // }
      if (this.initFormData.regionId) {
        this.userEditForm.regionId = this.initFormData.regionId;
        this.initFormData = this.userEditForm;
        console.log(this.userEditForm, "保存执行了");
        console.log(
          this.userEditForm.regionId,
          this.userEditForm,
          "this.initFormData.regionId"
        );
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            editRegion(this.userEditForm, this.userEditForm.regionId).then(
              (res) => {
                console.log(res, "res11111");
                if (res && res.code && res.code === "00000") {
                  this.$message.success("修改成功！");
                  this.dialogClose();
                  console.log("修改成功！");
                  this.$parent.queryRoles();
                }
              }
            );
          } else {
            return false;
          }
        });
      } else {
        console.log("增加了...");
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "增加了的valid");
          console.log(
            this.userEditForm,
            this.userEditForm.regionId,
            "----------地域"
          );
          if (valid) {
            establishRegion(this.userEditForm, this.userEditForm.regionId).then(
              (res) => {
                console.log(res, "增加了...res11111");
                if (res && res.code && res.code === "00000") {
                  // this.$parent.resetForm();
                  // this.nowIndex = -1; // 重置选中
                  this.dialogFormVisible = false; // 让弹窗隐藏
                  this.$message.success("创建成功！");
                  this.$parent.queryRoles();
                }
              }
            );
          } else {
            return false;
          }
        });
      }
    },
    // getCityCode(cityText) {
    //   var codeArray = [];
    //   if (cityText != "") {
    //     var cityArray = cityText.trim().split(" ");
    //     if (cityArray.length == 1) {
    //       codeArray.push(TextToCode[cityArray[0]].code);
    //     } else if (cityArray.length == 2) {
    //       codeArray.push(TextToCode[cityArray[0]].code);
    //       codeArray.push(TextToCode[cityArray[0]][cityArray[1]].code);
    //     } else if (cityArray.length == 3) {
    //       codeArray.push(TextToCode[cityArray[0]].code);
    //       codeArray.push(TextToCode[cityArray[0]][cityArray[1]].code);
    //       codeArray.push(
    //         TextToCode[cityArray[0]][cityArray[1]][cityArray[2]].code
    //       );
    //     }
    //   }
    //   return codeArray;
    // },
  },
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
@{deep} .register_form_main {
  position: relative;
  min-width: 40%;
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
  padding: 0 20px 20;
  .el-input-group__append {
    padding: 0 2px;
  }
}
.el-form-item {
  display: flex;
}
::v-deep .el-dialog {
  width: 20%;
}
::v-deep .el-form-item__label {
  margin-right: 25px;
}

::v-deep .el-dialog__body {
  padding: 20px 20px 0;
}
::v-deep .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
::v-deep .el-dialog__footer {
  padding: 20px;
}
::v-deep .el-form-item {
  display: flex;
  align-items: center;
}
::v-deep .el-input__inner {
  height: 30px;
}
</style>