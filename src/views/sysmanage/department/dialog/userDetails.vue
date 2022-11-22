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
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="box">
                  <ul>
                    <li>
                      <span>部门名:</span
                      ><span>{{ userEditForm.department }}</span>
                    </li>
                    <li>
                      <span>负责人:</span><span>{{ userEditForm.userId }}</span>
                    </li>
                    <li>
                      <span>手机号:</span
                      ><span>{{ userEditForm.cellPhone }}</span>
                    </li>
                    <li>
                      <span>邮箱:</span><span>{{ userEditForm.email }}</span>
                    </li>
                    <li>
                      <span>部门总部地址:</span
                      ><span>{{ userEditForm.address }}</span>
                    </li>
                  </ul>
                  <ul>
                    <li class="new">
                      <span>部门介绍:</span>
                      <span>{{ userEditForm.introduce }}</span>
                    </li>
                  </ul>
                  <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="部门人员" name="first">
                        <el-table :data="tableData1" border style="width: 100%">
                          <el-table-column
                            prop="number"
                            label="编号"
                            width="50"
                          >
                          </el-table-column>
                          <el-table-column prop="date" label="工号" width="120">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="人员姓名"
                            width="100"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="contact"
                            label="联系方式"
                            width="150"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="address"
                            label="地域"
                            width="150"
                          >
                          </el-table-column>
                          <el-table-column prop="project" label="所在项目">
                          </el-table-column>
                          <el-table-column prop="person" label="接口人">
                          </el-table-column>
                          <el-table-column prop="sonstate" label="状态">
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>
                      <el-tab-pane label="部门项目" name="second">
                        <el-table :data="tableData2" border style="width: 100%">
                          <el-table-column
                            prop="number"
                            label="编号"
                            width="50"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="project"
                            label="项目名称"
                            width="100"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="person"
                            label="接口人"
                            width="90"
                          >
                          </el-table-column>
                          <el-table-column prop="contact" label="联系方式">
                          </el-table-column>
                          <el-table-column
                            prop="state"
                            width="100"
                            label="项目状态"
                          >
                          </el-table-column>
                          <el-table-column prop="customer" label="客户">
                          </el-table-column>
                          <el-table-column prop="belonging" label="所属部门">
                          </el-table-column>
                          <el-table-column prop="people" label="项目人数">
                          </el-table-column>
                          <el-table-column prop="gap" label="项目缺口">
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
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
      // 假数据
      tableData1: [
        {
          number: "1",
          date: "n20160502",
          name: "赵二",
          address: "武汉1518 弄",
          contact: "13315715789",
          project: "xxx项目",
          person: "aaa",
          sonstate: "在岸",
        },
        {
          number: "2",
          date: "n20160504",
          name: "张三",
          address: "南京1517 弄",
          contact: "13915715789",
          project: "yyy项目",
          person: "bbb",
          sonstate: "外派",
        },
        {
          number: "3",
          date: "n20160501",
          name: "李四",
          address: "上海1519 弄",
          contact: "13215715789",
          project: "zzz项目",
          person: "ccc",
          sonstate: "离职",
        },
        {
          number: "4",
          date: "n20160503",
          name: "王五",
          address: "湖北1516 弄",
          contact: "13115715789",
          project: "www项目",
          person: "ddd",
          sonstate: "在岸",
        },
      ],
      tableData2: [
        {
          number: "1",
          project: "xxx项目",
          person: "aaa",
          contact: "13334215789",
          state: "开发中",
          customer: "ddd客户",
          belonging: "kkk部门",
          people: "50人",
          gap: "1人",
        },
        {
          number: "2",
          project: "xxx项目",
          person: "bbb",
          contact: "13235715789",
          state: "完成",
          customer: "ccc客户",
          belonging: "zzz部门",
          people: "30人",
          gap: "5人",
        },
        {
          number: "3",
          project: "xxx项目",
          person: "ccc",
          contact: "13545715789",
          state: "维护",
          customer: "bbb客户",
          belonging: "yyy部门",
          people: "18人",
          gap: "10人",
        },
        {
          number: "4",
          project: "xxx项目",
          person: "ddd",
          contact: "1376715789",
          state: "测试中",
          customer: "aaa客户",
          belonging: "xxx部门",
          people: "50人",
          gap: "5人",
        },
      ],
      // 假数据
      activeName: "first",
      textarea:
        "诚迈科技（南京）股份有限公司（300598.SZ）成立于2006年，总部位于南京，专注于智能互联与操作系统技术的研发与创新，致力于成为全球领先的智能科技专家，以科技造福人类",
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
        email: "",
        introduce: "",
        jobNo: "",
        userId: "",
      },
      initFormData: {},
    };
  },
  methods: {
    // 表格
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
    font-size: 14px;
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
.box {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      font-size: 14px;
      width: 50%;
      margin: 10px 0;
      display: flex;

      span:nth-child(1) {
        width: 120px;
      }
    }
    .new {
      width: 80%;
      span:nth-child(1) {
        display: block;
      }
      span:nth-child(2) {
        margin-right: 40px;
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
}
::v-deep .el-textarea {
  width: 100%;
  .el-textarea__inner {
    min-height: 80px !important;
    width: 100%;
    color: #606266;
  }
}
::v-deep .el-dialog__body {
  padding-bottom: 10px;
}
::v-deep .el-tabs {
  padding: 0 40px;
}
.dialog-footer {
  text-align: center;
}
::v-deep .el-table {
  font-size: 14px;
}
::v-deep .el-dialog__body {
  padding: 0;
}
::v-deep .el-dialog__footer{
  padding: 20px 0;
}
</style>