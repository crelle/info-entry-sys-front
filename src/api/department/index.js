import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//创建部门
const establishDepartments = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/department/create",
    data,
  });
// 分页查询部门
const queryDepartments = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/department/pageByCondition",
    data,
  });
//查询上级部门
const queryDepartmentsUP = () =>
  Request({
    method: "get",
    url: BaseURL + "/app/department/queryDepartmentUp",
  });
// 编辑部门
const editDepartments = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/app/department/updateById",
    data,
  });

//删除部门
const deletesDepartments = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/department/deleteById/" + data,
    
  });

export { establishDepartments, queryDepartments, editDepartments, deletesDepartments,queryDepartmentsUP };
