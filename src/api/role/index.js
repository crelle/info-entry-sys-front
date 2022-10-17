import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

//
const queryRole = (data) => Request({
    method: 'post',
    url: BaseURL + '/sysmgmt/role/page',
    data
})

export { queryRole }