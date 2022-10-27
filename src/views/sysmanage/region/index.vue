<template>
  <div class="roles_content">
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="mini"
        label-position="right"
        label-width="120px"
        ref="queryRoleRef"
        :model="formOptions"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="地域编码">
              <el-input
                v-model="formOptions.name"
                placeholder="地域编码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地域名称">
              <el-input
                v-model="formOptions.nameZh"
                placeholder="地域名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :class="
              Object.keys(formOptions).length % 3 === 0
                ? 'nextline_action_button_content'
                : Object.keys(formOptions).length % 3 === 1
                ? 'inline2_action_button_content'
                : 'inline1_action_button_content'
            "
          >
            <el-form-item>
              <el-button type="primary" @click="queryRoles">查询</el-button>
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
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="55"
          fixed
        ></el-table-column>
        <el-table-column
          label="地域名称"
          prop="nameZh"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="地域编码"
          prop="name"
          min-width="120"
          fixed
        ></el-table-column>
        <el-table-column label="操作" min-width="120" fixed>
          <template slot-scope="{ row, $index }">
            <el-button @click="lookClick(row)" type="primary" size="mini"
              >查看</el-button
            >
            <el-button @click="onEditRole(row)" type="primary" size="mini"
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
    <role-edit-dialog
      :toChild="list"
      ref="roleEditDialogRef"
    ></role-edit-dialog>
    <role-data-dialog
      :toChild="list"
      ref="roleDataDialogRef"
    ></role-data-dialog>
  </div>
</template>

<script>
import { queryRole, deleteRole } from "@/api/role";
import RoleEditDialog from "@/views/sysmanage/region/dialog/dialogEdit.vue";
import RoleDataDialog from "@/views/sysmanage/region/dialog/dialogDetails.vue";
export default {
  components: {
    RoleEditDialog,
    RoleDataDialog
  },
  data() {
    return {
      list: "",
      formOptions: {
        name: "",
        nameZh: "",
      },
      tableData: [],
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
      },
    };
  },
  mounted() {
    this.queryRoles();
  },
  methods: {
    // 查询
    queryRoles() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          queryRole(data).then((res) => {
            console.log(res, "res++++++++++");
            if (res && res.code && res.code === "00000") {
              this.resetForm("queryRoleRef"); // 重置表单
              this.tableData = res.data.records; // 表格数据赋值
              this.paginationOptions.total = res.data.total; // 分页器赋值
            }
          });
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$alert("此操作将永久删除该文件, 是否继续?", "删除", {
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该用户
          deleteRole(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
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
    // 查看
    lookClick(row) {
      this.$refs.roleDataDialogRef.openDialog(row);
      this.list = "查看";
      console.log("我要查看",row);
    },
    // 添加
    addClick() {
      this.$refs.roleEditDialogRef.openDialog();
      this.list = "添加";
      console.log("我要添加");
    },
    // 编辑
    onEditRole(row) {
      this.$refs.roleEditDialogRef.openDialog(row);
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
      this.queryRoles();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryRoles();
    },
  },
};
</script>

<style>
</style>
