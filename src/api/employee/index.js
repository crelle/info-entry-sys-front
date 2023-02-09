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
// 员工状态
// 新增状态
const deleteState = (data) =>
  Request({
    method: "POST",
    url: BaseURL + "/app/status-record/create",
    data,
  });
// 新增沟通记录
const communIcate = (data) =>
  Request({
    method: "POST",
    url: BaseURL + "/app/communicate/create",
    data,
  });
// 分页查询状态
const queryState = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/status-record/pageByCondition",
    data,
  });
// 分页查询沟通记录
const queryRecord = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/communicate/pageByCondition",
    data,
  });
export {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  queryEmployee,
  deleteState,
  communIcate,
  queryState,
  queryRecord,
};
