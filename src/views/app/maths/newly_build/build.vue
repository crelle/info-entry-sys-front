<template>
  <div>
    <!-- @close="closeDialog" -->
    <el-dialog :title="toChild" :visible.sync="dialogFormVisible" lock-scroll>
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <!-- 基础信息: 员工编号 性别 头像 URL 员工姓名 <br/>
              职业信息:直属上级 员工部门 职位<br/>
              联系方式:手机号 微信 QQ 邮箱 -->
              <el-form
                ref="searchForm"
                :rules="rules"
                :model="searchForm"
                label-width="80px"
              >
                <el-form-item label="员工姓名" prop="name">
                  <el-input
                    v-model="searchForm.name"
                    placeholder="请输入姓名..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="员工性别" prop="resource">
                  <el-radio-group v-model="searchForm.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="生日" prop="date0">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="searchForm.date0"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="员工区域" prop="region">
                  <el-select
                    v-model="searchForm.region"
                    placeholder="请选择员工区域"
                  >
                    <el-option label="上海区" value="上海区"></el-option>
                    <el-option label="北京区" value="北京区"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="员工项目" prop="region">
                  <el-select
                    v-model="searchForm.region"
                    placeholder="请选择员工项目"
                  >
                    <el-option label="xxx项目" value="xxx项目"></el-option>
                    <el-option label="yyy项目" value="yyy项目"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="员工所属部门" prop="region">
                  <el-select
                    v-model="searchForm.region"
                    placeholder="请选择员工所属部门"
                  >
                    <el-option label="xxx部门" value="xxx部门"></el-option>
                    <el-option label="yyy部门" value="yyy部门"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入职时间" prop="date1">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="searchForm.date1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">一</el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2">
                      <el-time-picker
                        placeholder="选择时间"
                        v-model="searchForm.date2"
                        style="width: 100%"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="员工状态" prop="delivery">
                  <el-switch v-model="searchForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="员工技能" prop="type">
                  <el-checkbox-group v-model="searchForm.type">
                    <el-checkbox label="web员工" name="type"></el-checkbox>
                    <el-checkbox label="Java员工" name="type"></el-checkbox>
                    <el-checkbox label="测试员工" name="type"></el-checkbox>
                    <el-checkbox label="ul员工" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="员工简介" prop="desc">
                  <el-input
                    type="textarea"
                    v-model="searchForm.desc"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" size="mini" @click="onSubmit('searchForm')"
          >确认</el-button
        >

        <el-button type="primary" size="mini" @click="resetForm('searchForm')"
          >重置</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { BaseURL } from "@/api/config";
import { modifyTheMenu, createMenu } from "@/api/menu";
import LoginVue from "../../../Login.vue";
export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      // 表单
      searchForm: {
        name: "",
        region: "",
        date0: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择员工所在区域", trigger: "change" },
        ],
        date0: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个员工技能",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择员工性别", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写员工简历", trigger: "blur" }],
      },
      // 表单
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      nowIndex: -1,
      baseURL: BaseURL,
      userEditForm: {},
      initFormData: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        userAvatar: "",
        iconCls: "",
        url: "",
        path: "",
        name: "",
        id: "",
        requireAuth: "",
      },
      defaultImgs: [
        "https://img0.baidu.com/it/u=1735274212,3352382534&fm=253&app=138&size=w931&n=0&f=JPG&fmt=auto?sec=1664298000&t=d809891ec3771145c813cf90875fc576",
      ],
      userEditFormRules: {},
    };
  },
  methods: {
    onSubmit(searchForm) {
      console.log("增加了...");
      console.log(this.searchForm);
      this.$refs[searchForm].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    openDialog(row) {
      this.dialogFormVisible = true; // 让弹窗显示
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
        });
      } else {
        console.log("我是新增");
        this.initForm("");
      }
    },
    initForm(data) {
      Object.keys(this.initFormData).forEach((item) => {
        this.initFormData[item] = data[item] ? data[item] : null;
      });
    },
    // closeDialog() {
    //   this.resetForm("userEditRef"); // 重置表单
    //   this.resetFormData(); // 初始化弹窗数据 重置 等
    // },
    dialogClose() {
      this.dialogFormVisible = false;
      //   this.resetFormData();
    },
    // 重置表单
    resetForm(searchForm) {
      this.$refs[searchForm].resetFields(); //重置表单数据
    },
    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
      this.nowIndex = -1; // 重置选中
    },
  },
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
@{deep} .register_form_main {
  position: relative;
  min-width: 40%;
  overflow: hidden;
  > span {
    display: block;
    text-align: center;
    font-size: 24px;
    font-weight: 500px;
    padding: 20px 0;
    color: #409eff;
    background-color: #383f49;
    text-shadow: 0 1px -3px #409eff;
  }
  .grid-content-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    .avatar-uploader .el-upload {
      border: 1px dashed #8c939d;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
    .demo-image__lazy {
      height: 88px;
      .el-image {
        width: 80px;
        height: 80px;
        border: 1px solid #eee;
        margin: 2px;
      }
      .default_img_chioce {
        &::before {
          width: 80px;
          height: 80px;
          background-color: rgba(139, 197, 252, 0.5);
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          content: "已选";
          color: #409eff;
          font-size: 12px;
        }
      }
    }
  }
}
.el-form {
  padding: 10px 20px;
  .el-input-group__append {
    padding: 0 2px;
  }
}
@{deep} .el-input-group__prepend {
  width: 85px;
}
.title {
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
}
.line {
  text-align: center;
}
</style>