<template>
  <div>
    <div class="box">
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
                  <el-cascader
                    placeholder="部门"
                    :options="options"
                    filterable
                    size="mini"
                  ></el-cascader>
                  <el-cascader
                    placeholder="客户"
                    :options="options"
                    filterable
                    size="mini"
                  ></el-cascader>
                  <el-cascader
                    placeholder="交付经理"
                    :options="options"
                    filterable
                    size="mini"
                  ></el-cascader>
                </div></div
            ></el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="12"
              ><div class="grid-content bg-purple-light"></div
            ></el-col>
            <!-- 右侧 -->
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="6"
              ><div class="grid-content bg-purple">
                <div class="bg-purple-right">
                  <img src="./components/uihomepage/小圆头像.png" alt="" />
                  <div class="userInfo">
                    <span>杨小飞</span>
                    <span>项目经理</span>
                    <img src="./components/uihomepage/菜单icon.png" alt="" />
                  </div>
                </div></div
            ></el-col>
          </el-row>
        </div>
        <!-- 内容主体部分 上半 -->
        <div class="subjectContent upperHalf">
          <!-- 左侧内容 -->
          <el-row :gutter="10" style="margin-left: 0px; margin-right: 0px">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <!-- 左侧上 -->
              <div class="grid-content bg-purple">
                <span>性别分布</span>
              </div>
              <!-- 左侧中 -->
              <div class="grid-content bg-purple">
                <span>年龄分布</span>
              </div>
              <!-- 左侧下 -->
              <div class="grid-content bg-purple">
                <span>年龄分布</span>
              </div>
            </el-col>
            <!-- 中间地图 -->
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="grid-content bg-purple-light">
                <china></china>
              </div>
              <div class="grid-content bg-purple-chart">
                <span>图表</span>
              </div>
            </el-col>
            <!-- 右侧内容 -->
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <!-- 右侧上 -->
              <div class="grid-content bg-purple">
                <span>工龄分布</span>
              </div>
              <!-- 右侧中 -->
              <div class="grid-content bg-purple">
                <span>客户分布</span>
              </div>
              <!-- 右侧下 -->
              <div class="grid-content bg-purple">
                <span>交付经理人数分析</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 内容主体部分 下半 -->
        <!-- <div class="subjectContent lowerHalfContent">
          <el-row :gutter="10" style="margin-left: 0px; margin-right: 0px">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"
              ><div class="grid-content bg-purple">123213</div></el-col
            >
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
              ><div class="grid-content bg-purple-light">312312</div></el-col
            >
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"
              ><div class="grid-content bg-purple">qwewqe</div></el-col
            >
          </el-row>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import China from "./components/china-map.vue";
export default {
  name: "index",
  components: {
    China,
  },
  data() {
    return {
      // 左上下来功能数据模拟
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
      // 右侧头像模拟数据
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      // sizeList: ["large", "medium", "small"],
      sizeList: ["small"],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang='less'>
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
  background: url(./components/uihomepage/页面大背景.png);
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
    background: url(./components/uihomepage/顶部栏.png);
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
.content {
  position: relative;
  top: -20px;
  // 顶部操作部分
  .operate {
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
      .el-cascader {
        width: 25%;
        background: url(./components/uihomepage/xiaoxisc.com小夕素材81.png);
        background-size: cover;
        margin: 0 20px;
        padding: 0 10px;

        .el-input__inner {
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
  // 主体内容
  .subjectContent {
    margin-top: 15px;
    margin: 20px 20px 0;
    position:absolute .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
      // position: relative;
      // top: -30px;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
  }
  // 主体内容 上半内容
  .upperHalf {
    // 两侧
    .bg-purple {
      width: 100%;
      height: 28vh;
      background-color: rgba(224, 236, 211, 0.2);
      margin: 5px 0;
    }
    .bg-purple-light {
      width: 100%;
      height: 60vh;
      background-color: rgba(224, 236, 211, 0.2);
    }
    .bg-purple-chart {
      margin-top: 6px;
      width: 100%;
      height: 25vh;
      background-color: rgba(224, 236, 211, 0.2);
    }
  }
}
</style>
