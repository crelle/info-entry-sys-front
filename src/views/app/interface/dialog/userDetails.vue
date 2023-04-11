<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
      lock-scroll
      @close="closeDialog"
      class="showAll_dialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="userbox">
                  <ul class="lis">
                    <li>
                      <span>接口人名:</span
                      ><span :title="userEditForm.interfaceName">{{ userEditForm.interfaceName }}</span>
                    </li>
                    <li>
                      <span>性别:</span><span>{{ userEditForm.gender }}</span>
                    </li>
                    <li>
                      <span>客户:</span
                      ><span :title="userEditForm.customerName">{{ userEditForm.customerName }}</span>
                    </li>
                    <li>
                      <span>手机号:</span
                      ><span :title="userEditForm.cellPhone">{{ userEditForm.cellPhone }}</span>
                    </li>
                    <li>
                      <span>邮箱:</span><span :title="userEditForm.email">{{ userEditForm.email }}</span>
                    </li>
                    <li>
                      <span>接口人办公地址:</span>
                      <span :title="userEditForm.address">{{ userEditForm.address }}</span>
                    </li>
                    <li class="new">
                      <span>介绍:</span>
                      <span :title="userEditForm.introduce">{{
                        userEditForm.introduce
                      }}</span>
                    </li>
                  </ul>
                  <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="项目表" name="first">
                        <el-table
                          :data="tableData1"
                          height="311"
                          border
                          style="width: 100%"
                        >
                          <el-table-column
                            label="序号"
                            type="index"
                            :index="indexMethod"
                            width="50"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="project"
                            label="项目名称"
                            width="120"
                          >
                          </el-table-column>
                          <el-table-column prop="status" label="项目状态">
                          </el-table-column>
                          <el-table-column prop="customerName" label="客户">
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
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogClose" size="mini"
            >取 消</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    toChild: String,
    tableDataProject: "",
  },
  data() {
    return {
      // 假数据
      tableData1: [
        {
          number: "1",
          date: "n20160502",
          name: "赵二",
          address: "@ewqe",
          contact: "13315715789",
          project: "开发中",
          person: "aaa",
          derson: "ergfdd",
          people: "22人",
          gap: "4人",
        },
        {
          number: "2",
          date: "n20160504",
          name: "张三",
          address: "@qeqwe",
          contact: "13915715789",
          project: "开发中",
          person: "bbb",
          derson: "ytht",
          people: "20人",
          gap: "1人",
        },
        {
          number: "3",
          date: "n20160501",
          name: "李四",
          address: "@rfwr213",
          contact: "13215715789",
          project: "暂停中",
          person: "ccc",
          derson: "xsad",
          people: "30人",
          gap: "4人",
        },
        {
          number: "4",
          date: "n20160503",
          name: "王五",
          address: "@r43rft455",
          contact: "13115715789",
          project: "交付中",
          person: "ddd",
          derson: "jfgtr",
          people: "10人",
          gap: "2人",
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
        customerName: "",
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
    };
  },
  methods: {
    // 表格
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 表格
    handleClick(tab, event) {
      console.log(tab, event);
    },
    openDialog(row) {
      this.tableData1 = [];
      this.dialogFormVisible = true; // 让弹窗显示
      if (row) {
        this.initFormData = row;
        // console.log(this.tableDataProject, "----父亲传来的全部项目");
        // 根据接口人 id 查询项目赋值 tableData1
        this.tableDataProject.forEach((item) => {
          if (row.interfaceId == item.interfaceId) {
            this.tableData1.push(item);
          }
        });
        console.log(this.tableData1, "---接口人对应的项目");
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
    indexMethod(index) {
      return index + 1;
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
      min-width: 110px;
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
      min-width: 110px;
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