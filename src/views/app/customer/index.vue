<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-container">
      <el-card :body-style="{ paddingTop: '60px', paddingBottom: '0px' }">
        <el-form
          :inline="true"
          :model="formOptions"
          class="demo-form-inline"
          size="mini"
          ref="customQueryRef"
          label-position="right"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="客户" prop="name">
                <el-input
                  v-model="formOptions.name"
                  placeholder="请填写客户名称"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="地域" prop="regionId">
                <el-select
                  v-model="formOptions.regionId"
                  placeholder="请选择地域名称"
                  clearable
                  filterable
                >
                <el-option v-for="(item,i) in $dictionaryList('区域')" :key="i" :label="item.name" :value="item.code=='true'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="负责人" prop="userId" >
                <el-select
                  v-model="formOptions.userId"
                  placeholder="请选择负责人名称"
                  clearable
                  filterable
                  @focus="queryUserList"
                >
                  <el-option
                    v-for="item in UserList"
                    :key="item.index"
                    :label="item.userNickName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="9"
              :class="
                Object.keys(formOptions).length % 3 === 0
                  ? 'nextline_action_button_content'
                  : Object.keys(formOptions).length % 3 === 1
                  ? 'inline2_action_button_content'
                  : 'inline1_action_button_content'
              "
            >
              <el-form-item>
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="resetForm('customQueryRef')"
                  >重置</el-button
                >
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="queryCustomer"
                  >查询</el-button
                >
                <el-button class="header-btn" type="primary" @click="addClick"
                  >新增</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card >
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
          size="mini"
          :height="tableHeight"
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
            prop="name"
            label="客户"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="regionName"
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
            prop="userName"
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
          <el-table-column fixed="right" label="操作" min-width="210">
            <template slot-scope="{ row, $index }">
              <span
                class="operate-btn"
                @click="detailsClick(row)"
                type="primary"
                size="mini"
                >查看</span
              >
              <span
                class="operate-btn"
                @click="handleClick(row)"
                type="primary"
                size="mini"
                >编辑</span
              >
              <span
                class="operate-btn"
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
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationOptions.pageNo"
            :page-sizes="paginationOptions.pageSizes"
            :page-size="paginationOptions.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="paginationOptions.total"
            size="mini"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <User-edit-dialog
      :toChild="list"
      :UserList="UserList"
      :regionData="regionData"
      ref="userEditDialogRef"
    ></User-edit-dialog>
    <User-dait-dialog
      :toChild="list"
      ref="userDaitDialogRef"
    ></User-dait-dialog>
  </div>
</template>

<script>
// 客户查询
import { queryCustomer, deletesCustomer } from "@/api/customer";
// 地域
import { queryRegion } from "@/api/region";
// 用户
import { queryUser } from "@/api/user";
import UserEditDialog from "@/views/app/customer/dialog/userEdit.vue";
import UserDaitDialog from "@/views/app/customer/dialog/userDetails.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
  },
  data() {
    return {
      list: "",
      tableHeight: window.innerHeight >= 908 ? 550 : window.innerHeight - 418,
      formOptions: {
        regionId: "",
        name: "",
        userId: "",
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      // 地域
      regionData: [],
      // 用户
      UserList: [],
      // 验证
      rules: {},
      // 查用户全部
      userformOptions: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
      },
      // 全部地域
      regionalFormoptions: {},
    };
  },
  mounted() {
    this.queryCustomer();
  },
  methods: {
    // 手动 查询客户列表
    queryCustomer() {
      queryCustomer({
        current: this.paginationOptions.pageNo,
        size: this.paginationOptions.pageSize,
        records: [this.formOptions],
      }).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.tableData = res.data.records;
          this.paginationOptions.total = res.data.total;
        }
      });
    },
    // 全部地域查询
    queryRegion() {
      let data = { records: [{ ...this.regionalFormoptions }] };
      data.current = 1;
      data.size = 9999;
      queryRegion(data).then((res) => {
        console.log(res, "--------------地域----");
        if (res && res.code && res.code === "00000") {
          this.regionData = res.data.records;
        }
      });
    },
    // 全部用户/负责人列表
    queryUserList() {
      let data = { records: [{ ...this.userformOptions }] };
      data.current = 1;
      data.size = 9999;
      queryUser(data).then((res) => {
        console.log(res.data, "------------用户-----");
        if (res && res.code && res.code === "00000") {
          this.UserList = res.data.records;
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
        modal: false,
      })
        .then(() => {
          deletesCustomer(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
              this.queryCustomer();
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
      this.queryUserList();
      this.queryRegion();
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑客户信息";
      console.log("编辑", row);
      this.queryUserList();
      this.queryRegion();
    },
    // 详情
    detailsClick(row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看客户详情";
      console.log("详情", row);
    },
    // 重置表单
    resetForm(formName) {
      console.log("重置-------", formName);
      this.$refs[formName].resetFields();
      this.queryCustomer();
    },
    // 分页器 页容量变更行为
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
      this.queryCustomer();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryCustomer();
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
::v-deep .el-col-9 {
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
  width: 254px;
}
.demo-form-inline {
  // min-width: 1300px;
}
@media screen and (min-width: 1600px) {
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

