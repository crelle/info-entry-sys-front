import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

//创建地域
const establish = (data) => Request({
    method: 'post',
    url: BaseURL + '/app/region/create',
    data
})
// 分页查询地域
const query = (data) => Request({
    method: 'post',
    url: BaseURL + '/app/region/pageByCondition',
    data
})
// 编辑地域
const edit = (data) =>
  Request({
    method: "put",
    url: BaseURL +'/app/region/updateById',
    data,
  });
  // 删除地域
const deletes = (data, id) =>
Request({
  method: "delete",
  url: `${BaseURL}/app/region/deleteById/${id}`,
  data,
});
export { establish,query,edit,deletes }