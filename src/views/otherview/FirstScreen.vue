<template>
  <div class="firstscreen_content">
    <!-- <el-header class="topname" v-for=" (item,index) in projectData" :key="index">
      {{item.name}}
    </el-header> -->
    <el-header class="topname">
      {{ item.name }}
    </el-header>
    <el-header class="toptime"> {{ item.time }} </el-header>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="echarts_map colorone">
          <div class="circle">
            <span>{{ proportion.lis1 }}</span>
          </div>
          <div class="dataname">
            <span>{{ quantity.lis1 }}</span>
            <span title="本公司总项目数量">人员总数量</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="echarts_map colortwo">
          <!-- 图表 -->
          <e-charts class="chart" :option="optionbt" />
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="echarts_map colorthree">
          <!-- 图表 -->
          <e-charts class="chart" :option="optiontb" />
        </el-card>
      </el-col>
    </el-row>
    <!-- 各区域人员总况 -->
    <el-col class="topname"> 各区域人员总况 </el-col>
    <el-col :span="24" class="regions">
      <el-card
        class="block"
        v-for="(item, index) in getRandomDatabt()"
        :key="index"
      >
        <el-col
          ><span style="font-size: 18px; font-weight: bold">地域 : </span
          >{{ item.name }}
        </el-col>
        <el-col
          ><span style="font-size: 18px; font-weight: bold">人员 : </span
          >{{ item.value }} /人</el-col
        >
      </el-card>
    </el-col>

    <el-col class="topname"> 各区域项目总况 </el-col>
    <el-col :span="24" class="regions">
      <el-card
        class="itemsblock"
        v-for="(item, index) in getRandomData()"
        :key="index"
      >
        <el-col>{{ item.time }}</el-col>
        <el-col>{{ item.value }}</el-col>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { Decrypt } from "@/util/crypto/secret";
export default {
  components: {},
  data() {
    return {
      datasbt: this.getRandomDatabt(),
      datas: this.getRandomData(),
      userdetail: {},
      item: {
        name: "人员总览",
        time: "09/29",
      },
      itemlis: {
        // name: "项目详情",
        time: "09/29",
      },
      // 数量
      quantity: {
        lis1: "9534",
        lis2: "8485",
        lis3: "5485",
        lis4: "3254",
      },
      //
      proportion: {
        lis1: "100%",
        lis2: "50%",
        lis3: "60%",
        lis4: "30%",
      },
      // projectData: [
      //   {
      //     name: "项目总览11",
      //     time: "20220929",
      //   },
      //   {
      //     name: "项目总览222",
      //     time: "20220929",
      //   },
      // ],
      // 区域项目情况
      projectArea: [
        {
          name: "北京区域项目",
          list: [
            {
              date: "2016-05-02",
              name: "北京项目1",
              personnel: "213",
              address:
                "北京项目的详情内容111南京南京南京111南京南京北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内",
            },
            {
              date: "2016-05-04",
              name: "北京项目2",
              personnel: "234",
              address: "北京项目的详情内容2222北京北京北京",
            },
            {
              date: "2016-05-01",
              name: "北京项目3",
              personnel: "342",
              address: "北京项目的详情内容3333上海上海上海",
            },
            {
              date: "2016-05-03",
              name: "北京项目4",
              personnel: "434",
              address: "北京项目的详情内容4444深圳深圳深圳",
            },
            {
              date: "2016-05-01",
              name: "北京项目5",
              personnel: "232",
              address: "北京项目的详情内容55555上海上海上海",
            },
            {
              date: "2016-05-03",
              name: "北京项目6",
              personnel: "324",
              address: "北京项目北京项目北京项目北京项目6666",
            },
          ],
        },
        {
          name: "上海区域项目",
          list: [
            {
              date: "2016-05-02",
              name: "上海区域项目1",
              personnel: "675",
              address: "上海区域项目上海区域项目上海区域项目上海区域项目1111",
            },
            {
              date: "2016-05-04",
              name: "上海区域项目2",
              personnel: "987",
              address: "上海区域项目上海区域项目上海区域项目上海区域项目22222",
            },
            {
              date: "2016-05-01",
              name: "上海区域项目3",
              personnel: "464",
              address: "上海区域项目33333",
            },
          ],
        },
        {
          name: "深圳区域项目",
          list: [
            {
              date: "2016-05-02",
              name: "深圳区域项目1",
              personnel: "464",
              address: "深圳区域项目深圳区域项目深圳区域项目1111",
            },
            {
              date: "2016-05-04",
              name: "深圳区域项目2",
              personnel: "545",
              address: "深圳区域项目22222222",
            },
            {
              date: "2016-05-01",
              name: "深圳区域项目3",
              personnel: "754",
              address: "深圳区域项目深圳区域项目深圳区域项目33333",
            },
            {
              date: "2016-05-03",
              name: "深圳区域项目4",
              personnel: "577",
              address: "深圳区域项目44444444",
            },
          ],
        },
      ],
      projectSum: [
        {
          name: "北京区域",
          projectNumber: "2131",
        },
        {
          name: "上海区域",
          projectNumber: "3212",
        },
        {
          name: "深圳区域区域",
          projectNumber: "2323",
        },
      ],
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
    // window.addEventListener("resize", (e) => {
    //   this.initEcharts();
    // });
    // this.$nextTick(() => {
    //   this.initEcharts();
    // });
    setInterval(() => {
      this.datasbt = this.getRandomDatabt();
      this.datas = this.getRandomData();
    }, 3000);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 饼图 // 随机数据
    getRandomDatabt() {
      return [
        {
          name: "南京地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "北京地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "上海地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "四川地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "厦门地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "成都地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "湖北地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "武汉地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "天津地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "宁波地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "河北地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "天津地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "湖南地区",
          value: Math.round(Math.random() * 1000),
        },

        {
          name: "宁波地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "天津地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "湖南地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "河北地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "宁波地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "河北地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "吉林地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "内蒙地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "宁波地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "河北地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "山东地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "宁波地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "河北地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "湖南地区",
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "吉林地区",
          value: Math.round(Math.random() * 1000),
        },
      ];
    },
    // 图表 //随机数据
    getRandomData() {
      return [
        {
          time: "南京项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "北京项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "宁波项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "湖北项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "武汉项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "天津项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "宁波项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "河北项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "天津项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "湖南项目",
          value: Math.round(Math.random() * 1000),
        },

        {
          time: "宁波项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "天津项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "湖南项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "河北项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "宁波项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "河北项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "吉林项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "内蒙项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "宁波项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "河北项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "山东项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "宁波项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "河北项目",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "湖南项目",
          value: Math.round(Math.random() * 1000),
        },
      ];
    },
  },
  computed: {
    // 饼图
    optionbt() {
      return {
        title: {
          text: "各区域维度人员数量",
          subtext: "数量情况",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "区域人数",
            type: "pie",
            top: 0,
            left: 80,
            radius: ["30%", "70%"],
            data: this.datasbt,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
    //图表
    optiontb() {
      return {
        title: {
          text: "各地区项目总数展示",
          subtext: "地域/数据",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["2022年"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          splitLine: {
            // 网格线
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: this.datas.map((d) => d.time),
          axisLabel: {
            // y轴文字的配置
            show: true,
            interval: 0,
            textStyle: {
              align: "right",
            },
          },
        },
        series: [
          {
            name: "2022年",
            type: "bar",
            data: this.datas.map((d) => d.value),
            label: {
              show: true, // 开启显示
              position: "right", // 在上方显示
              textStyle: {
                fontSize: 15,
              },
            },
            itemStyle: {
              normal: {
                //这里是颜色
                color: function () {
                  //注意，颜色
                  const colors =
                    "#" + parseInt(Math.random() * 0xffffff).toString(16);
                  // console.log(colors, "我是颜色");
                  return colors;
                },
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="less" scoped>
.el-main {
  background-color: #f3f3f3;
}
.echarts_map {
  min-width: 200px;
  height: 500px;
  background-color: #fff;
}
::v-deep .echarts_map {
  .el-card__body {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.topname {
  margin-top: 10px;
  display: block;
  font-size: 26px;
  color: #848484;
  height: 40px !important;
  line-height: 40px;
}
.toptime {
  display: block;
  font-size: 18px;
  color: #c3c3c3;
  height: 30px !important;
  line-height: 30px;
}
.echarts_map {
  ::v-deep .el-card__body {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
// 圆环
.circle {
  min-width: 150px;
  height: 150px;
  background: #fff;
  line-height: 150px;
  text-align: center;
  border-radius: 50%;
  border: 30px solid #fd0000;
  span {
    font-size: 26px;
  }
}
.dataname {
  span {
    display: block;
    text-align: center;
  }
  span:nth-child(1) {
    font-size: 32px;
    color: #fd0000;
    font-weight: bold;
    margin-bottom: 10px;
  }
  span:nth-child(2) {
    font-size: 24px;
    color: #b7b7b7;
    // width: 210px;
    overflow: hidden; //超出的文本隐藏
    display: -webkit-box;
    -webkit-line-clamp: 1; // 超出多少行
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
}
.colortwo {
  .circle {
    border: 10px solid #fed603;
  }
  .dataname {
    span:nth-child(1) {
      color: #fed603;
    }
  }
}
.colorthree {
  .circle {
    border: 10px solid #4686fd;
  }
  .dataname {
    span:nth-child(1) {
      color: #4686fd;
    }
  }
}
.colorfive {
  .circle {
    border: 10px solid #02ba78;
  }
  .dataname {
    span:nth-child(1) {
      color: #02ba78;
    }
  }
}
.lis {
  p {
    font-size: 18px;
    color: #6e6e6e;
    font-weight: bold;
  }
}
// 列表小手
::v-deep .cell {
  cursor: pointer;
}
// 列表详情长度
::v-deep .el-table_2_column_5 {
  .cell {
    width: 1225px;
    overflow: hidden; //超出的文本隐藏
    display: -webkit-box;
    -webkit-line-clamp: 1; // 超出多少行
    -webkit-box-orient: vertical;
  }
}
.chart {
  height: 500px;
}
.regions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.block {
  margin: 10px 20px;
  width: 20%;
  text-align: center;
  ::v-deep .el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    background-color: #f1f1f1;
    cursor: pointer;
    .el-col-24 {
      line-height: 42px;
    }
  }
}
.itemsblock {
  margin: 10px 20px;
  width: 8%;
  border-radius: 50%;
  text-align: center;
  ::v-deep .el-card__body {
    overflow: hidden;
    border-radius: 5px;
    background-color: #f1f1f1;
    border-radius: 50%;
    cursor: pointer;
    .el-col-24 {
      line-height: 42px;
      font-weight: bold;
    }
  }
}
</style>