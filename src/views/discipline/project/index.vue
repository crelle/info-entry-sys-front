<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :model="formOptions"
        class="demo-form-inline"
        size="mini"
        ref="userQueryRef"
        label-position="right"
        label-width="auto"
      >
        <el-row>
          <el-col :span="4">
            <el-form-item label="项目名称">
              <el-input
                v-model="formOptions.project"
                placeholder="项目名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户">
              <el-select
                v-model="formOptions.customer"
                placeholder="请选择客户名称"
                clearable
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
          <el-col :span="4">
            <el-form-item label="地域">
              <el-select
                v-model="formOptions.region"
                placeholder="请选择地域"
                clearable
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
          <el-col :span="4">
            <el-form-item label="接口人">
              <el-select
                v-model="formOptions.name"
                placeholder="请选择接口人姓名"
                clearable
                filterable
              >
                <el-option
                  v-for="(item, index) in Interface"
                  :key="item.index"
                  :label="item.name"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="项目状态">
              <el-select
                v-model="formOptions.status"
                clearable
                placeholder="请选择"
              >
                <el-option label="前期" value="1"></el-option>
                <el-option label="开发中" value="2"></el-option>
                <el-option label="交付中" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="btn">
            <el-form-item>
              <el-button type="primary" @click="queryUserList">查询</el-button>
              <el-button type="primary" @click="addClick">新增</el-button>
              <!-- <el-button @click="resetForm('formOptions')">重置</el-button> -->
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
        @selection-change="handleSelectionChange"
        border
        stripe
        size="mini"
        height="550"
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
          prop="project"
          label="项目名称"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="接口人"
          min-width="80"
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
          prop="email"
          label="邮箱"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="项目状态"
          show-overflow-tooltip
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="customer"
          label="客户"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="department"
          label="所属部门"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="210">
          <template slot-scope="{ row, $index }">
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
      :Interface="Interface"
      :MockUser="MockUser"
      :Users="Users"
      ref="userEditDialogRef"
    ></user-edit-dialog>
    <user-dait-dialog
      :toChild="list"
      ref="userDaitDialogRef"
    ></user-dait-dialog>
  </div>
</template>

<script>
// 假的项目表/接口人表/地域/部门
import {
  reqProject,
  reqgetInterface,
  reqMockUser,
  reqUsers,
  reqCustomer,
} from "@/mockjs/reqMock";
// 客户查询
import { queryCustomer } from "@/api/customer";
// 地域
import { queryRegion } from "@/api/region";
// 项目
import { queryProject, deletesProject } from "@/api/project";

import { queryUser, deleteMenu } from "@/api/user";
import UserEditDialog from "@/views/discipline/project/dialog/userEdit.vue";
import UserDaitDialog from "@/views/discipline/project/dialog/userDetails.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
  },
  data() {
    return {
      xmzt: "",
      list: "",
      formOptions: {
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
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      tableData: [],
      Interface: [],
      MockUser: [],
      Users: [],
      multipleSelection: [],
      tableCustomer: [],
    };
  },
  mounted() {
    this.queryUserList();
    this.queryMockUser();
    this.queryUsers();
    this.queryCustomerList();
  },
  methods: {
    // 查询客户列表 假的
    queryCustomerList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          queryCustomer(data).then((res) => {
            this.tableCustomer = res.data.records; // 表格数据赋值
            console.log(this.tableCustomer, "----------客户数据表-------");
          });
        } else {
          return false;
        }
      });
    },
    //  假数据部门查询方法
    queryUsers() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          reqUsers(data).then((res) => {
            this.Users = res.data; // 表格数据赋值
            console.log(this.Users, "-------假部门数据-------");
          });
        } else {
          return false;
        }
      });
    },
    //  假数据地域查询方法
    queryMockUser() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          queryRegion(data).then((res) => {
            this.MockUser = res.data.records; // 表格数据赋值
            console.log(this.MockUser, "-------假地域数据-------");
          });
        } else {
          return false;
        }
      });
    },
    //  假数据拿取查询方法
    queryUserList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          // 项目表格数据
          queryProject(data).then((res) => {
            // let data = { records: [{ ...this.formOptions }] };
            // data.current = this.paginationOptions.pageNo;
            // data.size = this.paginationOptions.pageSize;
            // //  假数据接口人查询方法
            reqgetInterface(data).then((res1) => {
              // 部门表格数据
              reqUsers(data).then((res2) => {
                this.Users = res2.data; // 部门表格数据赋值
                this.Interface = res1.data; // 接口人表格数据赋值
                this.tableData = res.data.records; // 项目表格数据赋值
                console.log(this.Users, "部门表格数据");
                console.log(this.Interface, "接口人表格数据");
                console.log(this.tableData, "项目表格数据");
                this.tableData.forEach((item) => {
                  if (item.status == 1) {
                    item.status = "前期";
                  }
                  if (item.status == 2) {
                    item.status = "开发中";
                  }
                  if (item.status == 3) {
                    item.status = "交付中";
                  }
                  this.Interface.forEach((sitem) => {
                    if (item.interfaceId == sitem.interfaceId) {
                      item.name = sitem.name;
                      item.cellPhone = sitem.cellPhone;
                      item.email = sitem.email;
                      item.customer = sitem.customer;
                    }
                  });
                  this.Users.forEach((sitem) => {
                    if (item.departmentId == sitem.departmentId) {
                      item.department = sitem.department;
                    }
                  });
                });
                this.paginationOptions.total = res.data.total; // 分页器赋值
              });
            });
          });
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "删除项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          console.log(row, "删除--------");
          // 点击确认，发起后台请求，删除该用户
          deletesProject(row.projectId).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
              this.queryUserList();
              return this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.queryUserList();
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
      this.list = "添加项目";
      console.log("我要添加");
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑项目信息";
      console.log("编辑-------", row.postId);
    },
    // 详情
    detailsClick(row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看项目详情";
      console.log("详情", row, row.postId);
    },
    // 重置表单

    // 表格复选动作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页器 页容量变更行为
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
      this.queryUserList();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryUserList();
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
.btn {
  ::v-deep .el-form-item__content {
    margin-left: 40px !important;
    min-width: 131px;
  }
}
.el-breadcrumb {
  margin-bottom: 25px;
}
::v-deep .cell {
  text-align: center;
   line-height: 36.9px;
}
::v-deep .el-form-item__content{
  text-align: right;

}
::v-deep .el-pagination {
  margin: 10px 0;
}
::v-deep .el-form-item{
  margin-bottom: 0;
}
::v-deep .el-col-4{
  padding-right:40px;
}
::v-deep .btn{
    padding-right:0 !important;
}
</style>
