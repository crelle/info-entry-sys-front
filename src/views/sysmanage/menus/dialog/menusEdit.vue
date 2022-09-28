<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form
                :model="initFormData"
                :rules="userEditFormRules"
                ref="userEditRef"
                size="mini"
              >
                <el-form-item label="" prop="id">
                  <el-input v-model="initFormData.id" placeholder="菜单标识"
                    ><i class="el-icon-user" slot="prepend"
                      >菜单标识</i
                    ></el-input
                  >
                </el-form-item>
                <el-form-item label="" prop="name">
                  <el-input v-model="initFormData.name" placeholder="菜单名称"
                    ><i class="el-icon-user" slot="prepend"
                      >菜单名称</i
                    ></el-input
                  >
                </el-form-item>
                <el-form-item label="" prop="url">
                  <el-input
                    type="text"
                    v-model="initFormData.url"
                    placeholder="后台资源地址"
                    ><i class="el-icon-magic-stick w125" slot="prepend"
                      >后台资源地址</i
                    ></el-input
                  >
                </el-form-item>
                <el-form-item label="" prop="path">
                  <el-input
                    type="tel"
                    v-model="initFormData.path"
                    placeholder="前台页面路径"
                    ><i class="el-icon-mobile-phone" slot="prepend"
                      >前台页面路径</i
                    ></el-input
                  >
                </el-form-item>
                <el-form-item label="" prop="iconCls">
                  <el-input
                    type="email"
                    v-model="initFormData.iconCls"
                    placeholder="菜单图标"
                    ><i class="el-icon-message" slot="prepend"
                      >菜单图标</i
                    ></el-input
                  >
                </el-form-item>
                <el-form-item
                  label="是否可用"
                  label-width="100px"
                  prop="enabled"
                >
                  <el-switch
                    v-model="initFormData.enabled"
                    active-text="可用"
                    inactive-text="不可用"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item
                  label="是否未被锁定"
                  label-width="100px"
                  prop="accountNonLocked"
                >
                  <el-switch
                    v-model="initFormData.accountNonLocked"
                    active-text="未锁定"
                    inactive-text="锁定"
                  ></el-switch>
                </el-form-item>
                <el-form-item
                  label="是否未过期"
                  label-width="100px"
                  prop="accountNonExpired"
                >
                  <el-switch
                    v-model="initFormData.accountNonExpired"
                    active-text="未过期"
                    inactive-text="已过期"
                  ></el-switch>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose" size="mini">取 消</el-button>
        <el-button @click="resetForm('userEditRef')" size="mini"
          >重置</el-button
        >
        <el-button type="primary" size="mini" @click="onCertain"
          >确认</el-button
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
      userEditFormRules: {
        name: [
          {
            required: true,
            message: "请填写菜单名称",
            trigger: ["blur"],
          },
          {
            min: 2,
            max: 10,
            message: "菜单名称长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],

        iconCls: [
          {
            required: true,
            message: "请填写菜单图标",
            trigger: ["blur"],
          },
        ],
        url: [
          {
            required: true,
            message: "请填写后台资源地址",
            trigger: ["blur"],
          },
        ],
        path: [
          {
            required: true,
            message: "请填写前台页面路径",
            trigger: ["blur"],
          },
        ],
        id: [
          {
            required: true,
            message: "请填写菜单标识id",
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  methods: {
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
    closeDialog() {
      this.resetForm("userEditRef"); // 重置表单
      this.resetFormData(); // 初始化弹窗数据 重置 等
    },
    dialogClose() {
      this.dialogFormVisible = false;
      this.resetFormData();
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.initFormData);
      this.resetFormData();
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
      this.nowIndex = -1; // 重置选中
    },
    // 确认
    onCertain() {
      if (this.initFormData.id) {
        console.log(this.initFormData.id, "this.initFormData.id");
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            modifyTheMenu(this.initFormData, this.initFormData.id).then(
              (res) => {
                console.log(res, "res11111");
                if (res && res.code && res.code === "00000") {
                  this.resetForm("userEditRef"); // 重置表单
                  this.nowIndex = -1; // 重置选中
                  this.$message.success("修改成功！");
                  this.dialogClose();
                }

                
              }
            );
          } else {
            return false;
          }
        });
      } else {
        console.log("增加了...");
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            createMenu(this.initFormData, this.initFormData.id).then((res) => {
              console.log(res, "res11111");
              if (res && res.code && res.code === "00000") {
                this.resetForm("userEditRef"); // 重置表单
                this.nowIndex = -1; // 重置选中
                this.$message.success("创建成功！");
                this.dialogClose();
              }
            });
          } else {
            return false;
          }
        });
      }
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
    font-weight: 500;
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
</style>