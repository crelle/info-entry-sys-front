<template>
  <div class="roles_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>地域管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-container">
    <el-card :body-style="{paddingTop: '60px',paddingBottom: '0px'}">
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="mini"
        label-position="right"
        ref="queryRoleRef"
        :rules="rules"
        :model="formOptions"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="地域名称" prop="name">
              <el-input
                v-model="formOptions.name"
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
              <el-button class="header-btn" type="primary" @click="resetForm('queryRoleRef')"
                >重置</el-button
              >
              <el-button class="header-btn" type="primary" @click="queryRolesclick"
                >查询</el-button
              >
              <el-button class="header-btn" type="primary" @click="addClick">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card :body-style="{paddingBottom: '60px'}">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
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
          prop="name"
          min-width="100"
          fixed
        ></el-table-column>

        <el-table-column label="操作" min-width="210" fixed="right">
          <template slot-scope="{ row, $index }">
            <span class="operate-btn" @click="lookClick(row)" type="primary" size="mini"
              >查看</span
            >
            <span class="operate-btn" @click="onEditRole(row)" type="primary" size="mini"
              >编辑</span
            >
            <span class="operate-btn"
              type="primary"
              size="mini"
              @click="deleteMenu(row, $index)"
            >
              删除
            </span>
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
    </div>
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

import RoleEditDialog from "@/views/app/region/dialog/dialogEdit.vue";
import RoleDataDialog from "@/views/app/region/dialog/dialogDetails.vue";
export default {
  components: {
    RoleEditDialog,
    RoleDataDialog,
  },
  data() {
    return {
      list: "",
      formOptions: {
        id: "",
        name: "",
        code: "",
      },
      tableData: [],
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      // 验证
      rules: {
        name: [
          {
            required: false,
            message: "请输入地域名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
            trigger: "blur",
          },
          {
            pattern: /^([\u4E00-\u9FA5])*$/,
            message: "请输入中文名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.queryRoles();
  },
  methods: {
    // 手动 查询
    queryRolesclick() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          this.paginationOptions.pageNo = 1;
          this.queryRoles();
        } else {
          return false;
        }
      });
    },
    // 真的方法
    queryRoles() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, data.current, data.size, "data----xu-----");
          queryRegion(data).then((res) => {
            console.log(res, "res++++++++++");
            if (res && res.code && res.code === "00000") {
              // this.resetForm("queryRoleRef"); // 重置表单
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
        modal: false,
      })
        .then(() => {
          // 点击确认，发起后台请求，删除该用户
          deletesRegion(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
              this.queryRoles();
              this.tableData.splice(index, 1);
              return this.$message({
                type: "success",
                message: "删除成功!",
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
​
<style lang='less'>
// .btn-custom-cancel {
//   float: right;
//   margin-left: 10px;
// }
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
.el-form-item {
  width: 252px;
}
.demo-form-inline {
  // min-width: 500px;
}
@media screen and (min-width: 800px) {
  ::v-deep .el-card__body::-webkit-scrollbar {
    display: none;
  }
}
::v-deep .el-card__body {
  // overflow-x: scroll;

  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
}
</style>
