<template>
  <div class="users_content">
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
          <el-col :span="8">
            <el-form-item label="用户名称">
              <el-input
                v-model="formOptions.username"
                placeholder="用户名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机">
              <el-input
                v-model="formOptions.userPhone"
                placeholder="手机号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否可用" required>
              <el-select v-model="formOptions.enabled" placeholder="请选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号是否未被锁定" required>
              <el-select
                v-model="formOptions.accountNonLocked"
                placeholder="请选择"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号是否未过期" required>
              <el-select
                v-model="formOptions.accountNonExpired"
                placeholder="请选择"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="24"
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
              <el-button type="primary" icon="el-icon-edit" @click="addClick"
                >新增</el-button
              >
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
        height="380"
      >
        <el-table-column type="selection" width="55" fixed> </el-table-column>
        <el-table-column label="序号" type="index" width="55" fixed>
        </el-table-column>
        <el-table-column
          prop="id"
          label="标识"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userNickName"
          label="昵称"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="邮箱"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="accountNonExpired"
          label="账户是否未过期"
          min-width="135"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.accountNonExpired ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column
          prop="accountNonLocked"
          label="账户是否未被锁定"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.accountNonLocked ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="账户是否可用"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.enabled ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
          show-overflow-tooltip
          min-width="120"
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
        <el-table-column fixed="right" label="操作" min-width="140">
          <template slot-scope="{ row, $index }">
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationOptions.pageNo"
        :page-sizes="paginationOptions.pageSizes"
        :page-size="paginationOptions.pageSize"
        :layout="paginationOptions.loyout"
        background
        :total="paginationOptions.total"
        size="mini"
      >
      </el-pagination>
    </el-card>
    <user-edit-dialog
      :toChild="list"
      ref="userEditDialogRef"
    ></user-edit-dialog>
  </div>
</template>

<script>
import { queryUser, deleteMenu } from "@/api/user";
import UserEditDialog from "@/views/sysmanage/users/dialog/userEdit.vue";
export default {
  components: {
    UserEditDialog,
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
      multipleSelection: [],
    };
  },
  mounted() {
    this.queryUserList();
  },
  methods: {
    // 查询用户列表
    queryUserList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          console.log(valid, "validvalidvalid");
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "datadatadatadata");
          queryUser(data).then((res) => {
            console.log(res, "resresresres");
            if (res && res.code && res.code === "00000") {
              this.resetForm("userQueryRef"); // 重置表单
              this.tableData = res.data.records; // 表格数据赋值
              this.paginationOptions.total = res.data.pages; // 分页器赋值
              console.log(res.data, "0000");
            }
          });
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$alert("此操作将永久删除该文件, 是否继续?", "删除菜单", {
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 点击确认，发起后台请求，删除该用户
          deleteMenu(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除该用户");
            // if (res.data.meta.status == 200) {
            //   return this.$message({
            //     type: "success",
            //     message: "删除成功!",
            //   });
            // } else {
            //   this.$message({
            //     type: "success",
            //     message: "删除失败!",
            //   });
            // }
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
      this.list = "添加";
      console.log("我要添加");
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑";
      console.log("编辑", row, row.id);
    },
    // 重置表单
    resetForm(formName) {
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
  },
};
</script>

<style scoped lang="less">
@deep: ~">>>";
// 表单样式
.el-col {
  .el-form-item {
    width: 100%;
  }
  @{deep} .el-form-item__label {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  @{deep} .el-form-item__content {
    width: calc(100% - 120px);
    > div {
      width: 100%;
    }
  }
}
// 表单操作按钮区域样式
.inline1_action_button_content {
  @{deep} .el-form-item__content {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
.inline2_action_button_content {
  width: 66.6%;
  @{deep} .el-form-item__content {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
.nextline_action_button_content {
  width: 100%;
  @{deep} .el-form-item__content {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
@{deep} .el-pagination {
  margin: 10px 0;
}
@{deep} .el-form-item--mini {
  display: flex;
}
@{deep} .el-form-item__label {
  width: 140px;
}
::v-deep .el-message-box__btns .el-button{
  background-color: black!important;
}
</style>