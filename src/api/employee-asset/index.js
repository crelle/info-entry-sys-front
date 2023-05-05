import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

// 创建员工资产
const createEmployeeAsset = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/asset/create",
    data,
  });
// 批量创建员工资产
const createEmployeeAssets = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/asset/creates",
    data,
  });
//删除资产
const deleteEmployeeAsset = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/asset/deleteById/{id}" + data,
  });


// 手动分页查询员工资产
const queryEmployeeAssetManual = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/asset/manualPage",
    data,
  });


export {
  createEmployeeAsset,
  createEmployeeAssets,
  deleteEmployeeAsset,
  queryEmployeeAssetManual
};
