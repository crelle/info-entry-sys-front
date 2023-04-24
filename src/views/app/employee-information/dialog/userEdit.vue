<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
      lock-scroll
      @close="closeDialog"
      class="showAll_dialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form
                :model="userEditForm"
                :rules="userEditFormRules"
                ref="userEditRef"
                size="mini"
              >
                <div class="box_n">
                  <div class="box_li">
                    <el-form-item label="员工姓名" prop="name">
                      <el-input
                        placeholder="员工姓名"
                        v-model="userEditForm.name"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月" prop="birthday">
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="userEditForm.birthday"
                          style="width: 100%"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="cellPhone">
                      <el-input
                        placeholder="联系电话"
                        v-model="userEditForm.cellPhone"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="最高学历" prop="education">
                      <!--  必填属性 required -->
                      <el-select
                        v-model="userEditForm.education"
                        placeholder="最高学历"
                        clearable
                      >
                        <el-option
                          label="博士研究生"
                          value="博士研究生"
                        ></el-option>
                        <el-option
                          label="硕士研究生"
                          value="硕士研究生"
                        ></el-option>
                        <el-option label="本科" value="本科"></el-option>
                        <el-option label="专科" value="专科"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="毕业时间" prop="schoolTime">
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月dd日"
                          value-format="yyyy-MM-dd"
                          v-model="userEditForm.schoolTime"
                          style="width: 100%"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="工号" prop="jobNo">
                      <el-input
                        :disabled="jobNo_state"
                        placeholder="工号"
                        v-model="userEditForm.jobNo"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="项目" prop="projectId">
                      <el-select
                        v-model="userEditForm.projectId"
                        placeholder="请选择项目"
                        filterable
                        clearable
                        @change="queryson"
                      >
                        <el-option
                          v-for="item in tableProject"
                          :key="item.index"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="部门" prop="department">
                      <el-input
                        v-model="userEditForm.department"
                        placeholder="部门"
                        disabled
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="客户" prop="customerName">
                      <el-input
                        v-model="userEditForm.customerName"
                        placeholder="客户"
                        disabled
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="户籍地" prop="nativeAddress">
                      <el-input
                        placeholder="户籍地"
                        v-model="userEditForm.nativeAddress"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="婚姻状况" prop="marriage">
                      <el-select
                        v-model="userEditForm.marriage"
                        placeholder="请选择婚姻状况"
                        clearable
                      >
                        <el-option label="已婚" value="已婚"></el-option>
                        <el-option label="未婚" value="未婚"></el-option>
                        <el-option label="未知" value="未知"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="紧急联系人" prop="emergency">
                      <el-input
                        placeholder="紧急联系人"
                        v-model="userEditForm.emergency"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="证书" prop="certificate">
                      <el-input
                        placeholder="证书"
                        v-model="userEditForm.certificate"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="兴趣爱好" prop="hobby">
                      <el-input
                        placeholder="兴趣爱好"
                        v-model="userEditForm.hobby"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="box_li">
                    <el-form-item label="性别" prop="gender">
                      <el-select
                        v-model="userEditForm.gender"
                        placeholder="请选择性别"
                        clearable
                      >
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                      <el-input
                        v-model="userEditForm.age"
                        placeholder="请输入年龄"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input
                        placeholder="电子邮箱"
                        v-model="userEditForm.email"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="毕业院校" prop="school">
                      <el-input
                        placeholder="毕业院校"
                        v-model="userEditForm.school"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="工作年限" prop="workingHours">
                      <el-input
                        placeholder="工作年限"
                        v-model="userEditForm.workingHours"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="入职时间" prop="time">
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月dd日"
                          value-format="yyyy-MM-dd"
                          v-model="userEditForm.time"
                          style="width: 100%"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="工作技能" prop="skill">
                      <el-select
                        v-model="userEditForm.skill"
                        placeholder="请选择工作技能"
                        clearable
                      >
                        <el-option label="Web" value="Web"></el-option>
                        <el-option label="UI" value="UI"></el-option>
                        <el-option label="Java" value="Java"></el-option>
                        <el-option label="测试" value="测试"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="岗位 :" prop="postId">
                      <el-select
                        v-model="userEditForm.postId"
                        placeholder="请选择岗位"
                        filterable
                        clearable
                      >
                        <el-option
                          v-for="item in tableyPost"
                          :key="item.index"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="地域" prop="regionName">
                      <el-input
                        v-model="userEditForm.regionName"
                        placeholder="地域"
                        disabled
                      >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="接口人" prop="interfaceName">
                      <el-input
                        v-model="userEditForm.interfaceName"
                        placeholder="接口人"
                        disabled
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="现居住地" prop="residence">
                      <el-input
                        placeholder="现居住地"
                        v-model="userEditForm.residence"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="有无小孩" prop="child">
                      <el-select
                        v-model="userEditForm.child"
                        placeholder="请选择小孩状况"
                        clearable
                      >
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                        <el-option label="未知" value="未知"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="紧急联系人电话"
                      prop="emergencyTelephone"
                    >
                      <el-input
                        placeholder="请输入紧急联系人电话"
                        v-model="userEditForm.emergencyTelephone"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <!-- <el-form-item label="" prop="password">
                  <el-input
                    class="passwordat"
                    type="email"
                    v-model="userEditForm.password"
                    placeholder="密码"
                    :disabled="true"
                    ><i class="el-icon-message" slot="prepend"></i
                  ></el-input>
                </el-form-item> -->
              </el-form>
            </div>
            <div class="btn">
              <el-button type="primary" size="mini" @click="onCertain"
                >保 存</el-button
              >
              <el-button
                class="cancel"
                type="info"
                @click="closeDialog"
                size="mini"
                >取 消</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/api/employee";

export default {
  props: {
    toChild: String,
    tableData: "",
    // 项目
    tableProject: "",
    // 部门
    Users: "",
    // 接口人
    Interface: "",
    // 客户
    tableCustomer: "",
    // 岗位
    tableyPost: "",
    // 地域
    MockUser: "",
  },
  data() {
    return {
      // 工号是否能修改
      jobNo_state: false,
      // jobNo_state: true,
      // 岗位：
      tableyPostlist: [],
      post: [
        {
          post: "web",
        },
        {
          post: "ui",
        },
        {
          post: "java",
        },
      ],
      dialogFormVisible: false,
      userEditForm: {
        age: "",
        birthday: "",
        cellPhone: "",
        certificate: "",
        child: "",
        education: "",
        email: "",
        emergency: "",
        emergencyTelephone: "",
        gender: "",
        hobby: "",
        jobNo: "",
        marriage: "",
        name: "",
        nativeAddress: "",
        postId: "",
        postName: "",
        projectId: "",
        residence: "",
        school: "",
        schoolTime: "",
        skill: "",
        time: "",
        department: "",
        projectId: "",
        workingHours: "",
        regionId: "",
      },
      initFormData: {},
      // 正则验证
      userEditFormRules: {
        department: [
          {
            required: false,
            message: "请输入部门",
            trigger: ["blur", "change"],
          },
        ],

        jobNo: [
          {
            required: true,
            message: "请输入工号",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
            trigger: "blur",
          },
          {
            pattern: /^[0-9a-zA-Z]{1,}$/,
            message: "工号格式不正确",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入员工姓名",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
            trigger: "blur",
          },
          // {
          //   min: 3,
          //   max: 10,
          //   message: "用户名长度在 3 到 10 个字符",
          //   trigger: "blur",
          // },
        ],
        gender: [
          {
            required: false,
            message: "请选择性别",
            trigger: ["blur", "change"],
          },
        ],
        cellPhone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: false,
            message: "请输入邮箱",
            trigger: ["blur", "change"],
          },
          {
            pattern:
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        customer: [
          {
            required: false,
            message: "请选择客户",
            trigger: ["blur", "change"],
          },
        ],
        interfaceName: [
          {
            required: false,
            message: "请输入接口人",
            trigger: ["blur", "change"],
          },
        ],
        regionName: [
          {
            required: false,
            message: "请输入地域",
            trigger: ["blur", "change"],
          },
        ],
        customerName: [
          {
            required: false,
            message: "请输入客户",
            trigger: ["blur", "change"],
          },
        ],
        age: [
          {
            required: false,
            message: "请输入年龄",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)*$/,
            message: "请输入有效年龄",
            trigger: "blur",
          },
        ],
        birthday: [
          {
            required: false,
            message: "请选择出生日期",
            trigger: ["blur", "change"],
          },
        ],
        politics: [
          {
            required: false,
            message: "请选择政治面貌",
            trigger: ["blur", "change"],
          },
        ],
        nativeAddress: [
          {
            required: false,
            message: "请输入籍贯",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
            trigger: "blur",
          },
          {
            pattern: /^([\u4E00-\u9FA5]|[0-9_-])*$/,
            message: "格式不正确",
            trigger: "blur",
          },
        ],
        residence: [
          {
            required: false,
            message: "请输入住址",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
            trigger: "blur",
          },
          {
            pattern: /^([aA-zZ]|[\u4E00-\u9FA5]|[0-9_-])*$/,
            message: "格式不正确",
            trigger: "blur",
          },
        ],
        emergency: [
          {
            required: false,
            message: "请输入紧急联系人",
            trigger: ["blur", "change"],
          },
          // {
          //   pattern: /^([\u4E00-\u9FA5])*$/,
          //   message: "请输入中文",
          //   trigger: "blur",
          // },
        ],
        emergencyTelephone: [
          {
            required: false,
            message: "请输入紧急联系人电话",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        education: [
          {
            required: false,
            message: "请选择学历",
            trigger: ["blur", "change"],
          },
        ],
        school: [
          {
            required: false,
            message: "请输入学校",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
            trigger: "blur",
          },
          {
            pattern: /^([\u4E00-\u9FA5]|[0-9_/-])*$/,
            message: "学校名格式不正确",
            trigger: "blur",
          },
        ],
        schoolTime: [
          {
            required: false,
            message: "请输入毕业时间",
            trigger: ["blur", "change"],
          },
        ],
        workingHours: [
          {
            required: false,
            message: "请输入工作年限/年",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^([0-9])*$/,
            message: "请输入输入数字",
            trigger: "blur",
          },
        ],
        marriage: [
          {
            required: false,
            message: "请选择婚姻状况",
            trigger: ["blur", "change"],
          },
        ],
        child: [
          {
            required: false,
            message: "请选择小孩情况",
            trigger: ["blur", "change"],
          },
        ],
        certificate: [
          {
            required: false,
            message: "请输入证书",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^([\u4E00-\u9FA5]|[0-9_/-])*$/,
            message: "证书名格式不正确",
            trigger: "blur",
          },
        ],
        hobby: [
          {
            required: false,
            message: "请输入爱好",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
        ],
        skill: [
          {
            required: false,
            message: "请输入技能",
            trigger: ["blur", "change"],
          },
        ],
        time: [
          {
            required: false,
            message: "请输入入职时间",
            trigger: ["blur", "change"],
          },
        ],
        postId: [
          {
            required: false,
            message: "请选择岗位",
            trigger: ["blur", "change"],
          },
        ],
        employee_status: [
          {
            required: true,
            message: "请选择状态",
            trigger: ["blur", "change"],
          },
        ],
        emergency_telephone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    //编辑项目的自动选择
    queryson(e) {
      console.log(this.userEditForm.projectId, "----11111---");
      if (this.userEditForm.projectId) {
        this.userEditForm.postId = "";
        console.log(this.tableProject, "自动选择", "---选择的", e);
        // console.log(this.tableCustomer, "----客户");
        // 项目
        this.tableProject.forEach((item) => {
          if (item.projectId == e) {
            // 部门
            // console.log(item, "----------------------项目1111111");
            this.Users.forEach((items) => {
              if (item.departmentId == items.departmentId) {
                this.userEditForm.department = items.department;
                this.userEditForm.departmentId = items.departmentId;
              }
            });
            // 地域
            this.MockUser.forEach((itemock) => {
              if (item.regionId == itemock.regionId) {
                // console.log(itemock, "我的地域---------");
                this.userEditForm.regionName = itemock.regionName;
                this.userEditForm.regionId = itemock.regionId;
              }
            });
            // 接口人
            this.Interface.forEach((itemli) => {
              if (item.interfaceId == itemli.interfaceId) {
                this.userEditForm.interfaceName = itemli.interfaceName;
                this.userEditForm.interfaceId = itemli.interfaceId;
                // 客户
                this.tableCustomer.forEach((itemlis) => {
                  if (itemli.customerId == itemlis.customerId) {
                    this.userEditForm.customerName = itemlis.customerName;
                    this.userEditForm.customerId = itemlis.customerId;
                  }
                });
              }
            });
          }
        });
      } else {
        this.userEditForm.department = "";
        this.userEditForm.departmentId = "";
        this.userEditForm.regionName = "";
        this.userEditForm.regionId = "";
        this.userEditForm.interfaceName = "";
        this.userEditForm.interfaceId = "";
        this.userEditForm.customerName = "";
        this.userEditForm.customerId = "";
        this.userEditForm.postId = "";
        this.tableyPostlist = [];
      }
      //  根据项目 查询 岗位
      this.tableyPostlist = [];
      this.tableyPost.forEach((itempro) => {
        if (itempro.projectId == e) {
          this.tableyPostlist.push(itempro);
          console.log(itempro, "--------岗位---");
        }
      });
    },
    //初始编辑的自动选择
    querysonss(e) {
      console.log(this.tableProject, "自动选择", "---选择的", e);
      // console.log(this.tableCustomer, "----客户");
      // 项目
      if (e) {
        // this.tableProject.forEach((item) => {
        //   if (item.projectId == e) {
        //     // 部门
        //     // console.log(item, "----------------------项目1111111");
        //     this.Users.forEach((items) => {
        //       if (item.departmentId == items.departmentId) {
        //         this.userEditForm.department = items.department;
        //         this.userEditForm.departmentId = items.departmentId;
        //       }
        //     });
        //     // 地域
        //     this.MockUser.forEach((itemock) => {
        //       if (item.regionId == itemock.regionId) {
        //         // console.log(itemock, "我的地域---------");
        //         this.userEditForm.regionName = itemock.regionName;
        //         this.userEditForm.regionId = itemock.regionId;
        //       }
        //     });
        //     // 接口人
        //     this.Interface.forEach((itemli) => {
        //       if (item.interfaceId == itemli.interfaceId) {
        //         this.userEditForm.interfaceName = itemli.interfaceName;
        //         this.userEditForm.interfaceId = itemli.interfaceId;
        //         // 客户
        //         this.tableCustomer.forEach((itemlis) => {
        //           if (itemli.customerId == itemlis.customerId) {
        //             this.userEditForm.customerName = itemlis.customerName;
        //             this.userEditForm.customerId = itemlis.customerId;
        //           }
        //         });
        //       }
        //     });
        //   }
        // });
        // //  根据项目 查询 岗位
        this.tableyPostlist = [];
        this.tableyPost.forEach((itempro) => {
          if (itempro.projectId == e) {
            this.tableyPostlist.push(itempro);
            console.log(itempro, "--------岗位---");
          }
        });
      }
      // else {
      //   this.userEditForm.department = "";
      //   this.userEditForm.departmentId = "";
      //   this.userEditForm.regionName = "";
      //   this.userEditForm.regionId = "";
      //   this.userEditForm.interfaceName = "";
      //   this.userEditForm.interfaceId = "";
      //   this.userEditForm.customerName = "";
      //   this.userEditForm.customerId = "";
      //   this.userEditForm.postId = "";
      //   this.tableyPostlist = [];
      // }
    },
    // 查询岗位
    // 弹窗
    openDialog(row) {
      this.dialogFormVisible = true; // 让弹窗显示
      this.userEditForm.jobNo = "";
      this.initFormData = {};
      if (row) {
        console.log("我是修改---", row);
        this.jobNo_state = true;
        this.initFormData = row;
        if (row.postName == null) {
          row.postId = "";
          row.postName = "";
          this.$nextTick(() => {
            // 这个要加上
            this.initForm(row); // 为表单赋值
            this.querysonss(row.projectId);
          });
        } else {
          this.$nextTick(() => {
            // 这个要加上
            this.initForm(row); // 为表单赋值
            this.querysonss(row.projectId);
          });
        }
      } else {
        console.log("我是新增-----");
        this.jobNo_state = false;
      }
    },
    initForm(data) {
      Object.keys(this.userEditForm).forEach((item) => {
        this.userEditForm[item] = data[item] ? data[item] : null;
      });
    },
    closeDialog() {
      this.$refs["userEditRef"].resetFields();
      this.resetForm("userEditRef"); // 重置表单
      this.dialogFormVisible = false;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.userEditForm.department = "";
      this.userEditForm.departmentId = "";
      this.userEditForm.regionName = "";
      this.userEditForm.regionId = "";
      this.userEditForm.interfaceName = "";
      this.userEditForm.interfaceId = "";
      this.userEditForm.customerName = "";
      this.userEditForm.customerId = "";
      this.userEditForm.postId = "";
      this.tableyPostlist = [];
    },
    /* 保存  */
    onCertain() {
      // console.log(this.userEditForm, "-----信息");
      if (this.toChild == "编辑员工信息") {
        this.userEditForm.jobNo = this.initFormData.jobNo;
        // this.initFormData = this.userEditForm;
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            console.log(this.userEditForm, "---修改传入的内容---------");
            updateEmployee(this.userEditForm).then((res) => {
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                this.$parent.queryTableList();
                this.$parent.querySearch();
                this.$parent.searchHeader();
                this.dialogFormVisible = false;
              }
            });
          } else {
            return false;
          }
        });
      } else {
        // 创建
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            console.log(this.userEditForm, "-----------创建传入的内容");
            createEmployee(this.userEditForm).then((res) => {
              if (res && res.code && res.code === "00000") {
                this.$message.success("创建成功！");
                this.$parent.queryTableList();
                this.$parent.querySearch();
                this.$parent.searchHeader();
                this.closeDialog();
              }
            });
          } else {
            return false;
          }
        });
      }
    },
  },
};
</script>


<style lang="less" scoped>
@deep: ~">>>";
@{deep} .register_form_main {
  position: relative;
  min-width: 30%;
  overflow: hidden;
  > span {
    display: block;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    padding: 20px 0;
    color: #409eff;
    background-color: #383f49;
    text-shadow: 0 1px -3px #409eff;
  }
  .grid-content-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    .avatar-uploader .el-upload {
      border: 1px dashed #8c939d;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
    .demo-image__lazy {
      height: 88px;
      .el-image {
        width: 80px;
        height: 80px;
        border: 1px solid #eee;
        margin: 2px;
      }
      .default_img_chioce {
        &::before {
          width: 80px;
          height: 80px;
          background-color: rgba(139, 197, 252, 0.5);
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          content: "已选";
          color: #409eff;
          font-size: 12px;
        }
      }
    }
  }
}
.el-form {
  padding: 0 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .el-input-group__append {
    padding: 0 2px;
  }
}
.passwordat {
  display: none;
}
.el-form-item {
  display: flex;
  justify-content: center;
}
::v-deep .el-form-item__label {
  width: 125px !important;
  text-align: left;
}
::v-deep .el-input__inner {
  width: 180px;
  color: #606266 !important;
}
::v-deep .el-textarea__inner {
  min-height: 110px !important;
  width: 684px;
  color: #606266;
  font-size: inherit !important;
}
::v-deep .el-dialog {
  width: 50%;
}

::v-deep .el-dialog__body {
  padding: 0 20px;
}
.btn {
  text-align: right;
  margin: 2px 0 20px;
}
// 修改对话框高度 滚动条
.showAll_dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ::v-deep .el-dialog {
    margin: 0 auto !important;
    height: 83%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
      // 下边设置字体，我的需求是黑底白字
      color: #606266;
      line-height: 30px;
      padding: 0 15px;
    }
  }
}
.box_n {
  width: 910px;
  padding-top: 13px;
  display: flex;
  justify-content: space-around;
  .box_li {
    margin: 0 15px;
  }
}
::v-deep .el-dialog {
  min-width: 700px;
}
</style>