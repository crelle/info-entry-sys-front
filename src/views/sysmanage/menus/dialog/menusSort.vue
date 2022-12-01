<template>
  <div>
    <el-dialog
      title="菜单调整"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      lock-scroll
      width="30%"
      custom-class="menus"
      @close='dialogClose'
    >
      <nested-draggable :tasks="list" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose" size="mini"
          >取 消</el-button
        >
        <!-- <el-button type="primary" @click="resetForm('userEditRef')" size="mini"
            >重置</el-button
          > -->
        <el-button type="primary" size="mini" @click="onCertain"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
import { Decrypt } from "@/util/crypto/secret";
import { sortMenu } from "@/api/menu";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    nestedDraggable: () => import("../nested.vue"),
  },
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      list: [
      ],
    };
  },
  mounted() { 
    this.list = window.localStorage.getItem("userdetail")
      ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail"))).roles[0]
          .menus
      : [];
    if (this.list.length === 0) {
      this.$message.warning("用户信息失效，请重新登录！");
      return this.$router.push("/login");
    }
  },
  methods: {
    dialogClose() {
      this.dialogFormVisible=false
    },
    onCertain() {
      console.log('tzy111',this.list);
      sortMenu(this.list).then((res)=>{
        console.log(res);
        if (res && res.code && res.code === "00000") {
                this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.dialogFormVisible=false
            }
      })
    },
  },
};
</script>
  
  <style lang="less" scoped>
::v-deep .el-dialog__body {
  padding: 0px 100px 0px 60px;
}
</style>