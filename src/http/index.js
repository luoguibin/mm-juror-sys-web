import axios from "axios";
import store from "../store";
import { baseUrl } from "@/config";

import { Message } from "element-ui";

axios.defaults.timeout = 10000;

// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.defaults.baseURL = baseUrl;

//HTTPrequest拦截
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(new Error(error));
    }
);

// HTTPresponse拦截
axios.interceptors.response.use(
    res => {
        if (res.request.responseURL.includes(res.config.url)) {
            return res;
        } else {
            store.dispatch("logout");
            return Promise.resolve(new Error("验证失效，请重新登录"));
        }
    },
    error => {
        Message.error({
            message: /timeout/.test(error) ? "请求超时，请检查" : "请求失败，请检查"
        })
        return Promise.reject(new Error(error));
    }
);

export default axios;
