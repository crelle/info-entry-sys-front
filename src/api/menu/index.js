import { BaseURL } from '@/api/config'
import Request from '@/util/axios/request'

//
const queryMenu = (data) => Request({
    method: 'post',
    url: BaseURL + '/menu/page',
    data
})

export { queryMenu }