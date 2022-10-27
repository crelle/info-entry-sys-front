<template>
  <div class="menus_content">
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
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
          <el-col>
            <el-form-item label="菜单名称">
              <el-input
                v-model="formOptions.name"
                placeholder="菜单名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否需要鉴权">
              <el-select v-model="formOptions.requireAuth" placeholder="请选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否可用">
              <el-select v-model="formOptions.enabled" placeholder="请选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryMenus">查询</el-button>
              <el-button
                class="filter-item"
                style="margin-left: 10px"
                type="primary"
                icon="el-icon-edit"
                @click="addClick()"
              >
                添加
              </el-button>
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
        <!-- <el-table-column
          label="菜单标识"
          prop="id"
          min-width="120"
          fixed
        ></el-table-column> -->
        <el-table-column
          label="菜单名称"
          prop="name"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="后台资源地址"
          prop="url"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="前台页面路径"
          prop="path"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="前台组件名称"
          prop="component"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="菜单图标"
          prop="iconLs"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="菜单类型"
          prop="parentId"
          min-width="80"
        ></el-table-column>
        <el-table-column
          label="菜单顺序"
          prop="menuSort"
          min-width="120"
        ></el-table-column>

        <el-table-column
          prop="enabled"
          label="是否可用"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.enabled ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column
          prop="requireAuth"
          label="是否需要鉴权"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.requireAuth ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="280">
          <template slot-scope="{ row, $index }">
            <el-button type="primary" size="small" icon="el-icon-share"
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
      ref="menusEditDialogRef"
    ></user-edit-dialog>
  </div>
</template>

<script>
import { queryMenu, deleteMenu } from "@/api/menu";
import UserEditDialog from "@/views/sysmanage/menus/dialog/menusEdit.vue";
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
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 40,
      },
    };
  },
  mounted() {
    this.queryMenus();
  },
  methods: {
    queryMenus() {
      this.$refs["queryMenuRef"].validate((valid) => {
        if (valid) {
          console.log(valid, "validvalidvalid");
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log("data---------", data);
          queryMenu(data).then((res) => {
            console.log(res, "res++++++++++");
            if (res && res.code && res.code === "00000") {
              this.resetForm("queryMenuRef"); // 重置表单
              this.tableData = res.data.records; // 表格数据赋值
              console.log(this.tableData, "我是tableData");
              console.log(res.data, " res.data.totalElements");
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
      this.$alert("此操作将永久删除该文件, 是否继续?", "删除菜单", {
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该用户
          deleteMenu(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除该用户");
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
      console.log(val, "分页的val");
      this.paginationOptions.pageSize = val;
      this.queryMenus();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryMenus();
    },
  },
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
@{deep}.el-message-box__btns{ 
  .el-button--small {
  background-color: aqua!important
  }
}
.el-card{
  margin-top: 25px;
}
</style>