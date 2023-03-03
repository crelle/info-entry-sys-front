import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

//创建项目
const establishProject= (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/project/create",
    data,
  });
// 分页查询项目(手动)
const queryProject = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/app/project/manualPage",
    data,
  });
// 编辑项目
const editProject = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/app/project/updateById",
    data,
  });

//删除项目
const deletesProject = (data) =>
  Request({
    method: "DELETE",
    url: BaseURL + "/app/project/deleteById/" + data,
    data,
  });

export { establishProject, queryProject, editProject, deletesProject };
