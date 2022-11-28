// axios封装
import axios from "axios";
import { Message, Loading, MessageBox } from "element-ui";

const dev = process.env.NODE_ENV === "development";

// 创建axios实例
const Request = axios.create({
    timeout: 60000, // 请求超时时间
    headers: {
        'Cache-Control': 'no-cache'
    }
});
// request 拦截器
Request.interceptors.request.use(
    config => {
        // console.log("--- 开始请求接口 ---" + config.url);
        // console.log(config);
        let _url = config.url;
        if (config.method === "get" && config.params) {
            // console.log("--- 入参为 ---" + JSON.stringify(config.params));
            // console.log("--- 入参数据 ---", config.params);
            _url += "?";
            let keys = Object.keys(config.params);
            for (let key of keys) {
                _url += `${key}=${encodeURIComponent(config.params[key])}&`
            }
            _url = _url.substring(0, _url.length - 1)
            config.params = {}
        } else {
            // console.log("--- 入参为 ---" + JSON.stringify(config.data));
            // console.log("--- 入参数据 ---", config.data);
        }
        config.url = _url
        return config;
    },
);

// respone拦截器
Request.interceptors.response.use(
    response => {
        // console.log(response);
        if (response.status == "200") {
            // console.log("--- 结束请求接口 ---" + response.config.url);
            // console.log(response);
            // console.log("--- 出参为 ---" + JSON.stringify(response.data ? response.data : ""));
            // console.log("--- 出参数据为 ---", response.data ? response.data : "");
            let res = response.data ? response.data : "";
            if (res.code == "00000") {
                return res;
            } else if (res.code == "-2") {
                if (res.data && res.data.detailMsg && res.data.detailMsg.length > 0) {
                    let message = "<div>";
                    if (res.data) {
                        for (let i = 0; i < res.data.detailMsg.length; i++) {
                            message += res.data.detailMsg[i].msg;
                            message += "<br/>";
                        }
                    }
                    message += "</div>";
                    console.log(message);
                    MessageBox.alert(message, "参数校验失败", {
                        dangerouslyUseHTMLString: true
                    });
                } else {
                    Message({
                        message: "参数校验失败",
                        type: "error",
                        duration: 3.5 * 1000
                    });
                }
                return res;
            } else if (res.code == "CMA0200" || res.code == "CMA0220" || res.code == "CMA0230") {
                Message({
                    message: res.message || res.msg || "用户登录已过期",
                    type: "error",
                    duration: 3.5 * 1000
                });
                if (!dev) {
                    sessionClear();
                    window.$loginout();
                }
                return res;
            } else if (res && !res.code) { // status200 且有返回，但无返回码
                return res;
            } else { // 又返回码 且不是上述所有情况 如 -1
                Message({
                    message: res.message || res.msg || "请求错误，请稍后重试",
                    type: "error",
                    duration: 3.5 * 1000
                });
                return res;
            }
        } else {
            Message({
                message: "请求错误，请稍后重试",
                type: "error",
                duration: 3.5 * 1000
            });
            return;
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401: window.$loginout();
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
);

export default Request;
