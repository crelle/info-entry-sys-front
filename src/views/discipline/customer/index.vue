<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
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
            <el-form-item label="客户">
              <el-input
                v-model="formOptions.customerName"
                placeholder="请填写客户名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="地域">
              <el-select
                v-model="formOptions.regionId"
                placeholder="地域名称"
                clearable
                filterable
              >
                <el-option
                  v-for="item in regionData"
                  :key="item.index"
                  :label="item.regionName"
                  :value="item.regionName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="14"
            :class="
              Object.keys(formOptions).length % 3 === 0
                ? 'nextline_action_button_content'
                : Object.keys(formOptions).length % 3 === 1
                ? 'inline2_action_button_content'
                : 'inline1_action_button_content'
            "
          >
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
        <el-table-column label="序号" type="index" width="55" fixed>
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="客户"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="regionId"
          label="地域"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="办公地点"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userId"
          label="负责人"
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
        <el-table-column fixed="right" label="操作" min-width="140">
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
      :UserList="UserList"
      :regionData="regionData"
      ref="userEditDialogRef"
    ></user-edit-dialog>
    <user-dait-dialog
      :toChild="list"
      ref="userDaitDialogRef"
    ></user-dait-dialog>
  </div>
</template>

<script>
import { queryCustomer, deletesCustomer } from "@/api/customer";
import { queryRegion } from "@/api/region";
// 假的
import { reqMockUser, reqCustomer, reqUsers } from "@/mockjs/reqMock";

import { queryUser, deleteMenu } from "@/api/user";
import UserEditDialog from "@/views/discipline/customer/dialog/userEdit.vue";
import UserDaitDialog from "@/views/discipline/customer/dialog/userDetails.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
  },
  data() {
    return {
      list: "",
      formOptions: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        userPhone: "",
        username: "",
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
      },
      tableData: [],
      // 地域
      regionData: [],
      // 用户
      UserList: [],
      multipleSelection: [],
      userEditForm: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        password: "123456",
        userAvatar: "",
        userEmail: "",
        userNickName: "",
        userPhone: "",
        username: "",
      },
    };
  },
  mounted() {
    this.queryUserList();
    this.queryRoles();
    this.queryUser();
  },
  methods: {
    //  假数据拿取查询方法
    queryRoles() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          console.log(valid, "validvalidvalid");
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          queryRegion(data).then((res) => {
            console.log(res, "res++++++++++");
            this.regionData = res.data.records; // 表格数据赋值
            console.log(this.regionData, "假的地域数据");
          });
        } else {
          return false;
        }
      });
    },
    // 接口查询客户列表
    queryUserList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          console.log(valid, "validvalidvalid");
          let data = { records: [{ ...this.formOptions }] };
          data.pages = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          queryCustomer(data).then((res) => {
            console.log(res, "res++++++++++");

            this.tableData = res.data.records; // 表格数据赋值
            console.log(this.tableData, "客户数据");
            this.paginationOptions.total = res.data.total; // 分页器赋值
          });
        } else {
          return false;
        }
      });
    },
    // 真接口
    queryUser() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          console.log(valid, "validvalidvalid");
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          queryUser(data).then((res) => {
            console.log(res, "res++++++++++");
            if (res && res.code && res.code === "00000") {
              this.UserList = res.data.records; // 表格数据赋值
              console.log(this.UserList);
              // this.paginationOptions.total = res.data.total; // 分页器赋值
            }
          });
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该客户, 是否继续?", "删除客户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          console.log(row, "删除--------");
          // 点击确认，发起后台请求，删除该用户
          deletesCustomer(row.customerId).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
              this.queryRoles();
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
      this.list = "添加客户";
      console.log("我要添加");
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑客户信息";
      console.log("编辑", row, row.id);
    },
    // 详情
    detailsClick(row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看客户详情";
      console.log("详情", row, row.id);
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
  },
};
</script>
<style lang='less'>
.btn-custom-cancel {
  float: right;
  margin-left: 10px;
}
</style>
<style lang="less" scoped>
::v-deep .cell {
  text-align: center;
  line-height: 36.9px;
}
::v-deep .el-col-14 {
  text-align: right;
}
.el-form--inline .el-form-item {
  margin-right: 0;
}
::v-deep .el-card__body {
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
}
</style>
