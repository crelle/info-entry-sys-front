import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

const deleteDic = (id) =>
  Request({
    method: "delete",
    url: BaseURL + "/sysmgmt/dictionary/delete/"+id,
  });


const manualPage = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/dictionary/manualPage",
    data,
  });

const createDic = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/dictionary/create",
    data,
  });


const editDic = (data) =>
  Request({
    method: "put",
    url: BaseURL + "/sysmgmt/dictionary/update",
    data,
  });
export {
    editDic ,createDic,manualPage,deleteDic
};
