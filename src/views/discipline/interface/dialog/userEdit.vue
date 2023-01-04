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
                <el-form-item label="接口人名称" prop="interfaceName">
                  <el-input
                    v-model="userEditForm.interfaceName"
                    placeholder="接口人名称"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                  <el-select v-model="userEditForm.gender" placeholder="请选择">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="接口人办公地址" prop="address">
                  <el-cascader
                    size="large"
                    :options="options"
                    v-model="userEditForm.address"
                    clearable
                    filterable
                  ></el-cascader>
                </el-form-item> -->
                <el-form-item label="接口人办公地址" prop="address">
                  <el-input
                    type="tel"
                    v-model="userEditForm.address"
                    placeholder="请输入地址"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="cellPhone">
                  <el-input
                    type="tel"
                    v-model="userEditForm.cellPhone"
                    placeholder="手机号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    type="email"
                    v-model="userEditForm.email"
                    placeholder="邮箱"
                    clearable
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item label="负责项目">
                  <el-input type="email" placeholder="负责项目"
                    ><i class="el-icon-message" slot="prepend"></i
                  ></el-input>
                </el-form-item> -->
                <el-form-item label="客户" prop="customerId">
                  <el-select
                    v-model="userEditForm.customerId"
                    placeholder="请选择客户"
                    filterable
                    clearable
                    @change="queryson"
                  >
                    <el-option
                      v-for="item in tableCustomer"
                      :key="item.index"
                      :label="item.customerName"
                      :value="item.customerId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="介绍" prop="introduce">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="userEditForm.introduce"
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
        <el-button
          type="primary"
          class="cancel"
          @click="dialogClose"
          size="mini"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//创建接口人/编辑接口人
import { establishInterface, editInterface } from "@/api/interface";

// import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  props: {
    toChild: String,
    tableData: "",
    tableCustomer: "",
  },
  data() {
    return {
      // options: regionData,
      xingbie: "",
      textarea: "",
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
        address: "",
        cellPhone: "",
        customerId: "",
        email: "",
        gender: "",
        interfaceId: "",
        interfaceName: "",
        introduce: "",
      },
      initFormData: {},
      userEditFormRules: {
        interfaceName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],

        email: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        interfaceName: [
          {
            required: true,
            message: "请填写接口人名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        userNickName: [
          {
            required: true,
            message: "请填写昵称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        cellPhone: [
          {
            required: true,
            message: "请填写手机号码",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: false,
            message: "请填写地域",
            trigger: ["blur", "change"],
          },
        ],
        introduce: [
          {
            required: false,
            message: "请填介绍",
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
      // console.log("选择的触发///////////");
      // console.log(e, "----------------");
      // console.log(this.tableData[e], "+++++++++++++++");
      // this.userEditForm = this.tableData[e];
      // this.userEditForm.responsibility = this.tableCustomer[e].userNickName;
      // console.log(this.userEditForm,"this.tableData[e]----this.userEditForm");
    },
    //
    // 弹窗
    openDialog(row) {
      console.log(row, "表单的数据");
      this.dialogFormVisible = true; // 让弹窗显示
      if (row) {
        // let editRow = JSON.parse(JSON.stringify(row));
        // editRow.address = this.getCityCode(editRow.address);
        // this.initFormData = row;
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
      // // ---
      // if (this.userEditForm.address) {
      //   var loc = "";
      //   for (let i = 0; i < this.userEditForm.address.length; i++) {
      //     loc = loc + CodeToText[this.userEditForm.address[i]] + "/";
      //   }
      //   loc = loc.slice(0, loc.length - 1);
      //   this.userEditForm.address = loc;
      // }
      if (this.initFormData.interfaceId) {
        this.userEditForm.interfaceId = this.initFormData.interfaceId;
        this.initFormData = this.userEditForm;
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            editInterface(
              this.userEditForm,
              this.userEditForm.interfaceId
            ).then((res) => {
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                this.$parent.queryUserList();
                this.dialogFormVisible = false; // 让弹窗显
              }
            });
          } else {
            return false;
          }
        });
      } else {
        console.log("增加了...");
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            console.log(this.userEditForm, "新增的内容字段------------");
            establishInterface(this.userEditForm).then((res) => {
              console.log(res, "增加了........");
              if (res && res.code && res.code === "00000") {
                this.$message.success("创建成功！");
                this.dialogClose();
                this.$parent.queryUserList();
              }
            });
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
  padding: 10px 50px;
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
  width: 125px;
  text-align: left;
}
::v-deep .el-input__inner {
  width: 250px;
}
::v-deep .el-textarea__inner {
  min-height: 120px !important;
  width: 250px;
  color: #606266;
  font-size: 12px;
  font-family: "微软雅黑";
}
::v-deep .el-dialog {
  width: 30%;
}

::v-deep .el-dialog__body {
  padding: 0px 20px;
}
</style>