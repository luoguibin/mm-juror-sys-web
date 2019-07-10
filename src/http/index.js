import axios from "axios";
import store from "../store";
import Qs from "qs";
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
        // if (config.data) {
        //     config.data = Qs.stringify(config.data);
        //     config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        // }
        const token = (config.params || {}).token === true;

        if (token) {
            // config.headers["Authorization"] = token;
            config.params.token = store.state.user.token;
        }
        if (config.methods === "post" && config.headers.serialize) {
            config.data = serialize(config.data);
            delete config.data.serialize;
        }
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
