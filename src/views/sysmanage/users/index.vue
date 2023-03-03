<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        :model="formOptions"
        class="demo-form-inline"
        size="mini"
        ref="userQueryRef"
        label-position="right"
        :rules="rules"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="formOptions.username"
                placeholder="请输入用户名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="手机号" prop="userPhone">
              <el-input
                v-model="formOptions.userPhone"
                placeholder="请输入用户手机号码"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态">
              <el-select
                v-model="formOptions.enabled"
                placeholder="请选择状态"
                prop="enabled"
              >
                <el-option label="启用" :value="true"></el-option>
                <el-option label="禁用" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="角色" prop="roles[0].id">
              <el-select
                v-model="formOptions.roles[0].id"
                placeholder="请选择角色"
                clearable
                filterable
              >
                <el-option
                  v-for="item in queryRoleData"
                  :key="item.index"
                  :label="item.nameZh"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="4"
            :class="
              Object.keys(formOptions).length % 3 === 0
                ? 'nextline_action_button_content'
                : Object.keys(formOptions).length % 3 === 1
                ? 'inline2_action_button_content'
                : 'inline1_action_button_content'
            "
          >
            <el-form-item>
              <el-button type="primary" @click="resetForm('userQueryRef')"
                >重置</el-button
              >
              <el-button type="primary" @click="queryUserListclick"
                >查询</el-button
              >
              <el-button type="primary" @click="addClick">新增</el-button>
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
        <!-- <el-table-column type="selection" width="55" fixed> </el-table-column> -->
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="55"
          fixed
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userNickName"
          label="姓名"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="jobNo"
          label="工号"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="邮箱"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.enabled ? "启用" : "禁用"
          }}</template>
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
          show-overflow-tooltip
          min-width="80"
        >
          <template slot-scope="scope">
            <el-tag
              type="primary"
              disable-transitions
              v-for="item in scope.row.roles"
              :key="item.id"
              >{{ item.nameZh }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="310">
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
            <el-button @click="resetpassword(row)" type="primary" size="mini"
              >重置密码</el-button
            >
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
      :queryRoleData="queryRoleData"
      ref="userEditDialogRef"
    ></user-edit-dialog>
    <user-dait-dialog
      :toChild="list"
      ref="userDaitDialogRef"
    ></user-dait-dialog>
  </div>
</template>

<script>
import { queryUser, deleteMenu, resetPassword } from "@/api/user";
import { queryRole } from "@/api/role";
import userEditDialog from "@/views/sysmanage/users/dialog/userEdit.vue";
import userDaitDialog from "@/views/sysmanage/users/dialog/userDetails.vue";
export default {
  components: {
    userEditDialog,
    userDaitDialog,
  },
  data() {
    return {
      // 权限
      quanxian: "",
      list: "",
      formOptions: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        userPhone: "",
        username: "",
        jobNo: "",
        roles: [
          {
            id: "",
            name: "",
            nameZh: "",
          },
        ],
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      queryRoleData: [],
      tableData: [],
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
        roles: "",
      },
      // 验证
      rules: {},
    };
  },
  mounted() {
    this.queryUserList();
    // this.queryRoleList();
  },
  methods: {
    //手动 查询用户列表
    queryUserListclick() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          this.paginationOptions.pageNo = 1;
          this.queryUserList();
        } else {
          return false;
        }
      });
    },

    // 查询用户列表
    queryUserList() {
      console.log(this.formOptions.roles, "----------角色地=id---");
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          queryUser(data).then((res) => {
            data.current = 1;
            data.size = 999;
            // 查询角色列表;
            queryRole(data).then((res) => {
              if (res && res.code && res.code === "00000") {
                this.queryRoleData = res.data.records; // 表格数据赋值
                console.log(this.queryRoleData, "查询角色列表++++++");
              }
            });
            if (res && res.code && res.code === "00000") {
              this.tableData = res.data.records; // 表格数据赋值
              this.paginationOptions.total = res.data.total; // 分页器赋值
              console.log(this.tableData, "查询用户列表++++++");
              // 过滤掉管理员admin
              this.tableData.forEach((item, index) => {
                if (item.id == "e943a05d2204c5dfc244ef2ba21d9170") {
                  this.tableData.splice(index, 1);
                }
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 查询角色列表
    // queryRoleList() {
    //   this.$refs["userQueryRef"].validate((valid) => {
    //     if (valid) {
    //       let data = { records: [{ ...this.formOptions }] };
    //       data.current = 1;
    //       data.size = 999;
    //       queryRole(data).then((res) => {
    //         if (res && res.code && res.code === "00000") {
    //           this.queryRoleData = res.data.records; // 表格数据赋值
    //           console.log(this.queryRoleData, "查询角色列表++++++");
    //         }
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "删除用户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          // 点击确认，发起后台请求，删除该用户
          deleteMenu(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除该用户");
            if (res.code == "00000") {
              this.tableData.splice(index, 1);
              this.queryUserList();
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
    // 重置密码弹框
    resetpassword(row) {
      console.log(row, "-----重置密码弹框的数据");
      this.$confirm(
        "此操作将重置该用户的登录密码, 是否继续?",
        "重置用户登录密码",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "btn-custom-cancel",
          type: "warning",
        }
      )
        .then(() => {
          console.log(row, "---------row");
          let data = {};
          data.userId = row.id;
          // 点击确认，发起后台请求，
          console.log(data, "----重置密码传入的内容----");
          resetPassword(data, data.userId).then((res) => {
            console.log(res, "-------重置密码");
            // console.log(res, "点击确认，发起后台请求");
            // if (res.code == "00000") {
            //   return this.$message({
            //     type: "success",
            //     message: "重置密码成功! 初始密码为：[ 123456 ]",
            //   });
            // } else {
            //   this.$message({
            //     type: "success",
            //     message: "失败!",
            //   });
            // }
          });
        })
        .catch(() => {
          // 点击取消，取消该操作
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 添加
    addClick() {
      this.$refs.userEditDialogRef.openDialog();
      this.list = "添加用户";
      console.log("我要添加");
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑用户信息";
      console.log("编辑----", row);
    },
    // 详情
    detailsClick(row) {
      console.log("详情", row);
      this.list = "查看用户详情";
      this.$refs.userDaitDialogRef.openDialog(row);
    },
    // 重置表单
    resetForm(formName) {
      console.log("重置-------", formName);
      this.$refs[formName].resetFields();
    },
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
  padding-right: 25px;
}
.el-form-item {
  width: 261px;
}
::v-deep .el-col-5 {
  overflow: hidden;
}
.demo-form-inline {
  min-width: 1300px;
}
</style>
