<template>
  <div>
    <el-dialog
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
                <el-form-item label="项目名称" prop="name">
                  <el-input
                    placeholder="项目名称"
                    v-model="userEditForm.name"
                    clearable
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
                  <el-option v-for="(item,i) in $dictionaryList('项目状态')" :key="i" :label="item.name" :value="item.id"></el-option>
                    <!-- <el-option label="前期投入" value="1"></el-option>
                    <el-option label="开发中" value="2"></el-option>
                    <el-option label="交付阶段" value="3"></el-option> -->
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
                    placeholder="请选择地域"
                    clearable
                    filterable
                  >
                  <el-option v-for="(item,i) in $dictionaryList('区域')" :key="i" :label="item.name" :value="item.id"></el-option>
                    <!-- <el-option
                      v-for="item in MockUser"
                      :key="item.index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option> -->
                  </el-select>
                </el-form-item>
                <el-form-item label="接口人" prop="interfaceData">
                  <el-select
                    v-model="userEditForm.interfaceData"
                    placeholder="请选择接口人"
                    multiple
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in Interface"
                      :key="item.index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部门名称" prop="departmentId">
                  <el-select
                    v-model="userEditForm.departmentId"
                    placeholder="部门名称"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in department"
                      :key="item.index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合作模式" prop="cooperation">
                  <el-select
                    v-model="userEditForm.cooperation"
                    placeholder="请选择合作模式"
                    clearable
                  >
                  <el-option v-for="(item,i) in $dictionaryList('合作模式')" :key="i" :label="item.name" :value="item.id"></el-option>
                    <!-- <el-option label="TM" value="TM"></el-option>
                    <el-option label="OD" value="OD"></el-option> -->
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
    department: "",
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
      // 接口人id暂存
      inIdTemporarilyDeposit: [],
      textarea: "",
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      userEditForm: {
        cooperation: "",
        departmentId: "",
        // interfaceData 接口人存id
        interfaceData: [],
        contactPeoples: [],
        introduce: "",
        name: "",
        regionId: "",
        status: "",
        time: "",
      },
      initFormData: {},
      userEditFormRules: {
        interfaceData: [
          {
            required: true,
            message: "请选择接口人",
            trigger: ["blur", "change"],
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
        name: [
          {
            required: true,
            message: "请填写项目名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
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
            message: "内容不能为空格",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 弹窗
    openDialog(row) {
      this.userEditForm.interfaceData = [];
      this.userEditForm.id = "";
      this.initFormData = {};
      console.log(row, "表单的数据");
      if (row) {
        row.interfaceData = [];
        this.userEditForm = row;
        console.log(this.userEditForm, "---------row");
        this.userEditForm.contactPeoples.forEach((item) => {
          this.userEditForm.interfaceData.push(item.id);
        });
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(this.userEditForm); // 为表单赋值
        });
      } else {
        console.log("我是新增");
        // this.initForm("");
      }
      this.dialogFormVisible = true; // 让弹窗显示
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
    /* 保存  */
    onCertain() {
      // 处理接口人id为对象问题
      console.log(this.userEditForm.interfaceData, "-------接口人id----");
      this.userEditForm.contactPeoples = [];
      this.userEditForm.interfaceData.forEach((item) => {
        console.log(item, "--------xxxx");
        this.userEditForm.contactPeoples.push({
          id: item,
        });
      });
      console.log(this.userEditForm.contactPeoples, "-----我要的----");
      if (this.userEditForm.id) {
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            // if (this.userEditForm.status == "开发中") {
            //   this.userEditForm.status = 1;
            // } else if (this.userEditForm.status == "前期投入") {
            //   this.userEditForm.status = 2;
            // } else if (this.userEditForm.status == "交付阶段") {
            //   this.userEditForm.status = 3;
            // }
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
  padding: 20px 50px 0;
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
  // margin-right: 50px;
  margin-bottom: 20px !important;
}
::v-deep .el-form-item__label {
  width: 85px !important;
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
::v-deep .el-dialog {
  min-width: 380px;
}
</style>