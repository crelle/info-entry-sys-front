import { BaseURL } from "@/api/config";
import Request from "@/util/axios/request";

//查询const queryMenu = (data) =>
  Request({
    method: "post",
    url: BaseURL + "/sysmgmt/menu/page",
    data,
  });



export { queryMenu};
