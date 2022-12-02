import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//创建接口人
const establishInterface = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/contact-person/create",
    data,
  });

// 分页查询接口人
const queryInterface = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/contact-person/pageByCondition",
    data,
  });

// 编辑接口人
const editInterface = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/app/contact-person/updateById",
    data,
  });

//删除接口人
const deletesInterface = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/contact-person/deleteById/" + data,
    
  });

export { establishInterface, queryInterface, editInterface, deletesInterface };
