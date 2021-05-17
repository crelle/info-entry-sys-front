import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

// 登出
// const queryUser = (params)=>Request({
//     method: 'get',
//     url: BaseURL + '/logout',
//     params
// })

// 分页查询用户
const queryUser = (data) => Request({
    method: 'post',
    url: BaseURL + '/user/page',
    data
})

// 更新用户（编辑）
const updateUser = (data,id) => Request({
    method: 'put',
    url: `${BaseURL}/user/update/${id}`,
    data
})
export { queryUser,updateUser }