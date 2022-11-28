<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal='false'
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form ref="userEditRef" size="mini">
                <el-form-item label="岗位名称 :">
                  <span>{{ initFormData.pstname }}</span>
                </el-form-item>
                <el-form-item label="岗位技能 :">
                  <span>{{ initFormData.skill }}</span>
                </el-form-item>
                <el-form-item label="项目 :">
                  <span>{{ initFormData.project }}</span></el-form-item
                >
                <el-form-item label="客户 :">
                  <span>{{ initFormData.customer }}</span></el-form-item
                >
                <el-form-item label="岗位需求人数 :">
                  <span>{{ initFormData.number }}</span>
                </el-form-item>
                <el-form-item label="计划满足日期 :" prop="date">
                  <span>{{ initFormData.date }}</span></el-form-item
                >
                <el-form-item label="办公地点 :" prop="place">
                  <span>{{ initFormData.place }}</span></el-form-item
                >
                <el-form-item label="岗位职责 :" prop="duty">
                  <span :title="initFormData.duty" class="duty">
                    {{ initFormData.duty }}
                  </span></el-form-item
                >
                <el-form-item label="岗位要求 :" prop="requirement">
                  <span :title="initFormData.requirement" class="requirement">{{
                    initFormData.requirement
                  }}</span>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose" size="mini"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
        pstname: "",
        skill: "",
        project: "",
        customer: "",
        number: "",
        date: "",
        region: "",
        place: "",
        duty: "",
        requirement: "",
      },
      initFormData: {},
    };
  },
  methods: {
    openDialog(row) {
      console.log(this.userEditForm, "001001");
      this.dialogFormVisible = true; // 让弹窗显示
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
        });
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
    // 确定
    dialogClose() {
      this.dialogFormVisible = false;
      console.log(this.userEditForm, "确定231确定3131");
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
  },
};
</script>

<style lang="less" scoped>
* {
  list-style: none;
}
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
  padding: 5px 50px;
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
  min-height: 120px !important;
  width: 250px;
  color: #606266;
  font-size: 14px;
  font-family: "微软雅黑";
}
::v-deep .el-dialog {
  width: 30%;
}

.dialog-footer {
  text-align: center;
}
.el-form-item__content {
  span {
    display: block;
    width: 250px;
    // background-color: #f0f0f0;
    padding: 0 10px;
    //超出两行省略号
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
::v-deep .el-dialog__body{
  padding: 0;
}
.el-dialog__footer{
  text-align: c;
}
</style>