import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

// 登出
// const queryUser = (params)=>Request({
//     method: 'get',
//     url: BaseURL + '/logout',
//     params
// })

// 分页查询用户
const queryUser = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/user/page",
    data,
  });

// 更新用户（编辑）
const updateUser = (data,id) =>
  Request({
    method: "put",
    url: `${BaseURL}/sysmgmt/user/update/${id}`,
    data,
  });

// 新增用户
const addUser = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/user/create",
    data,
  });

//删除用户
const deleteMenu = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/sysmgmt/user/delete/" + data,
    data,
  });
export { queryUser, updateUser, addUser, deleteMenu };
