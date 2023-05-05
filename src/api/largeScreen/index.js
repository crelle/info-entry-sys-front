import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

const employeeAge = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/reportForm/employeeAge",
    data,
  });

const employeeSeniority = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/reportForm/employeeSeniority",
    data,
  });
// 客户分布
const guestDepartment = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/reportForm/employeeCustomer",
    data,
  });
// 地域分析
const regionalAnalysis = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/reportForm/regionAnalysis",
    data,
  });

export { employeeAge, employeeSeniority, guestDepartment,regionalAnalysis };
