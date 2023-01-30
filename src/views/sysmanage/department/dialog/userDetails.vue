<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="boxmax">
                  <ul class="box">
                    <li>
                      <span>部门名:</span
                      ><span :title="userEditForm.department">{{ userEditForm.department }}</span>
                    </li>
                    <li>
                      <span>负责人:</span><span>{{ userEditForm.userId }}</span>
                    </li>
                    <li>
                      <span>手机号:</span
                      ><span :title="userEditForm.cellPhone">{{ userEditForm.cellPhone }}</span>
                    </li>
                    <li>
                      <span>邮箱:</span><span :title="userEditForm.email">{{ userEditForm.email }}</span>
                    </li>
                    <li>
                      <span>部门总部地址:</span
                      ><span :title="userEditForm.address">{{ userEditForm.address }}</span>
                    </li>
                    <li class="new">
                      <span>部门介绍:</span>
                      <span :title="userEditForm.introduce">{{
                        userEditForm.introduce
                      }}</span>
                    </li>
                  </ul>
                  <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="部门人员" name="first">
                        <el-table
                          :data="tableData1"
                          border
                          height="310"
                          style="width: 100%"
                        >
                          <el-table-column
                            type="index"
                            :index="indexMethod"
                            label="编号"
                            width="50"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="jobNo"
                            label="工号"
                            width="120"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="人员姓名"
                            width="100"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="cellPhone"
                            label="联系方式"
                            width="150"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="regionName"
                            label="地域"
                            width="80"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="project"
                            label="所在项目"
                            :show-overflow-tooltip="true"
                          >
                          </el-table-column>
                          <el-table-column prop="interfaceName" label="接口人">
                          </el-table-column>
                          <el-table-column prop="sonstate" label="状态">
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>
                      <el-tab-pane label="部门项目" name="second">
                        <el-table
                          :data="tableData2"
                          border
                          height="310"
                          style="width: 100%"
                        >
                          <el-table-column
                            type="index"
                            :index="indexMethod"
                            label="编号"
                            width="50"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="project"
                            label="项目名称"
                            width="100"
                            :show-overflow-tooltip="true"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="interfaceName"
                            label="接口人"
                            width="90"
                          >
                          </el-table-column>
                          <el-table-column prop="cellPhone" label="联系方式">
                          </el-table-column>
                          <el-table-column
                            prop="status"
                            width="100"
                            label="项目状态"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="project"
                            label="客户"
                            :show-overflow-tooltip="true"
                          >
                          </el-table-column>
                          <el-table-column prop="department" label="所属部门">
                          </el-table-column>
                          <el-table-column prop="people" label="项目人数">
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
    tableDataLook: "",
    tableDataProject: "",
  },
  data() {
    return {
      // 根据部门id查询部门人员
      tableData1: [],
      // 假数据
      tableData2: [],
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
      ((this.tableData1 = []), (this.tableData2 = [])),
        console.log(this.userEditForm, "001001");
      // console.log(this.tableDataLook, "员工----");
      this.dialogFormVisible = true; // 让弹窗显示
      //操作  员工   根据负责人对应的部门 的id 查找同部门的人员  赋值到 tableData1 中
      this.tableDataLook.forEach((item) => {
        if (row.departmentId == item.departmentId) {
          this.tableData1.push(item);
        }
      });
      //操作  项目   根据负责人对应的部门 的id 查找同部门的项目  赋值到 tableData2 中
      this.tableDataProject.forEach((item) => {
        if (row.departmentId == item.departmentId) {
          this.tableData2.push(item);
        }
      });
      // console.log(this.tableData1, "push来的内容1");
      console.log(this.tableData2, "push来的内容2");
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
.boxmax {
  padding: 0 30px;
}
.box {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  li {
    font-size: 14px;
    width: 50%;
    margin: 10px 0;
    display: flex;

    span:nth-child(1) {
      display: block;
      min-width: 100px;
    }
    span:nth-child(2) {
      display: block;
      min-width: 80px;
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
  padding: 0 20px;
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
::v-deep .el-dialog__footer {
  padding: 20px 0;
}
::v-deep .el-dialog {
  min-width: 460px;
}
</style>