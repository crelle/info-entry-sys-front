<template>
  <div class="roles_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>地域管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="mini"
        label-position="right"
        ref="queryRoleRef"
        :model="formOptions"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="地域名称">
              <el-input
                v-model="formOptions.regionName"
                placeholder="请输入地域名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="19"
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
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="55"
          fixed
        ></el-table-column>
        <el-table-column
          label="地域名称"
          prop="regionName"
          min-width="100"
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
// 真的地域接口
import { queryRegion, deletesRegion } from "@/api/region";

import RoleEditDialog from "@/views/sysmanage/region/dialog/dialogEdit.vue";
import RoleDataDialog from "@/views/sysmanage/region/dialog/dialogDetails.vue";
export default {
  components: {
    RoleEditDialog,
    RoleDataDialog,
  },
  data() {
    return {
      list: "",
      formOptions: {
        regionName: "",
      },
      tableData: [],
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        
      },
    };
  },
  mounted() {
    this.queryRoles();
  },
  methods: {
    // // // //  假数据拿取查询方法
    // queryRoles() {
    //   this.$refs["queryRoleRef"].validate((valid) => {
    //     if (valid) {
    //       let data = { records: [{ ...this.formOptions }] };
    //       data.current = this.paginationOptions.pageNo;
    //       data.size = this.paginationOptions.pageSize;
    //       console.log(data, "data---------");
    //       reqMockUser(data).then((res) => {
    //         console.log(res, "res-假的****");
    //         this.resetForm("queryRoleRef"); // 重置表单
    //         this.tableData = res.data; // 表格数据赋值
    //         this.paginationOptions.total = 10; // 分页器赋值
    //         // this.paginationOptions.total = res.data.total; // 分页器赋值
    //         console.log(this.tableData, "假的tableData////");
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    // 真的方法
    queryRoles() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          queryRegion(data).then((res) => {
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
      this.$confirm("此操作将永久删除该地域, 是否继续?", "删除地域", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该用户
          deletesRegion(row.regionId).then((res) => {
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
    // 查看
    lookClick(row) {
      this.$refs.roleDataDialogRef.openDialog(row);
      this.list = "查看地域详情";
      console.log("我要查看", row);
    },
    // 添加
    addClick() {
      this.$refs.roleEditDialogRef.openDialog();
      this.list = "添加地域";
      console.log("我要添加");
    },
    // 编辑
    onEditRole(row) {
      this.$refs.roleEditDialogRef.openDialog(row);
      this.list = "修改地域信息";
      console.log("编辑", row, row.regionId);
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
    indexMethod(index){
      return (this.paginationOptions.pageNo-1)*this.paginationOptions.pageSize+index+1
    }
  },
};
</script>
​
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
::v-deep .el-col-19 {
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
.el-form-item{
  width: 251px;
}
</style>
