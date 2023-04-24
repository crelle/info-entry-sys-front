<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="30%"
      lock-scroll
      @close="closeDialog"
      class="showAll_dialog"
    >
      <!--  必填属性 required -->
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form
                :model="assetEditForm"
                :rules="assetEditFormRules"
                ref="assetEditRef"
                size="mini"
              >
                <el-form-item label="使用人 :" prop="employeeId">
                  <el-select
                    v-model="assetEditForm.employeeId"
                    placeholder="请选择使用人"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in employeeList"
                      :key="item.index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="使用部门 :" prop="projectId">
                  <el-select
                    v-model="assetEditForm.projectId"
                    placeholder="请选择使用部门"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in departmentList"
                      :key="item.index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="资产名称" prop="name">
                  <el-input
                    placeholder="请填写资产名称"
                    v-model="assetEditForm.name"
                  ></el-input>
                </el-form-item>
                <el-form-item label="资产编号" prop="no">
                  <el-input
                    placeholder="请填写资产编号"
                    v-model="assetEditForm.no"
                  ></el-input>
                </el-form-item>
                <el-form-item label="资产序列号" prop="serialNumber">
                  <el-input
                    placeholder="请填写资产序列号"
                    v-model="assetEditForm.serialNumber"
                  ></el-input>
                </el-form-item>
                <el-form-item label="入库时间" prop="createTime">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="assetEditForm.createTime"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="是否可用" width="150px" prop="enabled">
                  <el-switch
                    v-model="assetEditForm.enabled"
                    inactive-text="不可用"
                    inactive-value="0"
                    active-text="可用"
                    active-value="1"
                  >
                  </el-switch>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn">
              <el-button type="primary" size="mini" @click="onCertain"
                >保 存</el-button
              >
              <el-button
                class="cancel"
                type="info"
                @click="closeDialog"
                size="mini"
                >取 消</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 创建( 资产 ) , 查询员工
import {
  createProperty,
  queryEmployeeManual,
} from "@/api/employee";

export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      // 员工全部
      employeeList: {},
      // 全部部门
      departmentList: {},
      dialogFormVisible: false,
      assetEditForm: {
        // 员工id 使用人
        employeeId: "",
        //使用 部门id
        projectId: "",
        // 资产名字
        name: "",
        // 资产编号
        no: "",
        // 资产序列号
        serialNumber: "",
        // 资产状态 1 0
        enabled: "",
        // 入库时间
        createTime: "",
      },
      initFormData: {},
      // 正则验证
      assetEditFormRules: {
        name: [
          {
            required: false,
            message: "请输入资产名字",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // 查询岗位
    // 弹窗
    openDialog(row) {
      this.dialogFormVisible = true; // 让弹窗显示
      this.employeeQuery();
    },
    closeDialog() {
      this.$refs["assetEditRef"].resetFields();
      this.resetForm("assetEditRef"); // 重置表单
      this.dialogFormVisible = false;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询全部员工
    employeeQuery() {
      // console.log("查询全部员工");
      let data = { records: [{ ...this.formSon }] };
      data.current = 1;
      data.size = 999;
      queryEmployeeManual(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          console.log(res.data, "查询全部员工");
        }
      });
    },
    /* 保存  */
    onCertain() {
      // 创建
      this.$refs["assetEditRef"].validate((valid) => {
        if (valid) {
          console.log(this.assetEditForm, "-----------创建传入的内容");
          createProperty(this.assetEditForm).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.$message.success("创建成功！");
            }
          });
        } else {
          return false;
        }
      });
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
  padding: 0 50px;
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
  justify-content: center;
}
::v-deep .el-form-item__label {
  width: 125px !important;
  text-align: left;
}
::v-deep .el-input__inner {
  width: 180px;
  color: #606266 !important;
}
::v-deep .el-textarea__inner {
  min-height: 110px !important;
  width: 684px;
  color: #606266;
  font-size: inherit !important;
}
::v-deep .el-dialog {
  width: 50%;
}

::v-deep .el-dialog__body {
  padding: 0 20px;
}
.btn {
  text-align: right;
  margin: 2px 0 20px;
}
// 修改对话框高度 滚动条
.showAll_dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ::v-deep .el-dialog {
    margin: 0 auto !important;
    height: 83%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
      // 下边设置字体，我的需求是黑底白字
      color: #606266;
      line-height: 30px;
      padding: 0 15px;
    }
  }
}

::v-deep .el-dialog {
  min-width: 700px;
}
.el-switch {
  width: 180px;
}
</style>