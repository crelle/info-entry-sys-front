import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//查询菜单
const queryMenuAll = () =>
  Request({
    method: "get",
    url: BaseURL + "/sysmgmt/menu/all",
  });
  //获取菜单顺序
const getMenuSort = () =>
Request({
  method: "get",
  url: BaseURL + "/sysmgmt/menu/getMenuSort",
});
//查询菜单
const queryMenu = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/menu/page",
    data,
  });
//删除菜单
const deleteMenu = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/sysmgmt/menu/delete/" + data,
    data,
  });
// 编辑菜单
const modifyTheMenu = (data, id) =>
  Request({
    method: "PUT",
    url: `${BaseURL}/sysmgmt/menu/update/${id}`,
    data,
  });
// 创建菜单
const createMenu = (data) =>
  Request({
    method: "POST",
    url: BaseURL + "/sysmgmt/menu/create",
    data,
  });
//菜单排序
const sortMenu = (data) =>
  Request({
    method: "POST",
    url: BaseURL + "/sysmgmt/menu/updateMenu",
    data,
  });
export { queryMenu,queryMenuAll, modifyTheMenu, createMenu, deleteMenu ,sortMenu,getMenuSort};
