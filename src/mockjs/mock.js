//mock.js
// 引入mock.js
const Mock = require("mockjs");
// 客户
let getCustomerList = () => {
  let users = [
    {
      id: "1",
      customer: "华为",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "2",
      customer: "中兴",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "3",
      customer: "移动",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "4",
      customer: "联通",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "5",
      customer: "电信",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "6",
      customer: "紫金",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "7",
      customer: "南瑞",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "8",
      customer: "华泰",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "9",
      customer: "南京银行",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
    {
      id: "10",
      customer: "江苏银行",
      region: "南京",
      address: "江苏省南京市雨花台区云密城B栋",
      responsibility: "admin",
      cell_phone: "13084554217",
      Email: "123@qq.com",
    },
  ];
  return users;
};
let getUserList = () => {
  let users = [
    { id: 1, region: "南京" },
    { id: 2, region: "北京" },
    { id: 3, region: "西安" },
    { id: 4, region: "武汉" },
    { id: 5, region: "厦门" },
    { id: 6, region: "大连" },
    { id: 7, region: "南昌" },
    { id: 8, region: "苏州" },
    { id: 9, region: "深圳" },
    { id: 10, region: "上海" },
  ];
  return users;
};
let getUser = () => {
  let users = [
    {
      id: "1",
      department: "研发二部",
      responsibility: "admin",
      job_no: "2131311",
      cell_phone: "13084554217",
      address: "江苏省南京市雨花台区云密城B栋",
      retained: "100%",
      Email: "123@qq.com",
    },
    {
      id: "2",
      department: "研发四部",
      responsibility: "user",
      job_no: "2552341",
      cell_phone: "13082133547",
      address: "江苏省南京市雨花台区云密城B栋",
      retained: "100%",
      Email: "4332@qq.com",
    },
    {
      id: "3",
      department: "研发五部",
      responsibility: "guest",
      job_no: "2558758",
      cell_phone: "13084232551",
      address: "江苏省南京市雨花台区云密城B栋",
      retained: "100%",
      Email: "3212123@qq.com",
    },
  ];
  return users;
};
let getInterfaceList = () => {
  let users = [
    {
      id: "1",
      name: "张三",
      gender: "男",
      cell_phone: "1308455011",
      Email: "123@qq.com",
      address: "江苏省南京市雨花台区云密城B栋",
      customer: "华泰",
      project: "华泰项目",
    },
    {
      id: "2",
      name: "李四",
      gender: "男",
      cell_phone: "1908455011",
      Email: "122213@qq.com",
      address: "江苏省南京市雨花台区云密城B栋",
      customer: "南京银行",
      project: "南京银行项目",
    },
    {
      id: "3",
      name: "王五",
      gender: "男",
      cell_phone: "1708455011",
      Email: "122213@qq.com",
      address: "江苏省南京市雨花台区云密城B栋",
      customer: "移动",
      project: "移动项目",
    },
  ];
  return users;
};
// 项目表
let getProjectList = () => {
  let users = [
    {
      id: "1",
      name: "小红",
      gender: "男",
      cell_phone: "1308455011",
      Email: "123@qq.com",
      customer: "南京",
      status: "开发中",
      department: "研发一部",
      project: "南京项目",
      address: "江苏省南京市雨花台区云密城B栋",
      time: "2022/11/7",
      cooperation: "TM",
      number: "15人",
    },

    {
      id: "3",
      name: "guest",
      gender: "男",
      cell_phone: "1508455011",
      Email: "0112323@qq.com",
      customer: "华泰",
      status: "开发中",
      department: "研发二部",
      project: "华泰项目",
      address: "江苏省南京市雨花台区云密城B栋",
      time: "2022/8/7",
      cooperation: "OD",
      number: "20人",
    },
  ];
  return users;
};
// 员工信息
let getStaffList = () => {
  let users = [
    {
      id: "1",
      job_no: "25015",
      name: "小红",
      gender: "女",
      cell_phone: "1308455011",
      Email: "123@qq.com",
      customer: "南京",
      status: "开发中",
      department: "研发二部",
      project: "南京项目",
      address: "江苏省南京市雨花台区云密城B栋",
      time: "2022/11/7",
      cooperation: "TM",
      Interface: "张三",
      // 详情
      age: "23",
      birthday: "1999/08/01",
      politics: "预备党员",
      Native: "山西大同",
      residence: "南京浦口区万汇城",
      emergency: "红霸霸",
      emergency_telephone: "13915815746",
      education: "本科",
      school: "南京大学",
      school_time: "2022/06/15",
      working_hours: "5年",
      marriage: "已婚",
      child: "有",
      certificate: "无",
      hobby: "爬山",
      skill: "测试",
      Induction: "2022/4/18",
      post: "测试",
      enable_feactivate: true,
      employee_status: "工作中",
      region:"北京"
    },
    {
      id: "2",
      job_no: "12015",
      name: "小蓝",
      gender: "男",
      cell_phone: "13082355011",
      Email: "98123@qq.com",
      customer: "南京",
      status: "开发中",
      department: "研发一部",
      project: "南京项目",
      address: "江苏省南京市雨花台区云密城B栋",
      time: "2022/11/7",
      cooperation: "TM",
      Interface: "李四",
      // 详情
      age: "29",
      birthday: "1987/08/01",
      politics: "中共党员",
      Native: "山西大同",
      residence: "南京浦口区万汇城",
      emergency: "蓝霸霸",
      emergency_telephone: "13915815746",
      education: "本科",
      school: "厦门大学",
      school_time: "2021/06/15",
      working_hours: "4年",
      marriage: "已婚",
      child: "有",
      certificate: "一级证书",
      hobby: "打球",
      skill: "Java",
      Induction: "2022/4/18",
      post: "Java",
      enable_feactivate: false,
      employee_status: "休假中",
      region:"上海"
    },
    {
      id: "3",
      job_no: "55015",
      name: "小黄",
      gender: "男",
      cell_phone: "1304555011",
      Email: "12123@qq.com",
      customer: "南京",
      status: "开发中",
      department: "研发三部",
      project: "南京项目",
      address: "江苏省南京市雨花台区云密城B栋",
      time: "2022/11/7",
      cooperation: "TM",
      Interface: "王五",
      // 详情
      age: "25",
      birthday: "1997/08/01",
      politics: "群众",
      Native: "广东福建",
      residence: "南京江宁区汤山",
      emergency: "黄霸霸",
      emergency_telephone: "13915815746",
      education: "本科",
      school: "北京大学",
      school_time: "2012/06/15",
      working_hours: "3年",
      marriage: "未婚",
      child: "无",
      certificate: "无",
      hobby: "跑步",
      skill: "Web",
      Induction: "2022/5/18",
      post: "Web",
      enable_feactivate: true,
      employee_status: "工作中",
      region:"武汉"
    },
  ];
  return users;
};
// 岗位信息
let getPostList = () => {
  let users = [
    {
      id: "1",
      pstname: "Web开发工程师",
      skill: "UI",
      project: "项目111",
      customer: "华为",
      number: "12人",
      date: "2022/11/10",
      region: "南京",
      place: "南京xxx区xxx",
      duty: "职责1--职责1--职责1--职责1-职责1*职责1职责1职责1*职责1职责1*职责1职责1职责1*职责1职责1*职责1职责1职责1*职责1职责1*职责1职责1职责1*职责1职责1*职责1职责1职责1*职责1职责1*职责1职责1职责1*职责1**职责1*职责1职责1*v",
      requirement: "精通WEB,JAVA,UI.....",
    },
    {
      id: "2",
      pstname: "JAVA开发工程师",
      skill: "JAVA",
      project: "项目222",
      customer: "移动",
      number: "15人",
      date: "2022/11/20",
      region: "北京",
      place: "北京xxx区xxx",
      duty: "职责2",
      requirement: "精通WEB,JAVA,UI.....",
    },
    {
      id: "3",
      pstname: "UI设计工程师",
      skill: "WEB",
      project: "项目333",
      customer: "腾讯",
      number: "5人",
      date: "2022/11/30",
      region: "上海",
      place: "上海xxx区xxx",
      duty: "职责3",
      requirement: "精通WEB,JAVA,UI.....",
    },
  ];
  return users;
};
// 请求该url，就可以返回dataList
Mock.mock("http://localhost:8080/getUserList", getUserList);
Mock.mock("http://localhost:8080/getUser", getUser);
Mock.mock("http://localhost:8080/getCustomerList", getCustomerList);
Mock.mock("http://localhost:8080/getInterfaceList", getInterfaceList);
Mock.mock("http://localhost:8080/getProjectList", getProjectList);
Mock.mock("http://localhost:8080/getStaffList", getStaffList);
Mock.mock("http://localhost:8080/getPostList", getPostList);
