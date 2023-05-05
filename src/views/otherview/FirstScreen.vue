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
      <el-row :gutter="24" style="margin-bottom: 25px">
        <el-col :span="12">
          <div class="echarts_map">
            <!-- 部门人数 -->
            <e-charts class="chart" :option="department" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="echarts_map">
            <!-- 地域人数 -->
            <e-charts class="chart" :option="area" />
          </div>
        </el-col>
        <!-- 技能人数 -->
        <!-- <el-col :span="8">
          <div class="echarts_map">
            
            <e-charts class="chart" :option="skill" />
          </div>
        </el-col> -->
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="echarts_map">
            <!-- 客户 人数 -->
            <e-charts class="chart" :option="project" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="echarts_map">
            <!-- 负责人管理人数分析 -->
            <e-charts class="chart" :option="user" />
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left"></el-divider>
    <div class="lis">
      <el-col :span="7">
        <el-card header="客户A" shadow="hover">
          <el-card shadow="hover">
            <div class="block">
              <span class="demonstration">
                <span style="font-weight: bold; font-size: 18px">项目：</span
                ><span>XXXX项目</span></span
              >
              <el-carousel height="285px" :autoplay="false">
                <el-carousel-item v-for="item in 5" :key="item">
                  <ul>
                    <li>
                      <span>岗位名：</span><span>{{ item }}岗位</span>
                    </li>
                    <li>9/10（当前满足需求人数）</li>
                    <li><span>发布日期 ：</span><span>2023/1/3</span></li>
                    <li><span>最晚到港时间 ：</span><span>2023/1/19</span></li>
                  </ul>
                  <ul class="contents_box">
                    <li class="post_lis">
                      <span>岗位职责：</span>
                      <div class="content_post">
                        <p
                          title="sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯"
                        >
                          1、2023--------asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                          2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                          <br />
                          3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯dfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>岗位要求：</span>
                      <div class="content_post">
                        3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        1、asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                        2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                        <br />
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card header="客户A" shadow="hover">
          <el-card shadow="hover">
            <div class="block">
              <span class="demonstration">
                <span style="font-weight: bold; font-size: 18px">项目：</span
                ><span>XXXX项目</span></span
              >
              <el-carousel height="285px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                  <ul>
                    <li><span>岗位名：</span><span>XXXX岗位</span></li>
                    <li>9/10（当前满足需求人数）</li>
                    <li><span>发布日期 ：</span><span>2023/1/3</span></li>
                    <li><span>最晚到港时间 ：</span><span>2023/1/19</span></li>
                  </ul>
                  <ul class="contents_box">
                    <li class="post_lis">
                      <span>岗位职责：</span>
                      <div class="content_post">
                        <p
                          title="sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯"
                        >
                          1、2023--------asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                          2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                          <br />
                          3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯dfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>岗位要求：</span>
                      <div class="content_post">
                        3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        1、asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                        2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                        <br />
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card header="客户B" shadow="hover">
          <el-card shadow="hover">
            <div class="block">
              <span class="demonstration">
                <span style="font-weight: bold; font-size: 18px">项目：</span
                ><span>XXXX项目</span></span
              >
              <el-carousel height="285px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                  <ul>
                    <li><span>岗位名：</span><span>XXXX岗位</span></li>
                    <li>9/10（当前满足需求人数）</li>
                    <li><span>发布日期 ：</span><span>2023/1/3</span></li>
                    <li><span>最晚到港时间 ：</span><span>2023/1/19</span></li>
                  </ul>
                  <ul class="contents_box">
                    <li class="post_lis">
                      <span>岗位职责：</span>
                      <div class="content_post">
                        <p
                          title="sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯"
                        >
                          1、2023--------asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                          2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                          <br />
                          3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯dfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>岗位要求：</span>
                      <div class="content_post">
                        3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        1、asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                        2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                        <br />
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card header="客户B" shadow="hover">
          <el-card shadow="hover">
            <div class="block">
              <span class="demonstration">
                <span style="font-weight: bold; font-size: 18px">项目：</span
                ><span>XXXX项目</span></span
              >
              <el-carousel height="285px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                  <ul>
                    <li><span>岗位名：</span><span>XXXX岗位</span></li>
                    <li>9/10（当前满足需求人数）</li>
                    <li><span>发布日期 ：</span><span>2023/1/3</span></li>
                    <li><span>最晚到港时间 ：</span><span>2023/1/19</span></li>
                  </ul>
                  <ul class="contents_box">
                    <li class="post_lis">
                      <span>岗位职责：</span>
                      <div class="content_post">
                        <p
                          title="sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯"
                        >
                          1、2023--------asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                          2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                          <br />
                          3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯dfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>岗位要求：</span>
                      <div class="content_post">
                        3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        1、asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                        2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                        <br />
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card header="客户B" shadow="hover">
          <el-card shadow="hover">
            <div class="block">
              <span class="demonstration">
                <span style="font-weight: bold; font-size: 18px">项目：</span
                ><span>XXXX项目</span></span
              >
              <el-carousel height="285px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                  <ul>
                    <li><span>岗位名：</span><span>XXXX岗位</span></li>
                    <li>9/10（当前满足需求人数）</li>
                    <li><span>发布日期 ：</span><span>2023/1/3</span></li>
                    <li><span>最晚到港时间 ：</span><span>2023/1/19</span></li>
                  </ul>
                  <ul class="contents_box">
                    <li class="post_lis">
                      <span>岗位职责：</span>
                      <div class="content_post">
                        <p
                          title="sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯"
                        >
                          1、2023--------asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                          2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                          <br />
                          3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯dfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>岗位要求：</span>
                      <div class="content_post">
                        3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        1、asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                        2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                        <br />
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card header="客户B" shadow="hover">
          <el-card shadow="hover">
            <div class="block">
              <span class="demonstration">
                <span style="font-weight: bold; font-size: 18px">项目：</span
                ><span>XXXX项目</span></span
              >
              <el-carousel height="285px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                  <ul>
                    <li><span>岗位名：</span><span>XXXX岗位</span></li>
                    <li>9/10（当前满足需求人数）</li>
                    <li><span>发布日期 ：</span><span>2023/1/3</span></li>
                    <li><span>最晚到港时间 ：</span><span>2023/1/19</span></li>
                  </ul>
                  <ul class="contents_box">
                    <li class="post_lis">
                      <span>岗位职责：</span>
                      <div class="content_post">
                        <p
                          title="sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯"
                        >
                          1、2023--------asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                          2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                          <br />
                          3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯dfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>岗位要求：</span>
                      <div class="content_post">
                        3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        1、asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                        2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                        <br />
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-card>
      </el-col>

      <el-col :span="7">
        <el-card header="客户C" shadow="hover">
          <el-card shadow="hover">
            <div class="block">
              <span class="demonstration">
                <span style="font-weight: bold; font-size: 18px">项目：</span
                ><span>XXXX项目</span></span
              >
              <el-carousel height="285px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                  <ul>
                    <li><span>岗位名：</span><span>XXXX岗位</span></li>
                    <li>9/10（当前满足需求人数）</li>
                    <li><span>发布日期 ：</span><span>2023/1/3</span></li>
                    <li><span>最晚到港时间 ：</span><span>2023/1/19</span></li>
                  </ul>
                  <ul class="contents_box">
                    <li class="post_lis">
                      <span>岗位职责：</span>
                      <div class="content_post">
                        <p
                          title="sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯"
                        >
                          1、2023--------asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                          2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                          <br />
                          3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfssdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯sdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯dfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>岗位要求：</span>
                      <div class="content_post">
                        3、sdfsdffsdfsdfsxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达dfsdsdf
                        1、asdac阿斯达c阿斯达c阿斯达c阿斯达sdsd<br />
                        2、zxc阿斯c阿斯达fsdfsdfsdfsdc阿斯达c阿斯达达萨达
                        <br />
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
// 首页
import { departmentAnalysis, regionAnalysis } from "@/api/reportform";
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
      // skillData: this.getRandomData(),
      // areaData: [],
      projectData: [],
      tableData: [],
      userdetail: {},
      // 全部用户（负责人）
      queryUserData: [],
      // 全部部门
      queryDepartmentsData: [],
      // 全部员工
      tableDataLook: [],
      // 全部地域
      MockUserLook: [],
      // 全部项目
      tableProjectLook: [],
      // 全部客户
      tableCustomerLook: [],
      // 部门分析
      departmentAly: [],
      // 地域分析
      regionalAly: [],
      // 项目分析
      projectAly: [],
      // 客户分析
      customerAly: [],
      // 用户（负责人）分析
      userAly: [],
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
    // this.skillData = this.getRandomData();
    // setInterval(() => {
    //   this.departmentData = this.getRandomDatabt();
    //   this.skillData = this.getRandomData();
    // }, 3000);
    // 全部部门/人员--部门分析
    this.queryTableList();
    //  首页  分析查询
    this.analysis();
  },
  methods: {
    // 首页  分析查询
    analysis() {
      // let data = { records: [{ ...this.formOptions }] };
      let data = {};
      // data.current = 1;
      // data.size = 999;
      departmentAnalysis(data).then((res) => {
        console.log(res, "--------首页 ---- 部门 --- 分析查询----");
      });
      regionAnalysis(data).then((res) => {
        console.log(res, "--------首页 ---- 地域 --- 分析查询----");
      });
    },

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
                      // 客户
                      queryUser(data).then((res7) => {
                        this.tableDataLook = res.data.records; // 表格数据赋值
                        // console.log(this.tableDataLook, "---全部---员工表格");
                        this.tableProjectLook = res1.data.records; // 项目表格数据赋值
                        // console.log(this.tableProjectLook, "---全部--项目数据表");
                        this.queryDepartmentsData = res2.data.records; // 部门数据表格数据赋值
                        // console.log(this.queryDepartmentsData, "----全部--部门数据表格");
                        this.InterfaceLook = res3.data.records; // 接口人表格数据赋值
                        this.MockUserLook = res4.data.records; // 地域数据表格数据赋值
                        // console.log(this.MockUserLook, "---全部--地域数据表");
                        this.tableCustomerLook = res5.data.records; // 客户表格数据赋值
                        // console.log(this.tableCustomerLook,"---全部--客户数据表");
                        this.tableyPostLook = res6.data.records; // 岗位表格数据赋值
                        // console.log(this.tableyPost, "----------岗位数据");
                        this.queryUserData = res7.data.records; // 用户（负责人）表格数据赋值
                        // console.log( this.queryUserData,"----------用户（负责人）");
                        this.tableDataLook.forEach((item) => {
                          this.tableProjectLook.forEach((items) => {
                            if (item.projectId == items.projectId) {
                              // console.log(items, "------------111");
                              item.project = items.project; //根据项目id给项目名称赋值
                              this.queryDepartmentsData.forEach((itemli) => {
                                if (items.departmentId == itemli.departmentId) {
                                  item.department = itemli.department; //根据项目id查找部门id给部门名称赋值
                                  item.departmentId = itemli.departmentId; //根据项目id查找部门id给部门id赋值
                                }
                              });
                              // 接口人
                              this.InterfaceLook.forEach((itemis) => {
                                if (items.interfaceId == itemis.interfaceId) {
                                  item.interfaceName = itemis.interfaceName; //根据项目id查找接口人id给接口人名称赋值

                                  // 客户数据表
                                  this.tableCustomerLook.forEach((itemiss) => {
                                    if (
                                      itemis.customerId == itemiss.customerId
                                    ) {
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
                        // 清空 部门分析--------
                        this.departmentAly = [];
                        // 部门详情数据处理--根据全部部门/人员-生成新表 部门分析-departmentAly
                        for (let item of this.queryDepartmentsData) {
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
                        // console.log("部门分析表------", this.departmentAly);
                        // 清空地域分析 -----------
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
                        // console.log("地域分析表------", this.regionalAly);
                        // 清空客户分析 -----------
                        this.customerAly = [];
                        for (let item of this.tableCustomerLook) {
                          this.customerAly.push({
                            name: item.customerName,
                            personnel: [],
                          });
                        }
                        for (let item of this.customerAly) {
                          for (let items of this.tableDataLook) {
                            if (item.name == items.customerName) {
                              item.personnel.push(items);
                            }
                          }
                          // 赋值客户下员工人数
                          item.value = item.personnel.length;
                        }
                        this.projectData = this.customerAly;
                        // console.log("客户分析表------", this.customerAly);
                        // ----------------------2023-1-31 ----------------------------------工作到这-------------
                      });
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
      this.projectData = [];
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
    // 饼图 随机数据
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
    // 图表随机数据
    // getRandomData() {
    //   return [
    //     {
    //       time: "测试",
    //       value: Math.round(Math.random() * 1000),
    //     },
    //     {
    //       time: "JAVA",
    //       value: Math.round(Math.random() * 1000),
    //     },
    //     {
    //       time: "C",
    //       value: Math.round(Math.random() * 1000),
    //     },
    //     {
    //       time: "前端",
    //       value: Math.round(Math.random() * 1000),
    //     },
    //     {
    //       time: "产品",
    //       value: Math.round(Math.random() * 1000),
    //     },
    //   ];
    // },
  },
  computed: {
    // 饼图 部门人数分析
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
    // 饼图 负责人管理人数分析
    user() {
      return {
        title: {
          text: "负责人管理人数分析",
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
            radius: "50%",
            // radius: ["40%", "55%"],
            data: this.userAly,
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
    // //图表
    // skill() {
    //   return {
    //     title: {
    //       text: "技能人数分析",
    //       left: "center",
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "shadow",
    //       },
    //     },
    //     xAxis: {
    //       type: "value",
    //       boundaryGap: [0, 0.01],
    //       splitLine: {
    //         // 网格线
    //         show: false,
    //       },
    //     },
    //     yAxis: {
    //       type: "category",
    //       data: this.skillData.map((d) => d.time),
    //       axisLabel: {
    //         // y轴文字的配置
    //         show: true,
    //         interval: 0,
    //         textStyle: {
    //           align: "right",
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         name: "技能",
    //         type: "bar",
    //         data: this.skillData.map((d) => d.value),
    //         barWidth: 30,
    //         label: {
    //           show: true, // 开启显示
    //           position: "right", // 在上方显示
    //           textStyle: {
    //             fontSize: 15,
    //           },
    //         },
    //         itemStyle: {
    //           normal: {
    //             //这里是颜色
    //             color: "#5a9bd5",
    //           },
    //         },
    //       },
    //     ],
    //   };
    // },
    project() {
      return {
        title: {
          text: "客户人数分析",
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
            formatter: function (params) {
              // console.log("formatter", params, params.length);
              var newParamsName = ""; // 最终拼接成的字符串
              var paramsNameNumber = params.length; // 实际标签的个数
              var provideNumber = 4; // 每行能显示的字的个数
              // 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
              if (paramsNameNumber > provideNumber) {
                // ********重点在这里********
                newParamsName = params.substring(0, 3) + "..."; // 最终拼成的字符串
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              // 将最终的字符串返回
              return newParamsName;
            },
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "人数",
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
            name: "人数",
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
// 卡片
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
::v-deep .el-card__header {
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
}
::v-deep .el-card__body {
  padding: 5px 15px 0;
  margin-bottom: 0;
}
::v-deep .is-hover-shadow {
  margin-bottom: 0;
}
::v-deep .el-col-7 {
  margin-top: 20px;
  width: 32.35%;
}
.lis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  li {
    margin: 5px 0;
    span:nth-child(1) {
      font-weight: bold;
    }
  }
  ul:nth-child(1) {
    li:nth-child(1) {
      font-size: 17px;
      // color: #ffdc60;
    }
    li:nth-child(2) {
      font-size: 16px;
      // color: #ffdc60;
    }
    li:nth-child(3) {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
      // color: #ffdc60;
    }
  }
}
.post_lis {
  margin: 5px 0;
}
.content_post {
  p {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 超出几行省略 */
  }
  span {
    display: block;
  }
}
p {
  margin: 0;
}
// 轮播
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
::v-deep .el-carousel__button {
  background-color: #475669;
}
::v-deep .el-carousel__indicator--horizontal {
  padding: 0 4px;
}
::v-deep .el-carousel__indicators--horizontal {
  width: 430px;
  text-align: center;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* 超出几行省略 */
}
::v-deep .contents_box {
  font-size: 14px !important;
  color: rgb(134, 11, 11);
}
</style>