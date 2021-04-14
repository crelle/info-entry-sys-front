<template>
  <div class="home">
    <el-header>
      <div class="header_main">
        <h1>家庭百科系统</h1>
        <div class="header_avatar">
          <el-avatar
            size="small"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <span>欢迎 {{userdetail.username}}</span>
          <el-popconfirm
            confirm-button-text='确认'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="确认退出吗？"
            @confirm="loginout"
          >
            <el-button
              slot="reference"
              type="text"
              icon="el-icon-switch-button"
            >退 出</el-button>
          </el-popconfirm>
        </div>

      </div>
    </el-header>
    <el-container>
      <el-scrollbar style="height: 100%;width:200px">
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <el-submenu
              index="1"
              v-for="item in userdetail.roles[0].menus"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="subitem.path"
                  v-for="subitem in item.childrenMenus"
                  :key="subitem.id"
                >{{subitem.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-scrollbar>
      <el-main>
        <router-view />
        <el-button @click="queryuser">查询</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Decrypt } from "@/util/crypto/secret";
import { logout,queryUserAll } from "@/api/home/index";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      userdetail: {},
    };
  },
  created() {
    this.userdetail = window.localStorage.getItem("userdetail")
      ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
      : {};
    if (Object.keys(this.userdetail).length === 0) {
      this.$message.warning("用户信息失效，请重新登录！");
      return this.$router.push("/login");
    }
    console.log(this.userdetail);
    
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginout() {
      logout().then((res) => {
        console.log(res);
      });
    },
    queryuser() {
      queryUserAll().then(res=> {
        console.log(res);
      })
    }
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
  .header_main {
    width: 100%;
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    .header_avatar {
      display: flex;
      align-items: center;
      span {
        margin: 0 10px;
      }
    }
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