<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        :model="formOptions"
        class="demo-form-inline"
        size="mini"
        ref="userQueryRef"
        label-position="right"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input
                class="namecss"
                v-model="formOptions.name"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="部门">
              <el-select
                v-model="formOptions.department"
                placeholder="请选择接部门"
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="地域">
              <el-select
                v-model="formOptions.region"
                placeholder="请选择接地域名称"
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="接口人">
              <el-select
                v-model="formOptions.Interface"
                placeholder="请选择接口人"
                filterable
              >
                <el-option
                  v-for="item in Interface"
                  :key="item.index"
                  :label="item.interfaceName"
                  :value="item.interfaceId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="btn">
            <el-form-item>
              <el-button type="primary" @click="queryUserList">查询</el-button>
              <el-button type="primary" @click="addClick">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="name">
          <el-col :span="5">
            <el-form-item label="客户">
              <el-select
                v-model="formOptions.customer"
                placeholder="请选择客户名称"
                filterable
              >
                <el-option
                  v-for="item in tableCustomer"
                  :key="item.index"
                  :label="item.customerName"
                  :value="item.customerId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="项目">
              <el-select
                v-model="formOptions.project"
                placeholder="请选择项目名称"
                filterable
              >
                <el-option
                  v-for="item in tableProject"
                  :key="item.index"
                  :label="item.project"
                  :value="item.projectId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="技能">
              <el-select v-model="formOptions.skill" placeholder="请选择技能">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="lab" label="状态">
              <el-select v-model="formOptions.state" placeholder="请选择">
                <el-option
                  v-for="item in state"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        size="mini"
        height="506"
      >
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="55"
          fixed
        >
        </el-table-column>
        <el-table-column
          prop="jobNo"
          label="工号"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="50"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="cellPhone"
          label="手机号"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="customer"
          label="地域"
          min-width="50"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="department"
          label="部门"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="project"
          label="项目"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="Interface"
          label="接口人"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- 员工状态 -->
        <el-table-column
          prop="employee_status"
          label="员工状态"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="278">
          <template slot-scope="{ row, $index }">
            <el-button @click="stateClick(row)" type="primary" size="mini"
              >状态</el-button
            >
            <el-button @click="detailsClick(row)" type="primary" size="mini"
              >查看</el-button
            >
            <el-button @click="handleClick(row)" type="primary" size="mini"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="deleteMenu(row, $index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!-- <span class="demonstration">完整功能</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationOptions.pageNo"
          :page-sizes="paginationOptions.pageSizes"
          :page-size="paginationOptions.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationOptions.total"
          size="mini"
        >
        </el-pagination>
      </div>
    </el-card>
    <user-edit-dialog
      :toChild="list"
      :tableData="tableData"
      :tableProject="tableProject"
      ref="userEditDialogRef"
    ></user-edit-dialog>
    <user-dait-dialog
      :toChild="list"
      ref="userDaitDialogRef"
    ></user-dait-dialog>
    <user-state-dialog
      :toChild="list"
      ref="userStateDialogRef"
    ></user-state-dialog>
  </div>
</template>

<script>
// // 假的员工表/项目表/地域/部门/接口人表/客户
// import {
//   reqMockUser,
//   reqUsers,
//   reqgetInterface,
//   reqCustomer,
// } from "@/mockjs/reqMock";
// 地域
import { queryRegion } from "@/api/region";
// 部门
import { queryDepartments } from "@/api/department";
// 接口人
import { queryInterface } from "@/api/interface";
// 客户
import { queryCustomer } from "@/api/customer";
// 项目
import { queryProject } from "@/api/project";
import { queryEmployee, deleteEmployee } from "@/api/employee";
import UserEditDialog from "@/views/biological/plants/dialog/userEdit.vue";
import UserDaitDialog from "@/views/biological/plants/dialog/userDetails.vue";
import UserStateDialog from "@/views/biological/plants/dialog/state.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
    UserStateDialog,
  },
  data() {
    return {
      state: [
        {
          value: "选项1",
          label: "在岸",
        },
        {
          value: "选项2",
          label: "派遣",
        },
        {
          value: "选项3",
          label: "出差",
        },
        {
          value: "选项4",
          label: "离职",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "C++",
        },
        {
          value: "选项2",
          label: "JAVA",
        },
        {
          value: "选项3",
          label: "WEB",
        },
        {
          value: "选项4",
          label: "UI",
        },
        {
          value: "选项5",
          label: "TEST",
        },
      ],
      value: "",
      label: "",
      //
      xmzt: "",
      list: "",
      formOptions: {
        name: "",
        department: "",
        region: "",
        Interface: "",
        customer: "",
        project: "",
        skill: "",
        state: "",
      },
      formClear: "",
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      tableProject: [],
      multipleSelection: [],
      Users: [],
      MockUser: [],
      Interface: [],
      tableCustomer: [],
    };
  },
  mounted() {
    this.formClear = JSON.parse(JSON.stringify(this.formOptions));
    this.queryTableList();
    this.queryProjectList();
    this.queryUsers();
    this.queryMockUser();
    this.queryInterface();
    this.queryCustomerList();
  },
  methods: {
    //table数据
    queryTableList() {
      let data = { records: [{ ...this.formOptions }] };
      data.current = this.paginationOptions.pageNo;
      data.size = this.paginationOptions.pageSize;
      queryEmployee(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.tableData = res.data.records; // 表格数据赋值
          this.paginationOptions.total = res.data.total; // 分页器赋值
        }
      });
    },
    resetForm() {
      this.paginationOptions.pageNo = 1;
      this.formOptions = JSON.parse(JSON.stringify(this.formClear));
    },
    queryProjectList() {
      queryProject({
        current: 1,
        size: 1000000,
        records: [
          {
            name: "",
            cellPhone: "",
            email: "",
            customer: "",
            cooperation: "",
            departmentId: "",
            interfaceId: "",
            introduce: "",
            project: "",
            regionId: "",
            status: "",
            time: "",
          },
        ],
      }).then((res) => {
        console.log(res, "queryProjectList");
      });
    },

    //  数据客户查询方法
    queryCustomerList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = 1;
          data.size = 999;
          queryCustomer(data).then((res) => {
            this.tableCustomer = res.data.records; // 客户表格数据赋值
          });
        } else {
          return false;
        }
      });
    },
    //  数据部门查询方法
    queryUsers() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = 1;
          data.size = 999;
          queryDepartments(data).then((res) => {
            this.Users = res.data.records; // 部门数据表格数据赋值
            // console.log(this.Users, "----------部门数据");
          });
        } else {
          return false;
        }
      });
    },
    //  数据地域查询方法
    queryMockUser() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = 1;
          data.size = 999;
          queryRegion(data).then((res) => {
            this.MockUser = res.data.records; // 地域数据表格数据赋值
          });
        } else {
          return false;
        }
      });
    },
    //  数据接口人查询方法
    queryInterface() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          queryInterface(data).then((res) => {
            this.Interface = res.data.records; // 接口人表格数据赋值
            // console.log(this.Interface, "---------接口人数据");
          });
        } else {
          return false;
        }
      });
    },

    // 项目表
    queryProjectList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = 1;
          data.size = 999;
          queryProject(data).then((res) => {
            this.tableProject = res.data.records; // 项目表格数据赋值
            console.log(this.tableProject, "---------项目数据表");
          });
        } else {
          return false;
        }
      });
    },

    queryUserList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          this.paginationOptions.pageNo = 1;
          this.queryTableList();
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "删除员工", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          // 点击确认，发起后台请求，删除该接口人
          deleteEmployee(row.jobNo).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.queryTableList();
              return this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "success",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          // 点击取消，取消该操作
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加
    addClick() {
      this.$refs.userEditDialogRef.openDialog();
      this.list = "添加员工";
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑员工信息";
      console.log("编辑", row, row.id);
    },
    // 状态
    stateClick(row) {
      this.$refs.userStateDialogRef.openDialog(row);
      this.list = "更新员工状态";
      console.log("详情", row, row.id);
    },
    // 详情
    detailsClick(row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看员工详情";
      console.log("详情", row, row.id);
    },

    // 分页器 页容量变更行为
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
      this.queryTableList();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryTableList();
    },
    indexMethod(index) {
      return (
        (this.paginationOptions.pageNo - 1) * this.paginationOptions.pageSize +
        index +
        1
      );
    },
  },
};
</script>
<style lang="less" scoped>
::v-deep .cell {
  text-align: center;
  line-height: 36.9px;
}
::v-deep .el-col-4 {
  text-align: right;
}
.el-form--inline .el-form-item {
  margin-right: 0;
}

@media screen and (min-width: 1700px) {
  ::v-deep .el-card__body::-webkit-scrollbar {
    display: none;
  }
}
::v-deep .el-card__body {
  overflow-x: scroll;

  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
}
.el-breadcrumb {
  margin-bottom: 25px;
}
::v-deep .el-pagination {
  margin: 10px 0;
}
::v-deep .el-form-item__label {
  margin-right: 5px;
  width: 54px;
  text-align: left;
}
.el-form-item {
  width: 253px;
}
::v-deep .el-col-5 {
  overflow: hidden;
}
.name {
  padding-top: 10px;
}
.namecss {
  width: 193.89px;
}
</style>
