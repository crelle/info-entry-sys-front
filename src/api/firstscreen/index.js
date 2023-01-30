import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

// 查询所有用户
const queryUserAll = (params) =>
  Request({
    method: "get",
    url: BaseURL + "/sysmgmt/user/all",
    params,
  });
// 部门分析
const departmentAnalysis = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/reportForm/departmentAnalysis",
    data,
  });
export { queryUserAll, departmentAnalysis };
