import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//创建岗位
const establishPost = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/post/create",
    data,
  });
// 分页查询岗位(手动)
const queryPost = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/post/manualPage",
    data,
  });

// 编辑岗位
const editPost = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/app/post/updateById",
    data,
  });

//删除岗位
const deletesPost = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/post/deleteById/" + data,
  });

export { establishPost, queryPost, editPost, deletesPost };
