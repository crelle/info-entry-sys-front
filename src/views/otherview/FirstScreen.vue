<template>
  <div class="firstscreen_content">
    <el-form
      :inline="true"
      :model="formOptions"
      class="demo-form-inline"
      size="mini"
      ref="userQueryRef"
      label-position="right"
    >
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="echarts_map">
            <!-- 部门人数 -->
            <e-charts class="chart" :option="department" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="echarts_map">
            <!-- 地域人数 -->
            <e-charts class="chart" :option="area" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="echarts_map">
            <!-- 技能人数 -->
            <e-charts class="chart" :option="skill" />
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="bottom">
      <div class="project">
        <!-- 项目人数 -->
        <e-charts :option="project" />
      </div>
      <div class="notch">
        <!-- 项目缺口 -->
        <div class="label">项目缺口</div>
        <el-table
          :data="tableData"
          border
          show-summary
          :height="313"
          :summary-method="getSummaries"
          stripe
          :header-cell-style="{ background: '#5a9bd5', color: 'white' }"
          style="width: 100%"
        >
          <el-table-column prop="id" label="" width="130"> </el-table-column>
          <el-table-column prop="amount1" label="产品"> </el-table-column>
          <el-table-column prop="amount2" label="测试"> </el-table-column>
          <el-table-column prop="amount3" label="前端"> </el-table-column>
          <el-table-column prop="amount4" label="C"> </el-table-column>
          <el-table-column prop="amount5" label="JAVA"> </el-table-column>
          <el-table-column prop="total" label="合计"> </el-table-column>
        </el-table>
        <div class="tit">
          注：0/4,0为当前技能人员数，4为当前项目所需技能人员数
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 地域
import { queryRegion } from "@/api/region";
// 部门
import { queryDepartments } from "@/api/department";
// 接口人
import { queryInterface } from "@/api/interface";
// 客户
import { queryCustomer } from "@/api/customer";
// 项目
import { queryProject } from "@/api/project";
// 员工
import { queryEmployee } from "@/api/employee";
// 岗位
import { queryPost } from "@/api/post";
// 用户
import { queryUser } from "@/api/user";
import { Decrypt } from "@/util/crypto/secret";
export default {
  components: {},
  data() {
    return {
      formOptions: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        userPhone: "",
        username: "",
        department: "",
      },

      // departmentData: this.getRandomDatabt(),
      skillData: this.getRandomData(),
      // areaData: [],
      projectData: [],
      tableData: [],
      userdetail: {},
      // 全部部门
      queryUserData: [],
      // 全部员工
      tableDataLook: [],
      // 全部地域
      MockUserLook: [],
      // 部门分析
      departmentAly: [],
      // 地域分析
      regionalAly: [],
    };
  },
  mounted() {
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
    // this.setArea();
    this.setNotch();
    this.setProject();
    // this.departmentData = this.getRandomDatabt();
    this.skillData = this.getRandomData();
    // setInterval(() => {
    //   this.departmentData = this.getRandomDatabt();
    //   this.skillData = this.getRandomData();
    // }, 3000);
    // 全部部门/人员--部门分析
    this.queryTableList();
  },
  methods: {
    // 全部人员/部门--详情
    //table数据
    queryTableList() {
      let data = { records: [{ ...this.formOptions }] };
      data.current = 1;
      data.size = 999;
      queryEmployee(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          queryProject(data).then((res1) => {
            queryDepartments(data).then((res2) => {
              queryInterface(data).then((res3) => {
                queryRegion(data).then((res4) => {
                  queryCustomer(data).then((res5) => {
                    //  数据岗位查询方法
                    queryPost(data).then((res6) => {
                      this.tableyPostLook = res6.data.records; // 岗位表格数据赋值
                      // console.log(this.tableyPost, "----------岗位数据");
                      this.tableDataLook = res.data.records; // 表格数据赋值
                      console.log(this.tableDataLook, "---全部---员工表格");
                      this.tableProjectLook = res1.data.records; // 项目表格数据赋值
                      this.queryUserData = res2.data.records; // 部门数据表格数据赋值
                      // console.log(this.queryUserData, "----全部--部门数据表格");
                      this.InterfaceLook = res3.data.records; // 接口人表格数据赋值
                      this.MockUserLook = res4.data.records; // 地域数据表格数据赋值
                      console.log(this.MockUserLook, "---全部--地域数据表");
                      this.tableCustomerLook = res5.data.records; // 客户表格数据赋值
                      this.tableDataLook.forEach((item) => {
                        this.tableProjectLook.forEach((items) => {
                          if (item.projectId == items.projectId) {
                            // console.log(items, "------------111");
                            item.project = items.project; //根据项目id给项目名称赋值
                            this.queryUserData.forEach((itemli) => {
                              if (items.departmentId == itemli.departmentId) {
                                item.department = itemli.department; //根据项目id查找部门id给部门名称赋值
                                item.departmentId = itemli.departmentId; //根据项目id查找部门id给部门id赋值
                              }
                            });
                            this.InterfaceLook.forEach((itemis) => {
                              if (items.interfaceId == itemis.interfaceId) {
                                item.interfaceName = itemis.interfaceName; //根据项目id查找接口人id给接口人名称赋值
                                this.tableCustomerLook.forEach((itemiss) => {
                                  if (itemis.customerId == itemiss.customerId) {
                                    item.customerName = itemiss.customerName; //根据接口人id 查找客户id给客户名称赋值
                                  }
                                });
                              }
                            });
                            this.MockUserLook.forEach((itemlis) => {
                              if (items.regionId == itemlis.regionId) {
                                item.regionName = itemlis.regionName; //根据项目id查找区域id给区域名称赋值
                              }
                            });
                          }
                        });
                        this.tableyPostLook.forEach((itemls) => {
                          if (item.postId == itemls.postId) {
                            item.postName = itemls.postName; //根据项目id查找岗位id给岗位名称赋值
                            item.postId = itemls.postId; //根据项目id查找岗位id给岗位名称赋值
                          }
                        });
                      });
                      // 清空 部门分析
                      this.departmentAly = [];
                      // 部门详情数据处理--根据全部部门/人员-生成新表 部门分析-departmentAly
                      for (let item of this.queryUserData) {
                        this.departmentAly.push({
                          name: item.department,
                          personnel: [],
                        });
                      }
                      for (let item of this.departmentAly) {
                        for (let items of this.tableDataLook) {
                          if (item.name == items.department) {
                            item.personnel.push(items);
                          }
                        }
                        // 赋值部门人数
                        item.value = item.personnel.length;
                      }
                      console.log("部门分析表------", this.departmentAly);
                      // 清空地域分析
                      this.regionalAly = [];
                       // 地域详情数据处理--根据全部地域/人员-生成新表 地域分析-regionalAly
                      for (let item of this.MockUserLook) {
                        this.regionalAly.push({
                          name: item.regionName,
                          personnel: [],
                        });
                      }
                      for (let item of this.regionalAly) {
                        for (let items of this.tableDataLook) {
                          if (item.name == items.regionName) {
                            item.personnel.push(items);
                          }
                        }
                        // 赋值部门人数
                        item.value = item.personnel.length;
                      }
                      console.log("地域分析表------", this.regionalAly);
                    });
                  });
                });
              });
            });
            // this.paginationOptions.total = res.data.total; // 分页器赋值
          });
        }
      });
    },

    // ----------************---------------**********-------
    // 地域图表数据
    // setArea() {
    //   this.areaData = [
    //     {
    //       name: "南京",
    //       value: 120,
    //     },
    //     {
    //       name: "上海",
    //       value: 200,
    //     },
    //     {
    //       name: "北京",
    //       value: 150,
    //     },
    //     {
    //       name: "杭州",
    //       value: 80,
    //     },
    //     {
    //       name: "大连",
    //       value: 70,
    //     },
    //     {
    //       name: "深圳",
    //       value: 110,
    //     },
    //   ];
    // },
    setProject() {
      this.projectData = [
        {
          name: "合同管理",
          value: 12,
        },
        {
          name: "企业管理",
          value: 20,
        },
        {
          name: "水电app",
          value: 15,
        },
        {
          name: "小程序",
          value: 8,
        },
        {
          name: "融媒体",
          value: 7,
        },
        {
          name: "电力项目",
          value: 11,
        },
        {
          name: "网页数据分析",
          value: 13,
        },
        {
          name: "畅联",
          value: 6,
        },
      ];
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => item[column.property].split("/"));
        sums[index] =
          values.reduce((prev, curr) => {
            return prev + Number(curr[0]);
          }, 0) +
          "/" +
          values.reduce((prev, curr) => {
            return prev + Number(curr[1]);
          }, 0);
      });
      return sums;
    },
    setNotch() {
      this.tableData = [
        {
          id: "华为项目A",
          amount1: "3/4",
          amount2: "3/4",
          amount3: "3/4",
          amount4: "3/4",
          amount5: "3/4",
          total: "15/20",
        },
        {
          id: "华为项目B",
          amount1: "3/4",
          amount2: "3/4",
          amount3: "3/4",
          amount4: "3/4",
          amount5: "3/4",
          total: "15/20",
        },
        {
          id: "华为项目C",
          amount1: "3/4",
          amount2: "3/4",
          amount3: "3/4",
          amount4: "3/4",
          amount5: "3/4",
          total: "15/20",
        },
        {
          id: "华为项目D",
          amount1: "3/4",
          amount2: "3/4",
          amount3: "3/4",
          amount4: "3/4",
          amount5: "3/4",
          total: "15/20",
        },
        {
          id: "华为项目E",
          amount1: "3/4",
          amount2: "3/4",
          amount3: "3/4",
          amount4: "3/4",
          amount5: "3/4",
          total: "15/20",
        },
      ];
    },
    // // 饼图 // 随机数据
    // getRandomDatabt() {
    //   return [
    //     {
    //       name: "部门1",
    //       value: Math.round(Math.random() * 1000),
    //     },
    //     {
    //       name: "部门2",
    //       value: Math.round(Math.random() * 1000),
    //     },
    //     {
    //       name: "部门3",
    //       value: Math.round(Math.random() * 1000),
    //     },
    //   ];
    // },
    // 图表 //随机数据
    getRandomData() {
      return [
        {
          time: "测试",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "JAVA",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "C",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "前端",
          value: Math.round(Math.random() * 1000),
        },
        {
          time: "产品",
          value: Math.round(Math.random() * 1000),
        },
      ];
    },
  },
  computed: {
    // 饼图
    department() {
      return {
        title: {
          text: "部门人数分析",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "部门",
            type: "pie",
            label: {
              show: true,
              position: "outside",
              normal: {
                formatter: "{b}\n{c}",
                fontSize: "14",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            radius: ["40%", "55%"],
            data: this.departmentAly,
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
    skill() {
      return {
        title: {
          text: "技能人数分析",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          splitLine: {
            // 网格线
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: this.skillData.map((d) => d.time),
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
            name: "技能",
            type: "bar",
            data: this.skillData.map((d) => d.value),
            barWidth: 30,
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
                color: "#5a9bd5",
              },
            },
          },
        ],
      };
    },
    project() {
      return {
        title: {
          text: "项目人数分析",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: this.projectData.map((item) => item.name),
          axisLabel: {
            interval: 0,
            rotate: 50, //倾斜的程度
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "项目",
            data: this.projectData.map((item) => item.value),
            type: "bar",
            barWidth: 30,

            itemStyle: {
              normal: {
                //这里是颜色
                color: "#5a9bd5",
              },
            },
          },
        ],
      };
    },
    area() {
      return {
        title: {
          text: "地域人数分析",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: this.regionalAly.map((item) => item.name),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "地域",
            data: this.regionalAly.map((item) => item.value),
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                //这里是颜色
                color: "#5a9bd5",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#696969",
                    fontSize: 16,
                  },
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
/deep/ .el-table td,
.el-table th {
  padding: 10px 0;
}
.el-main {
  background-color: #f3f3f3;
}

.echarts_map {
  min-width: 200px;
  height: 400px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px 10px;
  box-sizing: border-box;
}

.chart {
  height: 400px;
}

.bottom {
  margin-top: 20px;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  .project,
  .notch {
    width: 49%;
    height: 100%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 20px 10px;
    box-sizing: border-box;
  }
  .notch {
    padding-left: 25px;
    padding-right: 25px;
    .label {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: 1px;
      color: #464646;
    }
    .tit {
      text-align: right;
      color: grey;
    }
  }
}
</style>