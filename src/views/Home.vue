<template>
  <div class="home">
    <el-header><h1>家庭百科系统</h1></el-header>
    <el-container>
      <el-scrollbar style="height: 100%">
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>功能页面</span>
              </template>
              <el-menu-item-group>
                <template slot="title">主要内容</template>
                <el-menu-item index="/sys">主 页</el-menu-item>
                <el-menu-item index="/sys/about">关 于</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span slot="title">权限分配</span>
            </el-menu-item>
            <el-menu-item index="/echarts">
              <i class="el-icon-menu"></i>
              <span slot="title">实时图表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </el-scrollbar>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #383f49;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h1 {
    color: #fff;
    font-size: 20px;
  }
}

.el-container {
  height: calc(100vh - 60px);
  .el-menu {
    border-right: none;
  }
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden !important;
    border-right: 1px solid #eee;
  }
}
</style>