import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

//创建项目
const establish = (data) => Request({
    method: 'post',
    url: BaseURL + '/app/region/create',
    data
})

export { establish }