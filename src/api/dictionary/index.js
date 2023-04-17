import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";
// 创建员工资产
const createProperty = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/dictionary/create",
    data,
  });

//删除资产
const deleteProperty = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/sysmgmt/dictionary/delete/{id}" + data,
  });
// 根据员工查询 资产
const queryPropertyManual = (data) =>
  Request({
    method: "get",
    url: BaseURL + "/sysmgmt/dictionary/detail/{id}" + data,
  });

// 分页查询状态
const queryDictionary = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/dictionary/page",
    data,
  });
export {
    queryDictionary
};
