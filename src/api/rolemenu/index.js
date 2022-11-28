import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//
// 查询角色菜单
const queryRoleMenu = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/role-menu/queryMenu",
    data,
  });
export { queryRoleMenu };
