import { logout } from "@/api/login/index";
import router from "@/router";

let loginout = () => {
    logout().then((res) => {
        if (res && res.code && res.code === "00000") {
            window.localStorage.removeItem("userdetail");
            // 登出则转跳回登陆页面
            router.app.$router.push('/login')
        }
    });
}
let dictionaryList=(name)=>{
    let list=JSON.parse(sessionStorage.getItem('dictionaryList')); 
    for(let item of list){
        if(item.name==name){
            return item.children
        }
    }
}
let  debounce=(func, wait)=>{
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
export { loginout,dictionaryList ,debounce}