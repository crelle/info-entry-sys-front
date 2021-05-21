<template>
  <div>
    <el-dialog title="角色设置">
      <div>
        <el-form
          :model="roleEditForm"
          :rules="roleEditFormRules"
          ref="roleEditRef"
          size="mini"
        >
          <el-form-item label="角色编码" prop="name">
            <el-input
              v-model="roleEditForm.name"
              placeholder="角色编码"
            ></el-input>
          </el-form-item>

          <el-form-item label="角色名称" prop="nameZh">
            <el-input v-model="roleEditForm.nameZh" placeholder="角色编码">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleEditForm: {
        name: "test",
        nameZh: "test",
      },

      initFormData: {},
      roleEditFormRules: {
        name: [
          {
            required: true,
            message: "请输入角色编码",
            trigger: ["blur", "change"],
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        nameZh: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: ["blur", "change"],
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    openDialog(row) {
      this.initFormData = row;
      this.dialogFormVisible = true; // 让弹窗显示
      this.$nextTick(() => {
        // 这个要加上
        this.initForm(row); // 为表单赋值
      });
    },
    initForm(data) {
      Object.keys(this.roleEditForm).forEach((item) => {
        console.log("###############################" + item);
        this.roleEditForm[item] = data[item] ? data[item] : null;
        if (item === "userAvatar") {
          // 最终保存的时候 此字段（头像地址）才是最终会
          // 赋值给this.userEditForm.userAvatar的值，
          // 所以要初始化的时候也要赋值一次
          this.imageUrl = data[item];
        }
      });
    },
  },
};
</script>