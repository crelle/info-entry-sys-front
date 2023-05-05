import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

// 查询 部门分析
const departmentAnalysis = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/reportForm/departmentAnalysis",
    data,
  });
// 区域分析
const regionAnalysis = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/reportForm/regionAnalysis",
    data,
  });
export { departmentAnalysis, regionAnalysis };
