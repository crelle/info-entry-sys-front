import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

//
const queryRole = (data) => Request({
    method: 'post',
    url: BaseURL + '/sysmgmt/authority/page',
    data
})

export { queryRole }