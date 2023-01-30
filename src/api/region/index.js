import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//创建地域
const establishRegion = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/region/create",
    data,
  });
// 分页查询地域
const queryRegion = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/region/pageByCondition",
    data,
  });
// 编辑地域
const editRegion = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/app/region/updateById",
    data,
  });

//删除地域
const deletesRegion = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/region/deleteById/" + data,
    data,
  });

export { establishRegion, queryRegion, editRegion, deletesRegion };
