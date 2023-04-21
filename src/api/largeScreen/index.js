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



export {employeeAge,employeeSeniority};
