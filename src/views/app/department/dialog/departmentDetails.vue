<template>
  <div>
    <el-dialog
    :modal="false"
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
              <el-form :model="initFormData" ref="userEditRef" size="mini">
                <div class="boxmax">
                  <ul class="box">
                    <li>
                      <span>部门名:</span
                      ><span :title="initFormData.name">{{
                        initFormData.name
                      }}</span>
                    </li>
                    <li>
                      <span>负责人:</span
                      ><span>{{ initFormData.userName }}</span>
                    </li>
                    <li>
                      <span>手机号:</span
                      ><span :title="initFormData.cellPhone">{{
                        initFormData.cellPhone
                      }}</span>
                    </li>
                    <li>
                      <span>邮箱:</span
                      ><span :title="initFormData.email">{{
                        initFormData.email
                      }}</span>
                    </li>
                    <li>
                      <span>部门总部地址:</span
                      ><span :title="initFormData.address">{{
                        initFormData.address
                      }}</span>
                    </li>
                    <li>
                      <span>上级部门:</span
                      ><span :title="initFormData.parentName">{{
                        initFormData.parentName
                      }}</span>
                    </li>
                    <li class="new">
                      <span>部门介绍:</span>
                      <span :title="initFormData.introduce">{{
                        initFormData.introduce
                      }}</span>
                    </li>
                  </ul>
                  <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="部门人员" name="first">
                        <el-table
                          :data="departmentTabledata"
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
                            prop="projectName"
                            label="所在项目"
                            :show-overflow-tooltip="true"
                          >
                          </el-table-column>
                          <el-table-column prop="interfaceName" label="接口人">
                          </el-table-column>
                          <el-table-column prop="status" label="状态">
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>
                      <el-tab-pane label="部门项目" name="second">
                        <el-table
                          :data="projectTabledata"
                          border
                          height="312"
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
                            prop="name"
                            label="项目名称"
                            width="100"
                            :show-overflow-tooltip="true"
                          >
                          </el-table-column>
                          <el-table-column
                            label="接口人"
                            min-width="80"
                            show-overflow-tooltip
                          >
                            <template slot-scope="{ row }">
                              <span
                                v-for="item in row.contactPeoples"
                                :key="item.id"
                                >{{ item.name + " " }}</span
                              >
                            </template>
                          </el-table-column>
                          <!-- <el-table-column prop="cellPhone" label="联系方式">
                          </el-table-column> -->
                          <el-table-column
                            prop="status"
                            width="100"
                            label="项目状态"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="customerName"
                            label="客户"
                            :show-overflow-tooltip="true"
                          >
                          </el-table-column>
                          <el-table-column prop="name" label="所属部门">
                          </el-table-column>
                          <el-table-column prop="employeeNum" label="项目人数">
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
// 查询员工
import { queryEmployeeManual } from "@/api/employee";
// 查询项目
import { queryProject } from "@/api/project";
export default {
  props: {
    toChild: String,
    tableDataLook: "",
    tableDataProject: "",
  },
  data() {
    return {
      // 根据部门id查询部门人员
      departmentTabledata: [],
      // 根据项目id查询项目
      projectTabledata: [],
      // 假数据
      activeName: "",
      dialogFormVisible: false,
      nowIndex: -1,
      initFormData: {},
    };
  },
  methods: {
    // 表格
    handleClick(tab, event) {
      console.log(tab, event);
    },
    openDialog(row) {
      if (row) {
        console.log(row, "传来的");
        (this.activeName = "first"), (this.dialogFormVisible = true); // 让弹窗显示
        //操作  员工   根据负责人对应的部门 的id 查找同部门的人员  赋值到 tableData1 中
        let data = { records: [{ departmentId: row.id }] };
        data.current = 1;
        data.size = 99999;
        // 查人员
        queryEmployeeManual(data).then((res) => {
          if (res && res.code && res.code === "00000") {
            console.log(res.data.records, "查人员*---------------------");
            this.departmentTabledata = res.data.records;
          }
        });
        // 查项目
        queryProject(data).then((res) => {
          if (res && res.code && res.code === "00000") {
            console.log(res.data.records, "查项目*---------------------");
            this.projectTabledata = res.data.records;
          }
        });
        //操作  项目   根据负责人对应的部门 的id 查找同部门的项目  赋值到 tableData2 中

        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(this.initFormData); // 为表单赋值
        });
      }
    },
    initForm(data) {
      Object.keys(this.initFormData).forEach((item) => {
        this.initFormData[item] = data[item] ? data[item] : null;
      });
    },
    closeDialog() {
      this.resetFormData(); // 初始化弹窗数据 重置 包含头像信息等
      this.resetForm("userEditRef"); // 重置表单
    },
    // 确定
    dialogClose() {
      this.dialogFormVisible = false;
      console.log(this.initFormData, "确定231确定3131");
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.initFormData);
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