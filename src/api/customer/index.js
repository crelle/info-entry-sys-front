import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//创建客户
const establishCustomer = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/customer/create",
    data,
  });
// 分页查询客户
const queryCustomer = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/customer/pageByCondition",
    data,
  });

// 编辑客户
const editCustomer = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/app/customer/updateById",
    data,
  });

//删除客户
const deletesCustomer = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/customer/deleteById/" + data,
    
  });

export { establishCustomer, queryCustomer, editCustomer, deletesCustomer };

