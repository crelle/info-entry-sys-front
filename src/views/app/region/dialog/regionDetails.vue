<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :modal="false"
      width="20%"
      lock-scroll
      top="25vh"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="regionbox">
                  <ul>
                    <li>
                      <span>地域名称 : </span>
                      <span>{{ userEditForm.name }}</span>
                    </li>
                  </ul>
                </div>
                <div class="regionbox">
                  <ul>
                    <li>
                      <span>地域编码 : </span>
                      <span>{{ userEditForm.code }}</span>
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
      userEditForm: {
        name: "",
        code: "",
      },
      initFormData: {},
    };
  },
  methods: {
    openDialog(row) {
      this.dialogFormVisible = true; // 让弹窗显示
      if (row) {
        this.userEditForm = row;
      }
    },
    // 确定
    dialogClose() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
ul,
li {
  margin: 0;
  padding: 0;
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
.regionbox {
  ul {
    li {
      display: flex;
      span {
        display: block;
        margin-right: 15px;
        font-size: 14px;
      }
    }
  }
}
::v-deep .el-dialog {
  width: 20%;
}
.dialog-footer {
  text-align: center;
}
::v-deep .el-dialog__footer {
  padding: 0 20px 20px;
}
::v-deep .el-dialog__body {
  padding: 20px;
  color: white;
}
::v-deep .el-dialog {
  min-width: 300px;
}
</style>