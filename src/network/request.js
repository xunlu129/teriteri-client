import axios from 'axios';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

// get请求
export function get(url, params) {
  
  const store = useStore();

  // 请求超过30秒则判定为超时
  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
  });

  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // console.log('请求拦截器');
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  // 响应拦截
  instance.interceptors.response.use(
    (config) => {
      const code = config.data.code;
      if (code !== 200 && !(code >= 800 && code <= 803))
        ElMessage.error(config.data.message || '未知错误, 请打开控制台查看');
      return config;
    },
    (err) => {
      console.log([err]);
      if (err.response.data.msg === '需要登录') {
        // cookie过期 退出登录
        // console.log(window.localStorage.getItem("userInfo"));
        // window.localStorage.setItem("userInfo", "");
        // 刷新页面
        // history.go(0)
        // 修改当前的登录状态
        store.state.isLogin = false;
      } else {
        // console.log(err.response.data.msg);
        ElMessage.error(err.response.data.message || '未知错误, 请打开控制台查看');
      }
    },
  );

  instance.defaults.withCredentials = true;

  if (params) {
    const query = { params };
    return instance.get(url, query);
  } else {
    return instance.get(url);
  }
}

// post请求
export function post(url, data) {
  
  const store = useStore();

  // 请求超过30秒则判定为超时
  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
  });

  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // console.log('请求拦截器');
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  // 响应拦截
  instance.interceptors.response.use(
    (config) => {
      const code = config.data.code;
      if (code !== 200 && !(code >= 800 && code <= 803))
        ElMessage.error(config.data.message || '未知错误, 请打开控制台查看');
      return config;
    },
    (err) => {
      console.log([err]);
      if (err.response.data.msg === '需要登录') {
        // cookie过期 退出登录
        // console.log(window.localStorage.getItem("userInfo"));
        // window.localStorage.setItem("userInfo", "");
        // 刷新页面
        // history.go(0)
        // 修改当前的登录状态
        store.state.isLogin = false;
      } else {
        // console.log(err.response.data.msg);
        ElMessage.error(err.response.data.message || '未知错误, 请打开控制台查看');
      }
    },
  );

  instance.defaults.withCredentials = true;

  const query = { data };
  return instance.post(url, query);
}
