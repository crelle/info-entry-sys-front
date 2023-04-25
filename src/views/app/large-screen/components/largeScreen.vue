<template>
  <div>
    <!-- 内容主体部分 -->
    <div class="subjectContent upperHalf">
      <!-- 左侧内容 -->
      <el-row :gutter="10" style="margin-left: 0px; margin-right: 0px">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <!-- 左侧上 -->
          <div class="grid-content bg-purple">
            <span>性别分布</span>
          </div>
          <!-- 左侧中 -->
          <div class="grid-content ageCom bg-purple">
            <!-- <span>年龄分布</span> -->
            <age-com
              class="ageCount"
              :aName="ageName"
              :aValue="ageValue"
              ref="age"
            ></age-com>
          </div>
          <!-- 左侧下 -->
          <div class="grid-content bg-purple marriageCom">
            <marriage-com
              class="ageCount"
              :dataArr="marriageArr"
            ></marriage-com>
          </div>
        </el-col>
        <!-- 中间地图 -->
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light">
            <!-- <china></china> -->
          </div>
          <div class="grid-content bg-purple-chart region">
            <geographical-distribution
              class="agecountColumn"
            ></geographical-distribution>
          </div>
        </el-col>
        <!-- 右侧内容 -->
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <!-- 右侧上 -->
          <div class="grid-content bg-purple workCom">
            <age-com
              class="ageCount"
              :aName="workName"
              :aValue="workValue"
              ref="work"
            ></age-com>
          </div>
          <!-- 右侧中  客户分布-->
          <div class="grid-content bg-purple client">
            <radarchart class="ageCount"></radarchart>
          </div>
          <!-- 右侧下 交付经理-->
          <div class="grid-content bg-purple deliver">
            <delivery-manager class="ageCount"></delivery-manager>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import China from "./china-map.vue";
import ageCom from "./ageCom.vue";
import Radarchart from "./radar-chart.vue";
import DeliveryManager from "./delivery-manager.vue";
import marriageCom from "./marriageCom.vue";
import GeographicalDistribution from "./geographical-distribution.vue";
import { employeeAge, employeeSeniority } from "@/api/largeScreen";
export default {
  name: "index",
  components: {
    China,
    ageCom,
    Radarchart,
    DeliveryManager,
    marriageCom,
    GeographicalDistribution,
  },
  data() {
    return {
      ageData: {
        departmentName: "",
        regionName: "",
      },
      workAgeData: {
        departmentName: "",
        regionName: "",
      },
      marriageDate: {
        departmentName: "",
        regionName: "",
      },
      ageName: [],
      ageValue: [],
      workName: [],
      workValue: [],
      marriageArr: [],
    };
  },
  //菜单生成部分
  computed: {},
  watch: {
    // 侦听路由 路由改变则联动菜单
  },
  mounted() {
    this.ageDeal(this.ageData);
    this.workAge(this.workAgeData);
    this.marriageDeal();
  },

  methods: {
    ageDeal(age) {
      employeeAge(age).then((res) => {
        if (res && res.code && res.code === "00000") {
          let dataArr = {};
          res.data.forEach((item) => {
            let name = String(item.birthdayYear).substr(2, 1) + "0后";
            dataArr[name] = dataArr[name] ? dataArr[name] + item.num : item.num;
          });
          this.ageName = Object.keys(dataArr).reverse();
          this.ageValue = Object.values(dataArr).reverse();
          // this.ageValue=this.ageFirst(Object.values(dataArr)).reverse()
          this.$nextTick(() => {
            this.$refs.age.start(); // 调用 ECharts 组件的初始化方法
          });
        }
      });
    },
    workAge(data) {
      employeeSeniority(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          let workData = {
            "1年以下": 0,
            "1-2年": 0,
            "2-3年": 0,
            "3-4年": 0,
            "4-5年": 0,
            "5年以上": 0,
          };
          res.data.forEach((item) => {
            if (item.seniority == 0) {
              workData["1年以下"] += item.num;
            }
            if (item.seniority == 1) {
              workData["1-2年"] += item.num;
            }
            if (item.seniority == 2) {
              workData["2-3年"] += item.num;
            }
            if (item.seniority == 3) {
              workData["3-4年"] += item.num;
            }
            if (item.seniority == 4) {
              workData["4-5年"] += item.num;
            }
            if (item.seniority >= 5) {
              workData["5年以上"] += item.num;
            }
          });
          this.workName = Object.keys(workData);
          this.workValue = Object.values(workData);
          this.$nextTick(() => {
            this.$refs.work.start(); // 调用 ECharts 组件的初始化方法
          });
          console.log("workAge", this.workName, this.workValue);
        }
      });
    },
    marriageDeal(data) {
      setTimeout(() => {
        this.marriageArr = [
          {
            name: "火车",
            value: 20,
          },
          {
            name: "飞机",
            value: 10,
          },
          {
            name: "客车",
            value: 30,
          },
        ];

        console.log("触发11111");
      }, 500);
    },
  },
};
</script>
<style lang='less' scoped>
body,
html {
  height: 100%;
}
// 主体内容
.subjectContent {
  margin-top: 15px;
  margin: 20px 20px 0;
  position:absolute .el-col {
    border-radius: 4px;
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
    height: 270px;
    // // background-color: rgba(224, 236, 211, 0.2);
    margin: 5px 0;
  }
  .bg-purple-light {
    width: 100%;
    height: 60vh;
    // background-color: rgba(224, 236, 211, 0.2);
  }
  .bg-purple-chart {
    margin-top: 6px;
    width: 100%;
    height: 255px;
    // background-color: rgba(224, 236, 211, 0.2);
    padding-top: 2px;
  }
  .ageCom {
    background-image: url("./images/uihomepage/age.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
  }
  .workCom {
    background-image: url("./images/uihomepage/work.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
  }
  .client {
    background-image: url("./images/uihomepage/客户分布-背景框.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
  }
  .deliver {
    background-image: url("./images/uihomepage/交付经理人数分析-背景框.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
  }
  .region {
    background: url(./images/uihomepage/地域分布-背景框.png) no-repeat center;
    background-size: 100% 100%;
  }
  .ageCount {
    width: 90%;
    height: 80%;
    margin-top: 10%;
  }
  .agecountColumn {
    margin-top: 2%;
  }
  .marriageCom {
    background-image: url("./images/uihomepage/bg_marriage.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
  }
}
</style>