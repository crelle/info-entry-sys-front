<template>
    <!-- 内容主体部分 -->
    <div class="subjectContent">
      <div class="large_left">
        <div class=" bg-purple gender">
            <gender-com class="ageCount" v-if="resizeFlag"></gender-com>
          </div>
          
          <div class=" ageCom bg-purple">
            <age-com
              class="ageCount"
              :aName="ageName"
              :aValue="ageValue"
              ref="age"
              v-if="resizeFlag"
            ></age-com>
          </div>
          
          <div class=" bg-purple marriageCom">
            <marriage-com
              class="ageCount"
              :dataArr="marriageArr"
              v-if="resizeFlag"
            ></marriage-com>
          </div>
     
      </div>
        <!-- 中间地图 -->
        <div class="large_middle">
          <div class=" bg-purple" style="flex:2;">
            <china v-if="resizeFlag"></china>
          </div>
          <div class="bg-purple region">
            <geographical-distribution
              class="ageCount" style="margin-top:6%;" v-if="resizeFlag"
            ></geographical-distribution>
          </div>
        </div>
          
       
        <!-- 右侧内容 -->
        <div class="large_right">
         
            <div class="bg-purple workCom">
            <age-com
              class="ageCount"
              :aName="workName"
              :aValue="workValue"
              ref="work"
              v-if="resizeFlag"
            ></age-com>
          </div>
         
          <div class="bg-purple client" >
            <radarchart class="ageCount" v-if="resizeFlag"></radarchart>
          </div>
     
          <div class="bg-purple deliver">
            <delivery-manager class="ageCount" v-if="resizeFlag"></delivery-manager>
          </div>
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
import genderCom from "./genderCom.vue";
import { employeeAge, employeeSeniority } from "@/api/largeScreen";
import { manualPage } from "@/api/dictionary";
export default {
  name: "index",
  components: {
    China,
    ageCom,
    Radarchart,
    DeliveryManager,
    marriageCom,
    GeographicalDistribution,
    genderCom,
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
      resizeFlag:true,
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
    this.queryDictionary();
    window.addEventListener("resize", () => this.Refresh())
  },
  destroyed() {
    window.removeEventListener("resize", this.Refresh());
  },
  methods: {
    Refresh(){
      this.resizeFlag=false
      this.$nextTick(() => {
        this.resizeFlag=true; 
      });
    },
    ageDeal(age) {
      this.ageName = ["50后", "60后", "70后", "80后", "90后", "00后"];
      this.ageValue = [20, 35, 50, 30, 60, 15];
      this.$nextTick(() => {
        this.$refs.age.start();
      });
      // employeeAge(age).then((res) => {
      //   if (res && res.code && res.code === "00000") {
      //     let dataArr = {};
      //     res.data.forEach((item) => {
      //       let name = String(item.birthdayYear).substr(2, 1) + "0后";
      //       dataArr[name] = dataArr[name] ? dataArr[name] + item.num : item.num;
      //     });
      //     this.ageName = Object.keys(dataArr).reverse();
      //     this.ageValue = Object.values(dataArr).reverse();
      //     // this.ageValue=this.ageFirst(Object.values(dataArr)).reverse()
      //     this.$nextTick(() => {
      //   this.$refs.age.start(); // 调用 ECharts 组件的初始化方法
      // });
      //   }
      // });
    },
    workAge(data) {
      this.workName = ["1年以下", "1-2年", "2-3年", "3-4年", "5年以上"];
      this.workValue = [20, 35, 50, 30, 60];
      this.$nextTick(() => {
        this.$refs.work.start(); // 调用 ECharts 组件的初始化方法
      });
      console.log("workAge", this.workName, this.workValue);
    },

  marriageDeal(data) {
    setTimeout(() => {
      this.marriageArr = [
        {
          name: "已婚已育",
          value: 380,
        },
        {
          name: "已婚未育",
          value: 200,
        },
        {
          name: "未婚未育",
          value: 800,
        },
      ];
      console.log("触发11111");
    }, 500);
  },
  queryDictionary() {
    manualPage({
      records: [
        {
          childrenName: "",
          name: "",
        },
      ],
      size: 10000000,
      current: 1,
    }).then((res) => {
      if (res && res.code && res.code === "00000") {
        sessionStorage.setItem(
          "dictionaryList",
          JSON.stringify(res.data.records)
        );
      }
    });
  },
}
};
</script>
<style lang='less' scoped>
// 主体内容
.subjectContent {
  height: 100%;
  display: flex;
  .large_left,
  .large_right{
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .large_middle{
    flex: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .bg-purple{
    flex: 1;
    margin: 5px 0;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
}
.ageCount {
    width: 90%;
    height: 80%;
    // box-sizing: content-box;
    // padding: 10%;
    margin-top: 10%;
  }
  .ageCom {
    background: url("./images/uihomepage/age.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }
  .workCom {
    background: url("./images/uihomepage/work.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }
  .client {
    background: url("./images/uihomepage/客户分布-背景框.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }
  .deliver {
    background: url("./images/uihomepage/交付经理人数分析-背景框.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }
  .region {
    background: url(./images/uihomepage/地域分布-背景框.png) no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  
  }
  
  .marriageCom {
    background: url("./images/uihomepage/bg_marriage.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }
  .gender {
    background: url("./images/uihomepage/gender.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }

</style>