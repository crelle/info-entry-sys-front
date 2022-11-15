//reqMock.js
import axios from "axios";

// 请求模拟数据
// 地域
export const reqMockUser = () => axios.get("http://localhost:8080/getUserList");
// 部门
export const reqUsers = () => axios.get("http://localhost:8080/getUser");
// 客户
export const reqCustomer = () => axios.get("http://localhost:8080/getCustomerList");
// 接口人表
export const reqgetInterface = () => axios.get("http://localhost:8080/getInterfaceList");
// 项目表
export const reqProject = () => axios.get("http://localhost:8080/getProjectList");
// 员工表
export const reqStaff = () => axios.get("http://localhost:8080/getStaffList");
// 岗位表
export const reqPost = () => axios.get("http://localhost:8080/getPostList");
