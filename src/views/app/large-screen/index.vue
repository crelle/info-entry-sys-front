<template>
  <div id="largescreen">
    <el-row :gutter="10">
      <el-col :lg="24" :md="24" :sm="24" :xs="24">
        <!-- <top-header/> -->
      </el-col>
    </el-row>
    <el-row :gutter="10" style="padding: 10px; height: calc(100% - 60px)">
      <el-col :lg="6" :md="6" :sm="24" :xs="24"> </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xs="24">
        <div class="date-range">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            align="right"
            size="mini"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div class="map-item-amounts">大屏 {{ amounts }} 数据</div>
        <china />
        <!-- <chinaess /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import China from "./components/china-map.vue";
import Chinaess from "./components/china-map-copy.vue";

export default {
  name: "index",
  components: {
    China,
    Chinaess
  },
  data() {
    return {
      areaCode: "000000000000", // 当前用的areaCode
      areaLevel: 0, // 当前用的areaCode
      areaName: "china", // 当前用的areaName
      mapNameList: [], // 当前地图上的地区名字
      mapCodeList: [], // 当前地图上的地区Code
      largescreenPcStyle: {
        position: "fixed",
        top: 0,
        left: 0,
      },
      queryParams: {},
      areaStatistic: [], // 测试
      amounts: 0, // 测试
      dayStaCount: [], // 测试
      satisfied: {}, // 测试
      timedComplain: [], // 测试
      todayPvNumber: [], // 测试
      daTjInformation: [], // 测试
      daTjItemsInfo: [], // 测试
      complaintOverview: {}, // 测试
      pageview: {}, // 测试
      totalPublish: 0, // 测试
      totalItems: 0, // 测试
      thirdPlatform: 0, // 测试
      dateRange: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  methods: {
  },
};
</script>

<style scoped lang="less">
::v-deep#largescreen {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  padding: 0;
  // background-image: url("../assets/images/largescreen/home-bg.png");

  .el-col {
    height: 100%;
    position: relative;

    .date-range {
      position: absolute;
      right: 5px;
      z-index: 9;

      .el-date-editor {
        background: transparent;
        border-color: rgb(0, 186, 255);
        width: 250px;

        .el-icon-date {
          color: #fff;
        }

        .el-range-separator {
          color: #fff;
        }

        .el-range__close-icon {
          color: #fff;
        }

        .el-range-input {
          background: transparent;
          color: #fff;
        }
      }
    }

    .map-item-amounts {
      position: absolute;
      z-index: 9;
      left: 10px;
      top: 30px;
      color: #fff;
      font-size: 16px;
      color: #24cff4;
    }
  }

  .el-carousel {
    height: calc(33.3%);
    //margin-bottom: 10px;
    .el-carousel__container {
      height: 100%;
    }

    .el-carousel__indicator--horizontal {
      padding: 3px;
    }
  }
}
</style>
