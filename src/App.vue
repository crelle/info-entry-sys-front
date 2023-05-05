<template>
  <div id="approot">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    //窗口尺寸改变
    window.addEventListener("resize", () => this.Refresh());
  },
  methods: {
	Refresh() {
      this.$router.go(0);
    },
  },
  destroyed() {
    // 销毁
    window.removeEventListener("resize", this.Refresh());
  },
}
</script>
<style lang="less">
body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  .el-main {
    background-color: rgb(250, 250, 250);
  }
  .el-card {
    margin-bottom: 10px;
    padding: 10px;
  }
}

</style>
