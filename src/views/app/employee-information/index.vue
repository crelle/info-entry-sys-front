<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工信息</el-breadcrumb-item>
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
            <el-form-item label="姓名" prop="name">
              <el-input
                class="namecss"
                v-model="formOptions.name"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="部门" prop="department">
              <el-select
                v-model="formOptions.department"
                placeholder="请选择接部门"
                clearable
                filterable
              >
                <el-option
                  v-for="item in UsersHeader"
                  :key="item.index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="地域" prop="regionName">
              <el-select
                v-model="formOptions.regionName"
                placeholder="请选择接地域名称"
                clearable
                filterable
              >
                <el-option
                  v-for="item in RegionNameHeader"
                  :key="item.index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="资产编号" prop="interfaceName">
              <el-input
                class="namecss"
                v-model="formOptions.interfaceName"
                placeholder="请输入资产编号--等待实现..."
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="btn" style="display: flex; float: right">
            <el-form-item>
              <el-button
                type="primary"
                size="mini"
                style="width: 80px"
                @click="resetForm('userQueryRef')"
                >重置</el-button
              >
              <el-button
                type="primary"
                size="mini"
                style="width: 80px"
                @click="queryUserList"
                >查询</el-button
              >
              <el-button
                type="primary"
                size="mini"
                style="width: 80px"
                @click="addClick"
                >新增</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="name">
          <el-col :span="5">
            <el-form-item label="客户" prop="customerName">
              <el-select
                v-model="formOptions.customerName"
                placeholder="请选择客户名称"
                clearable
                filterable
              >
                <el-option
                  v-for="item in CustomerNameHeader"
                  :key="item.index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="项目" prop="project">
              <el-select
                v-model="formOptions.project"
                placeholder="请选择项目名称"
                clearable
                filterable
              >
                <el-option
                  v-for="item in ProjectNameHeader"
                  :key="item.index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="岗位" prop="postName">
              <el-select
                v-model="formOptions.postName"
                placeholder="请选择岗位"
                clearable
                filterable
              >
                <el-option
                  v-for="item in PostNameHeader"
                  :key="item.value"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="lab" label="状态" prop="status">
              <el-select
                v-model="formOptions.status"
                placeholder="请选择"
                clearable
                filterable
              >
                <el-option
                  v-for="item in StatusNameHeader"
                  :key="item.value"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="4"
            class="btn"
            style="display: flex; float: right; height: 28px"
          >
            <el-button type="primary" size="mini" @click="downloadTemplate()"
              >下载模板</el-button
            >
            <el-button type="primary" size="mini" @click="downloadApi()"
              >批量导出</el-button
            >
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="7"
              ref="enclosureUpload"
              :file-list="fileList"
              accept=".xlsx"
              :headers="tokens"
              :multiple="true"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleFileChange"
              :on-success="enclosureHandleSuccess"
              :on-exceed="handleExceed"
              :before-upload="handlebeforeUpload"
              style="margin-left: 10px"
            >
              <el-button
                type="primary"
                size="small"
                class="btn"
                style="width: 80px; padding: 7px 15px"
                @click="uploadmore"
              >
                批量导入
              </el-button>
            </el-upload>
            <el-form-item> </el-form-item>
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
        border
        stripe
        size="mini"
        height="506"
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
          prop="jobNo"
          label="工号"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="50"
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
          prop="regionName"
          label="地域"
          min-width="50"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="department"
          label="部门"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="project"
          label="项目"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="interfaceName"
          label="接口人"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- 员工状态 -->
        <el-table-column prop="status" label="员工状态" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="postName"
          label="岗位"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="278">
          <template slot-scope="{ row, $index }">
            <el-button @click="stateClick(row)" type="primary" size="mini"
              >状态</el-button
            >
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
      :tableProject="tableProject"
      :Users="Users"
      :Interface="Interface"
      :tableCustomer="tableCustomer"
      :tableyPost="tableyPost"
      :MockUser="MockUser"
      ref="userEditDialogRef"
    ></user-edit-dialog>
    <user-details-dialog
      :toChild="list"
      ref="UserDetailsDialogRef"
    ></user-details-dialog>
    <user-state-dialog
      :toChild="list"
      ref="userStateDialogRef"
    ></user-state-dialog>
  </div>
</template>

<script>
// 字典查询
import { manualPage } from "@/api/dictionary";
// // 假的员工表/项目表/地域/部门/接口人表/客户
// import {
//   reqMockUser,
//   reqUsers,
//   reqgetInterface,
//   reqCustomer,
// } from "@/mockjs/reqMock";
// 地域
import { queryRegion } from "@/api/region";
// 部门
import { queryDepartments } from "@/api/department";
// 接口人
import { queryInterface } from "@/api/interface";
// 客户
import { queryCustomer } from "@/api/customer";
// 项目
import { queryProject } from "@/api/project";

// 员工 导入
import {
  uploadFile,
  uploadApi,
  downloadApi,
  downloadTemplate,
} from "@/api/employee"; //api 请求
import {
  queryEmployee,
  deleteEmployee,
  queryState,
  queryEmployeeManual,
} from "@/api/employee";
// 岗位
import { queryPost } from "@/api/post";
import UserEditDialog from "@/views/app/employee-information/dialog/userEdit.vue";
import UserDetailsDialog from "@/views/app/employee-information/dialog/userDetails.vue";
import UserStateDialog from "@/views/app/employee-information/dialog/state.vue";
export default {
  components: {
    UserEditDialog,
    UserDetailsDialog,
    UserStateDialog,
  },
  data() {
    return {
      // 字典
      dictionaryData: [],
      child: "",
      // 批量
      tokens: {
        Authorization: localStorage.getItem("token"),
      },
      uploadLoading: false,
      fileList: [],
      enclosureList: [],
      exportLoading: false,
      timer: null,
      // 搜索头数据全部
      searchHeaderData: "",
      // 手动查询员工
      employeeManual: [],
      status: [
        {
          value: "在岸",
          label: "在岸",
        },
        {
          value: "派遣",
          label: "派遣",
        },
        {
          value: "出差",
          label: "出差",
        },
        {
          value: "离职",
          label: "离职",
        },
      ],
      options: [
        {
          value: "C++",
          label: "C++",
        },
        {
          value: "JAVA",
          label: "JAVA",
        },
        {
          value: "WEB",
          label: "WEB",
        },
        {
          value: "UI",
          label: "UI",
        },
        {
          value: "TEST",
          label: "TEST",
        },
      ],
      value: "",
      label: "",
      //
      xmzt: "",
      list: "",
      formOptions: {
        name: "",
        department: "",
        region: "",
        interfaceName: "",
        regionName: "",
        project: "",
        skill: "",
        status: "",
      },
      formSon: {},
      formClear: "",
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      tableProject: [],
      multipleSelection: [],
      Users: [],
      MockUser: [],
      Interface: [],
      tableCustomer: [],
      tableyPost: [],
      // 验证
      rules: {},
      // ----头查
      // 部门
      UsersHeader: [],
      // 地域
      RegionNameHeader: [],
      // 接口人
      InterfaceNameHeader: [],
      // 客户
      CustomerNameHeader: [],
      // 项目
      ProjectNameHeader: [],
      // 岗位
      PostNameHeader: [],
      // 状态
      StatusNameHeader: [],
    };
  },
  mounted() {
    this.child = "",
    this.formClear = JSON.parse(JSON.stringify(this.formOptions));
    this.queryTableList();
    this.queryProjectList();
    this.querySearch();
    this.searchHeader();
  },
  methods: {
   
    // 下载模板
    downloadTemplate() {
      downloadTemplate().then((res) => {
        if (res.message == "成功") {
          this.$message.success(res.data);
        } else {
          this.$message.success("操作失败,请联系管理员");
        }
      });
    },
    // 下载员工(批量)
    downloadApi() {
      downloadApi().then((res) => {
        if (res.message == "成功") {
          this.$message.success(res.data);
        } else {
          this.$message.success("操作失败,请联系管理员");
        }
      });
    },
    // 批量
    uploadmore(v) {
      console.log("批量导入", v);
    },

    // 过滤重复
    filterRepetition(arr) {
      let arr1 = []; //存id
      let newArr = []; //存新数组
      for (let i in arr) {
        if (arr1.indexOf(arr[i].name) == -1) {
          arr1.push(arr[i].name);
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },

    handlebeforeUpload(file, fileList) {
      console.log("上传前", file, fileList);
    },

    // 修改 存放要上传的文件列表
    handleFileChange(file, fileList) {
      let arr = this.filterRepetition(fileList);
      // if (arr.length !== fileList.length) {
      //   this.$message("上传重复文件，已过滤重复文件");
      // }
      this.fileList = arr;
      // 上传文件后，自动把文件传给后台，这里做了一个防抖，等待500ms后在传给后台
      this.debounce(this.submitUpload, 500);
    },

    // element上传多个文件时，会把每个文件做个单独请求
    // 这里的方法是请求最后一次
    debounce(fn, waits) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        fn.apply(this, arguments); // 把参数传进去
      }, waits);
    },

    // 确定
    async submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.success("请上传文件");
        return;
      }

      this.uploadLoading = true;
      let formData = new FormData(); //  用FormData存放上传文件
      this.fileList.forEach((file) => {
        formData.append("file", file.raw); // file.raw
      });

      // 确定上传 把在上传列表里的文件 合并到formData里面传给后台
      let res = await uploadApi(formData);
      console.log("结果++++++++++;", res);
      if (res.message == "成功") {
        this.$message.success("导入成功");
      }
      this.queryTableList();
      this.resetsubmitUpload();

      if (res.isSuccess) {
        this.$message.success("上传成功");
        res.result = res.result || [];
        this.fileList = [];
        this.enclosureList = [];
        let arr = Object.prototype.toString.call(res.result);
        if (arr === "[object Array]") {
          this.enclosureList = res.result || [];
        }
        console.log("结果：------", arr);
      }

      this.uploadLoading = false;
    },

    // 移除文件
    async delIdlist(val) {
      let flag = await this.$confirm(`确定移除吗？`);
      if (flag === "confirm") {
        this.enclosureList = this.enclosureList.filter((res) => res !== val);
      }
    },

    // 重新上传
    resetsubmitUpload() {
      this.enclosureList = [];
      this.fileList = [];
    },

    // 清除记录
    async delUploadList() {
      let flag = await this.$confirm(`确定清除所有附件ID吗？`);
      if (flag === "confirm") {
        this.enclosureList = [];
        this.fileList = [];
      }
    },

    // 取消
    approveCancel() {
      this.fileList = [];
      this.approve_dialog = false;
    },

    // 删除时的钩子
    onFileRemove(file, fileList) {
      console.log("删除时钩子-fileList", fileList);
      this.fileList = fileList;
    },
    // 删除之前钩子
    beforeFileRemove(file, fileList) {
      let flag = this.$confirm(`确定移除 ${file.name}？`);
      return flag;
    },

    // 上传成功
    enclosureHandleSuccess(response, file, fileListile) {
      console.log("上传成功:", response, file, fileListile);
      this.uploadLoading = false;
    },

    // 上传失败
    enclosureHandleError(err, file, fileList) {
      this.$message({
        showClose: true,
        message: err,
        type: "error",
      });
      this.uploadLoading = false;
    },

    // 上传文件之前
    beforeUpload(file) {},

    // 导入
    handleExceed(files, fileList) {
      console.log("导入", files, fileList);
      this.$message.warning(
        `限制选择7个文件，本次选择了 ${files.length} 个文件`
      );
    },

    // 头部搜索
    searchHeader() {
      let data = { records: [{ ...this.formOptions }] };
      data.current = 1;
      data.size = 9999;
      // 清空头部预存数据重新赋值
      this.UsersHeader = [];
      this.RegionNameHeader = [];
      this.InterfaceNameHeader = [];
      this.CustomerNameHeader = [];
      this.ProjectNameHeader = [];
      this.PostNameHeader = [];
      this.StatusNameHeader = [];
      queryEmployeeManual(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.searchHeaderData = res.data.records; // 表格数据赋值
          this.searchHeaderData.forEach((item) => {
            console.log(item, "-------头部搜索数据----");
            // console.log(item.department, "-------头部搜索数据----");
            // 项目
            if (item.department != null) {
              this.UsersHeader.push(item.department);
            }
            // 地域
            if (item.regionName != null) {
              this.RegionNameHeader.push(item.regionName);
            }
            // 接口人
            if (item.interfaceName != null) {
              this.InterfaceNameHeader.push(item.interfaceName);
            }
            // 客户
            if (item.customerName != null) {
              this.CustomerNameHeader.push(item.customerName);
            }
            // 项目
            if (item.project != null) {
              this.ProjectNameHeader.push(item.project);
            }
            // 岗位
            if (item.postName != null) {
              this.PostNameHeader.push(item.postName);
            }
            // 状态
            if (item.status != null) {
              this.StatusNameHeader.push(item.status);
            }
          });
          this.UsersHeader = [...new Set(this.UsersHeader)];
          this.RegionNameHeader = [...new Set(this.RegionNameHeader)];
          this.InterfaceNameHeader = [...new Set(this.InterfaceNameHeader)];
          this.CustomerNameHeader = [...new Set(this.CustomerNameHeader)];
          this.ProjectNameHeader = [...new Set(this.ProjectNameHeader)];
          this.PostNameHeader = [...new Set(this.PostNameHeader)];
          this.StatusNameHeader = [...new Set(this.StatusNameHeader)];
          console.log(this.StatusNameHeader, "*----------*---查查");
        }
      });
    },
    //table数据
    queryTableList() {
      let data = { records: [{ ...this.formOptions }] };
      data.current = this.paginationOptions.pageNo;
      data.size = this.paginationOptions.pageSize;
      queryEmployeeManual(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.tableData = res.data.records; // 表格数据赋值
          console.log(this.tableData, "员工表格数据赋值============徐天奇");
          this.paginationOptions.total = res.data.total; // 分页器赋值
        }
      });
    },

    // 搜索查询
    querySearch() {
      let data = { records: [{ ...this.formSon }] };
      data.current = 1;
      data.size = 999;
      queryProject(data).then((res1) => {
        queryDepartments(data).then((res2) => {
          queryInterface(data).then((res3) => {
            queryRegion(data).then((res4) => {
              queryCustomer(data).then((res5) => {
                //  数据岗位查询方法
                queryPost(data).then((res6) => {
                  this.tableyPost = res6.data.records; // 岗位表格数据赋值
                  // console.log(this.tableyPost, "----------岗位数据");
                  this.tableProject = res1.data.records; // 项目表格数据赋值
                  this.Users = res2.data.records; // 部门数据表格数据赋值
                  this.Interface = res3.data.records; // 接口人表格数据赋值
                  this.MockUser = res4.data.records; // 地域数据表格数据赋值
                  this.tableCustomer = res5.data.records; // 客户表格数据赋值
                  // this.tableData.forEach((item) => {
                  //   if (item.status == null) {
                  //     item.status = "(当前状态未定义)";
                  //     this.$set(item, item.status, item.status);
                  //   }
                  //   if (item.postName == null) {
                  //     item.postName = "(当前岗位未确定)";
                  //     this.$set(item, item.postName, item.postName);
                  //   }
                  // });
                });
              });
            });
          });
        });
      });
    },

    // 搜索查询
    resetForm() {
      this.paginationOptions.pageNo = 1;
      this.formOptions = JSON.parse(JSON.stringify(this.formClear));
    },
    queryProjectList() {
      queryProject({
        current: 1,
        size: 1000000,
        records: [
          {
            name: "",
            cellPhone: "",
            email: "",
            regionName: "",
            cooperation: "",
            departmentId: "",
            interfaceId: "",
            introduce: "",
            project: "",
            regionId: "",
            status: "",
            time: "",
          },
        ],
      }).then((res) => {
        // console.log(res, "queryProjectList");
      });
    },

    queryUserList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          this.paginationOptions.pageNo = 1;
          this.queryTableList();
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "删除员工", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          // 点击确认，发起后台请求，删除该接口人
          deleteEmployee(row.id).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.queryTableList();
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
      this.list = "添加员工";
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑员工信息";
      console.log("编辑", row);
    },
    // 状态
    stateClick(row) {
      this.$refs.userStateDialogRef.openDialog(row);
      this.list = "更新员工状态";
      console.log("详情", row, row.id);
    },
    // 详情
    detailsClick(row) {
      this.$refs.UserDetailsDialogRef.openDialog(row);
      this.list = "查看员工详情";
      console.log("详情", row);
    },
    // 重置表单
    resetForm(formName) {
      console.log("重置-------", formName);
      this.$refs[formName].resetFields();
    },
    // 分页器 页容量变更行为
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
      this.queryTableList();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryTableList();
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
  // overflow-x: scroll;

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
  min-width: 68px;
  text-align: left;
}
::v-deep .el-col-5 {
  overflow: hidden;
}
.name {
  padding-top: 15px;
}
.namecss {
  width: 193.89px;
}
// ::v-deep .el-input__inner {
//   min-width: 193px;
// }
.demo-form-inline {
  // min-width: 1330px;
}
</style>
