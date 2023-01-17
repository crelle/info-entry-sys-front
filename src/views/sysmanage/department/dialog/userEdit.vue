<template>
  <div>
    <el-dialog
      :data="tableDatasan"
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="30%"
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
                <el-form-item label="部门名" prop="department">
                  <el-input
                    v-model="userEditForm.department"
                    placeholder="部门名"
                    @change="queryson"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="userId">
                  <el-select
                    v-model="userEditForm.userId"
                    placeholder="请选择负责人"
                    filterable
                    @change="queryson"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in UserData"
                      :key="item.index"
                      :label="item.username"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工号" prop="jobNo">
                  <el-input
                    placeholder="工号"
                    v-model="userEditForm.jobNo"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="cellPhone">
                  <el-input
                    type="tel"
                    v-model="userEditForm.cellPhone"
                    placeholder="手机号"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    type="email"
                    v-model="userEditForm.email"
                    placeholder="邮箱"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="上级部门" prop="departmentUp">
                  <el-select
                    v-model="userEditForm.departmentUp"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in tableDataUp"
                      :key="item.index"
                      :label="item.department"
                      :value="item.departmentId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部门总部地址" prop="address">
                  <el-input
                    type="email"
                    placeholder="部门总部地址"
                    v-model="userEditForm.address"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="部门介绍" prop="introduce">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="userEditForm.introduce"
                  >
                  </el-input>
                </el-form-item>
                <!-- <el-form-item label="" prop="password">
                  <el-input
                    class="passwordat"
                    type="email"
                    v-model="userEditForm.password"
                    placeholder="密码"
                    :disabled="true"
                    ><i class="el-icon-message" slot="prepend"></i
                  ></el-input>
                </el-form-item> -->
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
import { establishDepartments, editDepartments } from "@/api/department";

export default {
  props: {
    toChild: String,
    tableDataUp: "",
    UserData: "",
  },
  data() {
    return {
      tableDatasan: [],
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
        department: "",
        departmentId: "",
        departmentUp: "",
        email: "",
        introduce: "",
        jobNo: "",
        userId: "",
      },
      initFormData: {},
      userEditFormRules: {
        department: [
          {
            required: true,
            message: "请输部门名",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
            trigger: "blur",
          },
          {
            pattern: /^([\u4E00-\u9FA5]).*$/,
            message: "请以中文名称开头",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],

        email: [
          {
            required: false,
            message: "请填写邮箱",
            trigger: ["blur", "change"],
          },
          {
            pattern:
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        userId: [
          {
            required: true,
            message: "请选择负责人",
            trigger: ["blur", "change"],
          },
        ],
        cellPhone: [
          {
            required: false,
            message: "请填写手机号码",
            trigger: ["blur", "change"],
          },
        ],
        jobNo: [
          {
            required: false,
            message: "请填工号",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          {
            required: false,
            message: "请填写部门总部地址",
            trigger: ["blur", "change"],
          },
        ],
        departmentUp: [
          {
            required: false,
            message: "请选择上级部门",
            trigger: ["blur", "change"],
          },
        ],
        introduce: [
          {
            required: false,
            message: "请填写部门介绍",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    //自动选择
    queryson(e) {
      if (this.UserData[e]) {
        // this.userEditForm = this.tableData[e];
        this.userEditForm.userId = this.UserData[e].username;
        this.userEditForm.cellPhone = this.UserData[e].userPhone;
        this.userEditForm.email = this.UserData[e].userEmail;
        this.userEditForm.jobNo = this.UserData[e].jobNo;
        // console.log(this.userEditForm,"this.tableData[e]----this.userEditForm");
      } else {
        return;
      }
    },
    //
    // 弹窗
    openDialog(row) {
      console.log(row, "表单的数据");
      this.dialogFormVisible = true; // 让弹窗显示
      // 查询部门列表
      console.log(this.tableDataUp, "------父亲传来的部门");
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
        });
      } else {
        console.log("我是新增");
        // 指定删除的
        delete this.userEditForm.departmentId;
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
      if (this.userEditForm.departmentId) {
        this.initFormData = this.userEditForm;
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            console.log(this.userEditForm, "传入修改的内容");
            editDepartments(this.userEditForm).then((res) => {
              if (res.code === "00000") {
                this.$message.success("修改成功！");
                this.$parent.queryUserList();
                this.dialogFormVisible = false; // 让弹窗隐藏
              }
            });
          }
        });
      } else {
        console.log("新增了");
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            console.log(this.userEditForm, "新增内容带字段------");
            establishDepartments(this.userEditForm).then((res) => {
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
}
::v-deep .el-form-item__label {
  width: 110px;
  text-align: left;
}
::v-deep .el-input__inner {
  width: 250px;
  color: #606266 !important;
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
  padding: 0;
}
::v-deep .el-dialog{
  min-width:400px;
}
</style>




