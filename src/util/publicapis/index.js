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

export { loginout }