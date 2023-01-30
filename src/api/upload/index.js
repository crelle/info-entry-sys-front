import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

// 登出
// const queryUser = (params)=>Request({
//     method: 'get',
//     url: BaseURL + '/logout',
//     params
// })

// 注册
const queryUser = (data) => Request({
    method: 'post',
    url: BaseURL + '/user/uploadAvatar',
    data
})

export { queryUser }
