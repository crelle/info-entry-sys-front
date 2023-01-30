<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="40%"
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="initFormData" ref="userEditRef" size="mini">
                <div class="userbox">
                  <ul class="lis">
                    <li>
                      <span>岗位名称:</span
                      ><span :title="initFormData.postName">{{
                        initFormData.postName
                      }}</span>
                    </li>
                    <li>
                      <span>岗位技能:</span
                      ><span>{{ initFormData.skill }}</span>
                    </li>
                    <li>
                      <span>项目:</span><span :title="initFormData.project">{{ initFormData.project }}</span>
                    </li>
                    <li>
                      <span>客户:</span
                      ><span>{{ initFormData.customerName }}</span>
                    </li>
                    <li>
                      <span>岗位需求人数:</span
                      ><span>{{ initFormData.number }}</span>
                    </li>
                    <li>
                      <span>计划满足日期:</span
                      ><span :title="initFormData.date">{{ initFormData.date }}</span>
                    </li>
                    <li>
                      <span>办公地点:</span
                      ><span :title="initFormData.address">{{ initFormData.address }}</span>
                    </li>
                    <li>
                      <span>岗位职责:</span
                      ><span :title="initFormData.position">{{ initFormData.position }}</span>
                    </li>
                    <li class="new">
                      <span>岗位要求:</span
                      ><span  :title="initFormData.requirements">{{ initFormData.requirements }}</span>
                    </li>
                  </ul>
                </div>
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
}
::v-deep .cell {
  text-align: center;
}
::v-deep .el-dialog__body {
  margin: 0 40px;
  padding: 0 40px;
}
.lis {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    // width: 400px;
    width: 50%;
    margin: 10px 0;
    display: flex;
    span {
      display: block;
    }
    span:nth-child(1) {
      min-width: 95px;
    }
    span:nth-child(2) {
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; /* 超出几行省略 */
    }
  }
  .new {
    width: 100%;
    span:nth-child(1) {
      display: block;
      min-width: 95px;
    }
    span:nth-child(2) {
      width: 660px;
      line-height: 20px;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 超出几行省略 */
    }
  }
}
::v-deep .el-table {
  font-size: 12px;
}
.dialog-footer {
  text-align: center;
}
::v-deep .el-dialog {
  margin-top: 10vh !important;
}
.textarea {
  ::v-deep .el-textarea__inner {
    height: 100px;
    line-height: 30px;
  }
}
::v-deep .dialog-footer {
  padding: 20px 0;
}
::v-deep .el-textarea__inner {
  margin-bottom: 20px;
  margin-top: 5px;
  font-size: 14px;
  font-family: "微软雅黑";
}
::v-deep .el-form-item__label {
  min-width: 44px;
}
.introduce {
  display: block;
  display: flex;
  width: 200px;
}
::v-deep .el-dialog {
  min-width: 450px;
}
</style>