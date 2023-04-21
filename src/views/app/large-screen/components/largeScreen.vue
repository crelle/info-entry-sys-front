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
            <age-com class="ageCount" :aName="ageName" :aValue="ageValue"  v-if="aa"></age-com>
          </div>
          <!-- 左侧下 -->
          <div class="grid-content bg-purple">
            <span>婚育情况</span>
          </div>
        </el-col>
        <!-- 中间地图 -->
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light">
            <!-- <china></china> -->
          </div>
          <div class="grid-content bg-purple-chart">
            <span>图表</span>
          </div>
        </el-col>
        <!-- 右侧内容 -->
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <!-- 右侧上 -->
          <div class="grid-content bg-purple workCom" >
            <age-com class="ageCount" :aName="workName" :aValue="workValue"  v-if="bb" ></age-com>
          </div>
          <!-- 右侧中  客户分布-->
          <div class="grid-content guestDepartment bg-purple">
            <radarchart> </radarchart>
          </div>
          <!-- 右侧下 -->
          <div class="grid-content bg-purple cakeBackground">
            <!-- 3D饼图 -->
            <delivery-manager></delivery-manager>
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
import { employeeAge, employeeSeniority } from "@/api/largeScreen";
export default {
  name: "index",
  components: {
    China,
    ageCom,
    Radarchart,
    DeliveryManager,
  },
  data() {
    return {
      ageData: {
        departmentName: "",
        regionName: "",
      },
      woekAgeData:{
        departmentName: "",
        regionName: "",
      },
      ageName:[],
      ageValue:[],
      aa:0,
      bb:0,
      workName:[],
      workValue:[]
    };
  },
  //菜单生成部分
  computed: {},
  watch: {
    // 侦听路由 路由改变则联动菜单
  },
  mounted() {
    this.ageDeal(this.ageData);
    this.workAge(this.woekAgeData)
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
          this.ageName=Object.keys(dataArr).reverse()
          this.ageValue=Object.values(dataArr).reverse()
          // this.ageValue=this.ageFirst(Object.values(dataArr)).reverse()
          this.aa=1
          // console.log( this.$refs.ageCom);
          // this.$refs.ageCom.test()
        }
      });
    },
    // ageFirst(data) {
    //   const total = data.reduce((acc, val) => acc + val, 0);
    //   const percentages = data.map((val) => Math.round((val / total) * 100));
    //   let sumPercentages = percentages.reduce((acc, val) => acc + val, 0);
    //   while (sumPercentages !== 100) {
    //     const maxPercentage = Math.max(...percentages);
    //     const maxPercentageIndex = percentages.indexOf(maxPercentage);
    //     percentages[maxPercentageIndex] -= sumPercentages - 100;
    //     sumPercentages = percentages.reduce((acc, val) => acc + val, 0);
    //   }
    //   return percentages;
    // },
    workAge(data){
      employeeSeniority(data).then(res=>{
        if (res && res.code && res.code === "00000") {
          let workData={'1年以下':0,'1-2年':0,'2-3年':0,'3-4年':0,'4-5年':0,'5年以上':0}
          res.data.forEach(item=>{
            if(item.seniority==0){
              workData['1年以下']+=item.num
            }
            if(item.seniority==1){
              workData['1-2年']+=item.num
            }
            if(item.seniority==2){
              workData['2-3年']+=item.num
            }
            if(item.seniority==3){
              workData['3-4年']+=item.num
            }
            if(item.seniority==4){
              workData['4-5年']+=item.num
            }
            if(item.seniority>=5){
              workData['5年以上']+=item.num
            }

          })
          this.workName=Object.keys(workData)
          this.workValue=Object.values(workData)
          this.bb=1
          console.log('workAge',this.workName,this.workValue);
        }
        
      })
    }
  },
};
</script>
<style lang='less'>
</style>
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
  .bg-purple-dark {
    // background: #99a9bf;
  }
  .bg-purple {
    // background: #d3dce6;
  }
  .bg-purple-light {
    // background: #e5e9f2;
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
    height: 25vh;
    // background-color: rgba(224, 236, 211, 0.2);
  }
  .ageCom {
    background-image: url("./images/uihomepage/age.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    padding-top: 10%;
  }
  .workCom{
    background-image: url("./images/uihomepage/work.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    padding-top: 10%;
  }
  .ageCount {
    width: 90%;
    height: 80%;
  }
}
</style>