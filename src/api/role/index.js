import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//
// 分页查询角色
const queryRole = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/role/page",
    data,
  });
// 更新角色（编辑）
const updateRole = (data, id) =>
  Request({
    method: "put",
    url: `${BaseURL}/sysmgmt/role/update/${id}`,
    data,
  });
// 新增角色
const addRole = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/role/create",
    data,
  });
//删除角色
const deleteRole = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/sysmgmt/role/delete/" + data,
    data,
  });
export { queryRole, updateRole, deleteRole, addRole };
