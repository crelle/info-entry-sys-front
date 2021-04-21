import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

// 获取验证码
const getVerifyCode = (params)=>Request({
    method: 'get',
    url: BaseURL + '/verifyCode',
    params,
    responseType: 'blob'
})
// 登录
const login = (data)=>Request({
    method: 'post',
    url: BaseURL + '/doLogin',
    data
})

// 登出
const logout = (params)=>Request({
    method: 'get',
    url: BaseURL + '/logout',
    params
})

export {
    login,
    getVerifyCode,
    logout
}