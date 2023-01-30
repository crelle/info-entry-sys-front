<template>
  <div class="menus_content">
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="mini"
        label-position="right"
        label-width="120px"
        ref="queryMenuRef"
        :model="formOptions"
      >
        <el-row>
          <div class="toptitle">员工</div>
          <el-col>
            <el-form-item>
              <el-button
                class="filter-item"
                style="margin-left: 10px"
                type="primary"
                icon="el-icon-plus"
                @click="addClick()"
              >
                添加
              </el-button>
            </el-form-item>
            <el-form-item label="是否可用">
              <el-select v-model="formOptions.enabled" placeholder="请选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryMenuslist">查询</el-button>
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
          label="员工工号"
          prop="id"
          min-width="120"
          fixed
        ></el-table-column>
        <el-table-column
          label="员工姓名"
          prop="name"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="员工性别"
          prop="url"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="员工部门"
          prop="path"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="直属上级"
          prop="component"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="所在项目"
          prop="iconCls"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="入职时间"
          prop="menuType"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="员工状态"
          prop="sort"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="是否可用"
          prop="enabled"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="是否需要鉴权"
          prop="requireAuth"
          min-width="120"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" min-width="280">
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-share"
              @click="jumpDetails(row, $index)"
              >详情</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleClick(row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
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
      >
      </el-pagination>
    </el-card>
    <user-edit-dialog
      :toChild="list"
      ref="menusEditDialogRef"
    ></user-edit-dialog>
  </div>
</template>

<script>
import { queryMenu, deleteMenu } from "@/api/menu";
import UserEditDialog from "@/views/discipline/maths/newly_build/build.vue";
export default {
  components: {
    UserEditDialog,
  },
  data() {
    return {
      tableData: [],
      list: "",
      dialogStatus: "",
      formOptions: {
        name: "",
        requireAuth: true,
        enabled: true,
      },
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
    this.queryMenus();
  },
  methods: {
    // 查询中
    queryMenuslist() {
      this.$refs["queryMenuRef"].validate((valid) => {
        if (valid) {
          let data = { condition: { ...this.formOptions } };
          data.pageNo = this.paginationOptions.pageNo;
          data.pageSize = this.paginationOptions.pageSize;
          queryMenu(data).then((res) => {
            console.log(res, "我是res");
            if (res && res.code && res.code === "00000") {
              this.resetForm("queryMenuRef"); // 重置表单
              this.tableData = res.data.content; // 表格数据赋值
              console.log(this.tableData, "我是tableData");
              this.paginationOptions.total = res.data.totalElements; // 分页器赋值
            }
          });
        } else {
          return false;
        }
      });
    },
    queryMenus() {
      this.$refs["queryMenuRef"].validate((valid) => {
        if (valid) {
          let data = { condition: { ...this.formOptions } };
          data.pageNo = this.paginationOptions.pageNo;
          data.pageSize = this.paginationOptions.pageSize;
          queryMenu(data).then((res) => {
            console.log(res, "我是res");
            if (res && res.code && res.code === "00000") {
              this.resetForm("queryMenuRef"); // 重置表单
              this.tableData = res.data.content; // 表格数据赋值
              console.log(this.tableData, "我是tableData");
              this.paginationOptions.total = res.data.totalElements; // 分页器赋值
            }
          });
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "删除菜单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 点击确认，发起后台请求，删除该用户
          // deleteMenu(row.id).then((res) => {
          //   console.log(res, "点击确认，发起后台请求，删除该用户");
          //   if (res.data.meta.status == 200) {
          //     return this.$message({
          //       type: "success",
          //       message: "删除成功!",
          //     });
          //   } else {
          //     this.$message({
          //       type: "success",
          //       message: "删除失败!",
          //     });
          //   }
          // });
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
      this.$refs.menusEditDialogRef.openDialog();
      this.list = "添加";
      console.log("我要添加");
    },
    // 编辑&
    handleClick(row) {
      this.$refs.menusEditDialogRef.openDialog(row);
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
      this.queryMenus();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryMenus();
    },
    // 跳转详情页面
    jumpDetails(row) {
      console.log("详情页面", row);
      this.$router.push({ name: "details", query: { id: row.id } });

      window.sessionStorage.setItem("id", JSON.stringify(row));
    },
  },
};
</script>

<style lang="less" scoped>
.toptitle {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>>

