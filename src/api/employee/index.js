import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//创建员工
const createEmployee = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/employee/create",
    data,
  });
// 分页查询员工
const queryEmployee = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/employee/pageByCondition",
    data,
  });

// 编辑员工
const updateEmployee = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/app/employee/updateById",
    data,
  });

//删除员工
const deleteEmployee = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/employee/deleteById/" + data,
    
  });

export { createEmployee, updateEmployee, deleteEmployee, queryEmployee };
