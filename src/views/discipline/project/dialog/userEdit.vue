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
                <el-form-item label="项目名称" prop="project">
                  <el-input
                    placeholder="项目名称"
                    v-model="userEditForm.project"
                  ></el-input>
                </el-form-item>
                <el-form-item label="项目状态" prop="status">
                  <!--  必填属性 required -->
                  <el-select
                    v-model="userEditForm.status"
                    clearable
                    filterable
                    placeholder="请选择项目状态"
                  >
                    <el-option label="开发中" value="1"></el-option>
                    <el-option label="前期投入" value="2"></el-option>
                    <el-option label="交付阶段" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="立项时间" prop="time">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="userEditForm.time"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="地域" prop="regionId">
                  <el-select
                    v-model="userEditForm.regionId"
                    placeholder="地域"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in MockUser"
                      :key="item.index"
                      :label="item.regionName"
                      :value="item.regionId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="接口人" prop="interfaceId">
                  <el-select
                    v-model="userEditForm.interfaceId"
                    placeholder="请选择接口人"
                    clearable
                    filterable
                    @change="queryson"
                  >
                    <el-option
                      v-for="item in Interface"
                      :key="item.index"
                      :label="item.interfaceName"
                      :value="item.interfaceId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop="cellPhone">
                  <el-input
                    v-model="userEditForm.cellPhone"
                    placeholder="手机号"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="userEditForm.email"
                    placeholder="邮箱"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="客户名称" prop="customerName">
                  <el-input
                    v-model="userEditForm.customerName"
                    placeholder="客户名称"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="departmentId">
                  <el-select
                    v-model="userEditForm.departmentId"
                    placeholder="部门名称"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in Users"
                      :key="item.index"
                      :label="item.department"
                      :value="item.departmentId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合作模式" prop="cooperation">
                  <el-select
                    v-model="userEditForm.cooperation"
                    placeholder="请选择合作模式"
                  >
                    <el-option label="TM" value="TM"></el-option>
                    <el-option label="OD" value="OD"></el-option>
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
        <el-button type="info" @click="dialogClose" size="mini"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//创建项目、编辑
import { establishProject, editProject } from "@/api/project";
export default {
  props: {
    toChild: String,
    tableData: "",
    Interface: "",
    MockUser: "",
    Users: "",
    tableCustomer: "",
  },
  data() {
    let validateTel = (rule, value, callback) => {
      // 判断传入的值是否可以通过校验
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
    let validateMail = (rule, value, callback) => {
      // 判断传入的值是否可以通过校验
      if (
        !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        )
      ) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    return {
      textarea: "",
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      userEditForm: {
        cellPhone: "",
        email: "",
        customerName: "",
        cooperation: "",
        departmentId: "",
        interfaceId: "",
        introduce: "",
        project: "",
        regionId: "",
        status: "",
        time: "",
      },
      initFormData: {},
      userEditFormRules: {
        interfaceId: [
          {
            required: true,
            message: "请输入接口人",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: false,
            message: "请选择性别",
            trigger: ["blur", "change"],
          },
        ],
        status: [
          {
            required: false,
            message: "请选择状态",
            trigger: ["blur", "change"],
          },
        ],
        departmentId: [
          {
            required: true,
            message: "请选择部门",
            trigger: ["blur", "change"],
          },
        ],
        project: [
          {
            required: true,
            message: "请填写项目名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        regionId: [
          {
            required: false,
            message: "请选泽地域",
            trigger: ["blur", "change"],
          },
        ],
        time: [
          {
            required: false,
            message: "请选泽立项时间",
            trigger: ["blur", "change"],
          },
        ],
        cooperation: [
          {
            required: false,
            message: "请选泽合作模式",
            trigger: ["blur", "change"],
          },
        ],
        introduce: [
          {
            required: false,
            message: "请填写介绍",
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
            required: false,
            message: "请填手机号",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请填正确的手机号",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: false,
            message: "请填邮箱号",
            trigger: ["blur", "change"],
          },
        ],
        customerName: [
          {
            required: false,
            message: "请填客户名称",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    //自动选择
    queryson(e) {
      console.log(e, "---eee");
      if (e) {
        this.Interface.forEach((sitem) => {
          if (e == sitem.interfaceId) {
            this.userEditForm.email = sitem.email;
            this.userEditForm.cellPhone = sitem.cellPhone;
            // sitem.customerId = e;
            this.tableCustomer.forEach((items) => {
              if (sitem.customerId == items.customerId) {
                this.userEditForm.customerName = items.customerName;
                this.userEditForm.customerId = items.customerId;
              }
            });
          }
        });
      } else {
        this.userEditForm.customerName = null;
        this.userEditForm.email = null;
        this.userEditForm.cellPhone = null;
      }
    },
    //
    // 弹窗
    openDialog(row) {
      console.log(row, "表单的数据");
      this.dialogFormVisible = true; // 让弹窗显示
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
      console.log(this.userEditForm, "取消");
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
      this.userEditForm.roles = [];
    },
    // // 头像上传相关
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    //   this.nowIndex = -1; // 取消默认头像选中样式
    //   console.log(this.imageUrl);
    // },
    // beforeAvatarUpload(file) {
    //   console.log(file.type);
    //   // 判断上传文件的类型
    //   if (/^image\/+?/.test(file.type)) {
    //     this.fileType.fileType = 0;
    //   } else if (/^video\/+?/.test(file.type)) {
    //     this.fileType.fileType = 1;
    //   } else if (/^audio\/+?/.test(file.type)) {
    //     this.fileType.fileType = 2;
    //   } else if (/^application\/vnd.ms-+?/.test(file.type)) {
    //     this.fileType.fileType = 3;
    //   } else {
    //     this.$message.error("此文件类型不支持!");
    //     return false;
    //   }

    //   const isLt2M = file.size / 1024 / 1024 < 100;

    //   // if (!isJPG) {
    //   //   this.$message.error("上传头像图片只能是 JPG 格式!");
    //   // }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 100MB!");
    //   }
    //   // return isJPG && isLt2M;
    //   return isLt2M;
    // },
    // // 选择默认头像
    // choosedefaultImg(index, url) {
    //   if (index !== this.nowIndex) {
    //     console.log(this.nowIndex);
    //     this.nowIndex = index;
    //     this.imageUrl = url;
    //   } else {
    //     console.log(this.nowIndex, -1);
    //     this.nowIndex = -1;
    //     this.imageUrl = "";
    //   }
    // },

    /* 保存  */
    onCertain() {
      if (this.initFormData.projectId) {
        this.userEditForm.projectId = this.initFormData.projectId;
        this.initFormData = this.userEditForm;
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            // 删除指定的 对象 （delete）
            delete this.userEditForm.customerName;
            if (this.initFormData.status == "开发中") {
              this.initFormData.status = 1;
            } else if (this.initFormData.status == "前期投入") {
              this.initFormData.status = 2;
            } else if (this.initFormData.status == "交付阶段") {
              this.initFormData.status = 3;
            }
            console.log(this.userEditForm, "----保存传递的内容");
            editProject(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "---编辑调取了接口");
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                // this.dialogClose();
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
          console.log(valid, "增加了的valid");
          console.log(this.userEditForm, "-----------增加的项目内容*********");
          if (valid) {
            console.log("this.userEditForm----", this.userEditForm);
            establishProject(this.userEditForm).then((res) => {
              console.log(res, "增加了项目");
              if (res && res.code && res.code === "00000") {
                // this.$parent.resetForm();
                // this.nowIndex = -1; // 重置选中
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
  padding: 14px 50px;
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
::v-deep.el-form-item {
  display: flex;
  margin-right: 50px;
  margin-bottom: 18px !important;
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
  font-size: 14px;
  font-family: "微软雅黑";
}
::v-deep .el-dialog {
  width: 30%;
}

::v-deep .el-dialog__body {
  padding: 0 20px;
}
::v-deep .el-dialog__footer {
  padding: 0 20px 20px;
}
</style>