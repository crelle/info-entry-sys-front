import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";
// 创建员工资产
const createProperty = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/asset/create",
    data,
  });
// 批量 创建员工资产
const createPropertyes = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/asset/creates",
    data,
  });
//删除资产
const deleteProperty = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/asset/deleteById/" + data,
  });
// 根据员工查询 资产
const queryPropertyManual = (data) =>
  Request({
    method: "get",
    url: BaseURL + "/app/asset/list/" + data,
  });
//创建员工（批量）
const uploadApi = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/employee/importExcel",
    data,
  });

//下载员工（批量）
const downloadApi = (data) =>
  Request({
    method: "get",
    url: BaseURL + "/app/employee/downloadExcel",
    data,
  });
//下载模板
const downloadTemplate = (data) =>
  Request({
    method: "get",
    url: BaseURL + "/app/employee/downloadTemplate",
    data,
  });
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

// 手动分页查询 员工
const queryEmployeeManual = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/employee/manualPage",
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
  queryEmployeeManual,
  uploadApi,
  downloadApi,
  downloadTemplate,
  createProperty,
  deleteProperty,
  queryPropertyManual,
};
