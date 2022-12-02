import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//创建部门
const createEmployee = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/employee/create",
    data,
  });
// 分页查询部门
const queryEmployee = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/employee/pageByCondition",
    data,
  });

// 编辑部门
const updateEmployee = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/app/employee/updateById",
    data,
  });

//删除部门
const deleteEmployee = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/employee/deleteById/" + data,
    
  });

export { createEmployee, updateEmployee, deleteEmployee, queryEmployee };
