<template>
  <div class="home">
    <el-header>
      <div class="header_main">
        <h1>诚迈员工管理系统</h1>
        <div class="header_avatar">
          <el-avatar
            size="small"
            :src="userdetail.userAvatar"
          ></el-avatar>
          <span>欢迎 {{userdetail.userNickName}}</span>
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
      <el-aside width="200px">
        <el-scrollbar style="height: 100%;width: 200px;">
          <el-menu
            :default-active="nowMenu"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :unique-opened="true"
            router
          >
          <div v-for="item in userdetail.roles[0].menus" :key="item.path">
            <el-submenu
              :index="item.path"
              v-if="item.childrenMenus.length>0"
            >
              <template slot="title">
                <i :class="item.iconCls? item.iconCls : `el-icon-setting`"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="subitem.path"
                  v-for="subitem in item.childrenMenus"
                  :key="subitem.path"
                >{{subitem.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.path" >
              <i :class="item.iconCls? item.iconCls : `el-icon-setting`"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </div>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view />
        <div v-if="$route.path === '/sys'">
          <el-button @click="queryuser">查询</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Decrypt } from "@/util/crypto/secret";
import { queryUserAll } from "@/api/firstscreen/index";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      userdetail: {},
      nowMenu: ""
    };
  },
  computed: {
    pathNow() {
      return this.$route.path
    }
  },
  watch: {
    // 侦听路由 路由改变则联动菜单
    pathNow(n) {
      this.nowMenu = n;
    }
  },
  created() {
    this.userdetail = window.localStorage.getItem("userdetail")
      ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
      : {};
    if (Object.keys(this.userdetail).length === 0) {
      this.$message.warning("用户信息失效，请重新登录！");
      return this.$router.push("/login");
    }
    // 刷新时 菜单定位到当前路由
    this.nowMenu = this.$route.path;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginout() {
      this.$loginout()
    },
    queryuser() {
      queryUserAll().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.el-header {
  background-color: #383f49;
  border-bottom:4px solid #eee;
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
  height: calc(100vh - 64px);
  .el-menu {
    border-right: none;
    height: calc(100vh - 64px);
  }
  @{deep} .el-scrollbar__wrap {
    overflow-x: hidden !important;
    border-right: 1px solid #eee;
  }
}
</style>