
import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

// 查询所有用户
const queryUserAll = (params)=>Request({
    method: 'get',
    url: BaseURL + '/user/all',
    params
})
export {
    queryUserAll
}