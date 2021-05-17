<template>
  <div>
    <el-dialog
      title="用户设置"
      :visible.sync="dialogFormVisible"
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="12">
            <div class="grid-content-left">
              <el-upload
                class="avatar-uploader"
                :action="`${baseURL}/user/uploadAvatar`"
                :data="fileType"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="avatar"
                  draggable="false"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
              <span style="font-size: small;color: red;padding: 10px 0">* 请上传头像或选择默认头像</span>
              <el-scrollbar style="height: 90px;width: 200px;">
                <div
                  class="demo-image__lazy"
                  :style="`width: ${defaultImgs.length*88}px`"
                >
                  <div
                    v-for="(url,index) in defaultImgs"
                    :key="index"
                    @click="choosedefaultImg(index,url)"
                    style="display: inline-block"
                  >
                    <el-image
                      :src="url"
                      :class="nowIndex === index ? 'default_img_chioce' : ''"
                      draggable="false"
                    ></el-image>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-right">
              <el-form
                :model="userEditForm"
                :rules="userEditFormRules"
                ref="userEditRef"
                size="mini"
              >
                <el-form-item
                  label=""
                  prop="username"
                >
                  <el-input
                    v-model="userEditForm.username"
                    placeholder="用户名"
                  ><i
                      class="el-icon-user"
                      slot="prepend"
                    ></i></el-input>
                </el-form-item>
                <el-form-item
                  label=""
                  prop="userNickName"
                >
                  <el-input
                    type="text"
                    v-model="userEditForm.userNickName"
                    placeholder="昵称"
                  ><i
                      class="el-icon-magic-stick"
                      slot="prepend"
                    ></i></el-input>
                </el-form-item>
                <el-form-item
                  label=""
                  prop="userPhone"
                >
                  <el-input
                    type="tel"
                    v-model="userEditForm.userPhone"
                    placeholder="手机号"
                  ><i
                      class="el-icon-mobile-phone"
                      slot="prepend"
                    ></i></el-input>
                </el-form-item>
                <el-form-item
                  label=""
                  prop="userEmail"
                >
                  <el-input
                    type="email"
                    v-model="userEditForm.userEmail"
                    placeholder="邮箱"
                  ><i
                      class="el-icon-message"
                      slot="prepend"
                    ></i></el-input>
                </el-form-item>
                <el-form-item
                  label="是否可用"
                  label-width="100px"
                  prop="enabled"
                >
                  <el-switch
                    v-model="userEditForm.enabled"
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
                    v-model="userEditForm.accountNonLocked"
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
                    v-model="userEditForm.accountNonExpired"
                    active-text="未过期"
                    inactive-text="已过期"
                  ></el-switch>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogClose"
          size="mini"
        >取 消</el-button>
        <el-button
          @click="resetForm('userEditRef')"
          size="mini"
        >重置</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="onCertain"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { BaseURL } from "@/api/config";
import { updateUser } from "@/api/user";

export default {
  data() {
    return {
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      baseURL: BaseURL,
      userEditForm: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        password: "",
        userAvatar: "",
        userEmail: "",
        userNickName: "",
        userPhone: "",
        username: "",
      },
      initFormData: {},
      defaultImgs: [
        "http://1.116.79.69:80/fes/picture/2021-4-27-e9a33f87-ab85-464a-a4b4-5fcd196eea51.png",
        "http://1.116.79.69:80/fes/picture/2021-4-27-5da50eea-9146-40e5-836c-42ee5eb29092.png",
        "http://1.116.79.69:80/fes/picture/2021-4-27-137171c6-5a54-4025-8e84-877cbab6c355.png",
        "http://1.116.79.69:80/fes/picture/2021-4-27-d9b3fe51-6e70-4ffa-970d-2d517a7bdc7a.png",
        "http://1.116.79.69:80/fes/picture/2021-4-27-a16b1069-2665-4f4a-85b5-c9607f65a00a.png",
        "http://1.116.79.69:80/fes/picture/2021-4-27-90c64b39-d069-4644-8bef-3dc4e3e5ab55.png",
        "http://1.116.79.69:80/fes/picture/2021-4-27-905ea61e-dac4-472f-bce5-24a9bcedac66.png",
        "http://1.116.79.69:80/fes/picture/2021-4-27-8c5ba8c3-bcfc-4d8b-9bac-6566d53d5173.png",
      ],
      userEditFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      
        userEmail: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: ["blur", "change"],
          },
        ],
        userNickName: [
          {
            required: true,
            message: "请填写昵称",
            trigger: ["blur", "change"],
          },
        ],
        userPhone: [
          {
            required: true,
            message: "请填写手机号码",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    openDialog(row) {
      this.initFormData = row;
      this.dialogFormVisible = true; // 让弹窗显示
      this.$nextTick(() => { // 这个要加上
        this.initForm(row); // 为表单赋值
      });
    },
    initForm(data) {
      Object.keys(this.userEditForm).forEach((item) => {
        this.userEditForm[item] = data[item] ? data[item] : null;
        if (item === "userAvatar") {
          // 最终保存的时候 此字段（头像地址）才是最终会
          // 赋值给this.userEditForm.userAvatar的值，
          // 所以要初始化的时候也要赋值一次
          this.imageUrl = data[item];
        }
      });
    },
    closeDialog() {
      this.resetFormData(); // 初始化弹窗数据 重置 包含头像信息等
      this.resetForm("userEditRef"); // 重置表单
    },
    dialogClose() {
      this.dialogFormVisible = false;
      this.resetFormData();
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.initFormData)
      this.resetFormData();
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
      this.imageUrl = ""; // 清空头像
      this.nowIndex = -1; // 重置选中
    },
    // 头像上传相关
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.nowIndex = -1; // 取消默认头像选中样式
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      // 判断上传文件的类型
      if (/^image\/+?/.test(file.type)) {
        this.fileType.fileType = 0;
      } else if (/^video\/+?/.test(file.type)) {
        this.fileType.fileType = 1;
      } else if (/^audio\/+?/.test(file.type)) {
        this.fileType.fileType = 2;
      } else if (/^application\/vnd.ms-+?/.test(file.type)) {
        this.fileType.fileType = 3;
      } else {
        this.$message.error("此文件类型不支持!");
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 100;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 100MB!");
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    // 选择默认头像
    choosedefaultImg(index, url) {
      if (index !== this.nowIndex) {
        console.log(this.nowIndex);
        this.nowIndex = index;
        this.imageUrl = url;
      } else {
        console.log(this.nowIndex, -1);
        this.nowIndex = -1;
        this.imageUrl = "";
      }
    },
    onCertain() {
      this.$refs["userEditRef"].validate((valid) => {
        if (valid) {
          if (!this.imageUrl) {
            return this.$message.error("请上传头像或选择默认头像");
          }
          this.userEditForm.userAvatar = this.imageUrl;
          updateUser(this.userEditForm,this.initFormData.id).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.resetForm("userEditRef"); // 重置表单
              this.imageUrl = ""; // 清空头像
              this.nowIndex = -1; // 重置选中
              this.$message.success("修改成功！");
              this.dialogClose();
            }
          });
        } else {
          return false;
        }
      });
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
  padding: 10px 20px 10px 0;
  .el-input-group__append {
    padding: 0 2px;
  }
}
</style>