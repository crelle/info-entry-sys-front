<template>
  <div>
    <div class="box bigScreenbox">
      <!-- 头部 -->
      <div class="title">
        <el-row :gutter="10" style="margin-left: 0px; margin-right: 0px">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 顶部操作 -->
        <div class="operate">
          <el-row :gutter="10" style="margin-left: 0px; margin-right: 0px">
            <!-- 左侧 -->
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="6"
              ><div class="grid-content bg-purple">
                <div class="block_left">
                  <div class="btn-top">
                    <el-select
                      v-model="value1"
                      placeholder="部门"
                      :popper-append-to-body="false"
                    >
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        filterable
                        size="mini"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="btn-top">
                    <el-select
                      v-model="value2"
                      placeholder="客户"
                      :popper-append-to-body="false"
                    >
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        filterable
                        size="mini"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="btn-top">
                    <el-select
                      v-model="value3"
                      placeholder="交付经理"
                      :popper-append-to-body="false"
                    >
                      <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        filterable
                        size="mini"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div></div
            ></el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="12"
              ><div class="grid-content bg-purple-light"></div
            ></el-col>
            <!-- 右侧 -->
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="6"
              ><div class="grid-content bg-purple">
                <div class="bg-purple-right">
                  <img
                    src="./components/images/uihomepage/小圆头像.png"
                    alt=""
                  />
                  <div class="userInfo">
                    <span>杨小飞</span>
                    <span>项目经理</span>
                    <!-- @click="centerDialogVisible = true" -->
                    <img
                      @click="drawer = true"
                      src="./components/images/uihomepage/菜单icon.png"
                      alt=""
                    />
                  </div>
                </div></div
            ></el-col>
          </el-row>
        </div>
        <!-- 内容主体部分 -->
<!--        <large-screen></large-screen>-->
<!--        <el-main>-->
<!--          <router-view />-->
<!--          <div v-if="$route.path === '/sys'">-->
<!--            <el-button @click="queryuser">查询</el-button>-->
<!--          </div>-->
<!--        </el-main>-->
      </div>
    </div>
    <!-- 弹窗菜单 -->
    <el-drawer
      title=""
      :visible.sync="drawer"
      :direction="direction"
      :modal="false"
    >
      <div class="popUpMenu">
        <!-- 头部 -->
        <!-- 人物信息 -->
        <div class="menuHead quit">
          <span>人物信息</span>
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确认退出吗？"
          >
            <el-button slot="reference" type="text" icon="el-icon-switch-button"
              >退 出</el-button
            >
          </el-popconfirm>
        </div>
        <!-- 人物信息卡片 -->
        <div class="menuHead-card">
          <!-- 左侧头像 -->
          <div class="leftAvatar">
            <img src="./components/images/popUpMenu/photo.png" alt="" />
          </div>
          <!-- 右侧信息 -->
          <div class="rightInformation">
            <div class="names">
              <span>杨小飞</span><span>Yang Xiaofei</span>
            </div>
            <ul class="information">
              <li class="position list">
                <span>职务 :</span>
                <span>项目经理</span>
              </li>
              <li class="list_pos">
                <span>电话 :</span>
                <span>13057569874</span>
              </li>
            </ul>
            <div class="area">
              <p>
                <span class="areaname">区域 :</span>
                <span>江苏省南京市雨花台区云密城B栋</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 管理模块 -->
        <div class="managementModule">
          <el-container>
            <el-aside width="300px">
              <el-scrollbar style="height: 100%; width: 300px">
                <el-menu
                    :default-active="nowMenu"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :unique-opened="true"
                    router
                >
                  <!-- 侧边栏 -->
                  <div v-for="item in userdetail.roles[0].menus" :key="item.path">
                    <el-submenu
                        :index="item.path"
                        v-if="item.childrenMenus.length > 0"
                    >
                      <template slot="title">
                        <i :class="item.iconLs ? item.iconLs : `el-icon-setting`"></i>
                        <span>{{ item.name }}</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item
                            :index="subitem.path"
                            v-for="subitem in item.childrenMenus"
                            :key="subitem.path"
                        >{{ subitem.name }}
                        </el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-else :index="item.path">
                      <i :class="item.iconLs ? item.iconLs : `el-icon-setting`"></i>
                      <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                  </div>
                </el-menu>
              </el-scrollbar>
            </el-aside>
<!--            <el-main>-->
<!--              <router-view />-->
<!--              <div v-if="$route.path === '/sys'">-->
<!--                <el-button @click="queryuser">查询</el-button>-->
<!--              </div>-->
<!--            </el-main>-->
          </el-container>

          <!-- <el-aside width="420px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1']">
              <el-submenu index="1">
                <template slot="title"
                  ><i class="el-icon-message"></i>系统管理</template
                >
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"
                  ><i class="el-icon-menu"></i>用户管理</template
                >
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title"
                  ><i class="el-icon-setting"></i>员工管理</template
                >
                <el-menu-item-group>
                  <el-menu-item index="3-1">选项1</el-menu-item>
                  <el-menu-item index="3-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="3-3">选项3</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import LargeScreen from "./components/largeScreen.vue";
import { Decrypt } from "@/util/crypto/secret";
import { queryUserAll } from "@/api/firstscreen/index";
export default {
  name: "index",
  components: {
    LargeScreen
  },
  data() {
    return {
      //登录后菜单展示
      tableData: [],
      userdetail: {},
      nowMenu: "",
      // 时间
      monthValue: "",
      // 时间段
      timeslot: "",
      // 菜单弹窗1
      drawer: true,
      direction: "rtl",
      // 菜单弹窗
      centerDialogVisible: false,
      // 左上下来功能数据模拟
      options1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      options3: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: "",
      value2: "",
      value3: "",
      // 右侧头像模拟数据
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      // sizeList: ["large", "medium", "small"],
      sizeList: ["small"],
    };
  },
  //菜单生成部分
  computed: {
    pathNow() {
      return this.$route.path;
    },
  },
  watch: {
    // 侦听路由 路由改变则联动菜单
    pathNow(n) {
      this.nowMenu = n;
    },
  },
  mounted() {},
  created() {
    this.userdetail = window.localStorage.getItem("userdetail")
        ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
        : {};
    // console.log(window.localStorage.getItem("userdetail"));
    // console.log(this.userdetail, "---我是（当前用户信息）");
    // 当前时间  判断上午-中午 -下午 欢迎语
    this.timeslot = "";
    var data = new Date();
    var hours = data.getHours();
    var toMonth = hours;
    this.monthValue = toMonth;
    console.log(this.monthValue, "---------时间");
    if (this.monthValue <= 11 && this.monthValue > 8) {
      this.timeslot = "上午好";
    } else {
      if (this.monthValue <= 13 && this.monthValue > 11) {
        this.timeslot = "中午好";
      } else {
        if (this.monthValue <= 18 && this.monthValue > 13) {
          this.timeslot = "下午好";
        } else {
          return (this.timeslot = "你好");
        }
      }
    }

    if (Object.keys(this.userdetail).length === 0) {
      this.$message.warning("用户信息失效，请重新登录！");
      return this.$router.push("/login");
    }
    // 刷新时 菜单定位到当前路由
    this.nowMenu = this.$route.path;
  },
  methods: {
  //  生成菜单跳转
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginout() {
      this.$loginout();
    },
    queryuser() {
      queryUserAll().then((res) => {
        console.log(res);
      });
    },
    // 个人信息跳转
    personal() {
      if (this.$route.path !== "/sys/personalInformation") {
        this.$nextTick(() => {
          this.$router.push({ path: "/sys/personalInformation" });
        });
      }
    },
  },
};
</script>
<style lang='less'>
.box {
  .el-scrollbar {
    background-color: #1d2e5d !important;
    border: none;
    color: #fff;
  }
}
</style>
<style lang='less' scoped>
body,
html {
  height: 100%;
}
// 背景
.box {
  background-color: coral;
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  background: url(./components/images/uihomepage/页面大背景.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
// 头部
.title {
  // background-position: center;
  // overflow: hidden;
  width: 100%;
  // height: 90px;
  // background-color: aqua;
  .bg-purple {
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    letter-spacing: 6px;
    font-weight: bold;
    color: #dce1ef;
    background: url(./components/images/uihomepage/顶部栏.png);
    background-size: cover;
  }
  // 响应式布局
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    // background: #164090;
    height: 60px;
  }
  .bg-purple-light {
    // background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
}
// 内容
// 上
.el-cascader-menu {
  background-color: aqua !important;
}
// 顶部操作部分
.content {
  position: relative;
  top: -20px;
  .operate {
    // 下拉框

    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      // background: #d3dce6;
    }
    .bg-purple-light {
      // background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .block_left {
      display: flex;
      align-items: center;
      height: 40px;
      .btn-top {
        width: 30%;
        background: url(./components/images/uihomepage/xiaoxisc.com小夕素材81.png);
        background-size: cover;
        margin: 0 10px;
        padding: 0 15px;
        ::v-deep .el-input__inner {
          background-color: transparent !important;
          border: none;
          color: #fff;
        }
      }
    }
    .bg-purple-right {
      display: flex;
      justify-content: right;
      align-items: center;
      padding-right: 5px;
      img {
        width: 40px;
        height: 40px;
      }
      .userInfo {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #a0bbe6;
        margin-right: 20px;
        span {
          white-space: nowrap;
          display: block;
          width: 70px;
          text-align: center;
        }
        img {
          margin-left: 20px;
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  //// 主体内容
  //.subjectContent {
  //  margin-top: 15px;
  //  margin: 20px 20px 0;
  //  position:absolute .el-col {
  //    border-radius: 4px;
  //  }
  //  .bg-purple-dark {
  //    background: #99a9bf;
  //  }
  //  .bg-purple {
  //    background: #d3dce6;
  //  }
  //  .bg-purple-light {
  //    background: #e5e9f2;
  //    // position: relative;
  //    // top: -30px;
  //  }
  //  .grid-content {
  //    border-radius: 4px;
  //    min-height: 36px;
  //  }
  //}
  //// 主体内容 上半内容
  //.upperHalf {
  //  // 两侧
  //  .bg-purple {
  //    width: 100%;
  //    height: 28vh;
  //    background-color: rgba(224, 236, 211, 0.2);
  //    margin: 5px 0;
  //  }
  //  .bg-purple-light {
  //    width: 100%;
  //    height: 60vh;
  //    background-color: rgba(224, 236, 211, 0.2);
  //  }
  //  .bg-purple-chart {
  //    margin-top: 6px;
  //    width: 100%;
  //    height: 25vh;
  //    background-color: rgba(224, 236, 211, 0.2);
  //  }
  //}
}
// 菜单弹窗
.el-menu {
  // background-color: rgba(0, 0, 0, 1) !important;
}
::v-deep .el-drawer {
  width: 25% !important;
  background: rgba(0, 0, 0, 0.7);
}
.popUpMenu {
  color: #dfeef3;
  padding: 0 20px;
  .quit {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menuHead {
    background: url(./components/images/popUpMenu/title-rwxx.png);
    height: 39px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    span {
      font-size: 16px;
    }
  }
  .managementModule {
    .menuHead {
      margin: 40px 0;
    }
  }
  .menuHead-card {
    background: url(./components/images/popUpMenu/bg-rwxx2.png);
    height: 120px;
    margin-top: 10px;
    display: flex;
    margin-bottom: 20px;
    .leftAvatar {
      padding: 5px;
    }
    .rightInformation {
      ul,
      li {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      padding: 10px 20px;
      .names {
        display: flex;
        margin-bottom: 20px;
        span {
          display: block;
          margin-right: 15px;
        }
      }
      .information {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          // background-color: blue;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1; /* 超出几行省略 */
        }
        .list {
          width: 47%;
        }
        .list_pos {
          width: 53%;
        }
        .position {
          // margin-right: 20px;
        }
      }
      .area {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* 超出几行省略 */
        .areaname {
          margin-right: 10px;
        }
      }
    }
  }
}
//右侧下拉菜单
@deep: ~">>>";
.el-header {
  background-color: #383f49;
  border-bottom: 4px solid #eee;
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
      div {
        display: flex;
        align-items: center;
      }
      span {
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
}

.el-container {
  height: calc(100vh - 400px);
  .el-menu {
    border-right: none;
    height: calc(100vh - 400px);
  }
  @{deep} .el-scrollbar__wrap {
    overflow-x: hidden !important;
    border-right: 1px solid #eee;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-dropdown {
  color: #fff;
}
.el-dropdown-menu {
  padding: 0;
}
// 头部操作按钮左侧下拉透明
</style>
<style lang="less" scoped>
// .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-image: linear-gradient(to right, #18264a, #2a418e, #18264a);
  color: #e4e7ed;
}
.el-select-dropdown {
  background-color: aqua;
}
</style>