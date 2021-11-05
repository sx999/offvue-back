import Vue from 'vue';
const api = process.env.VUE_APP_URL ? process.env.VUE_APP_URL : '/api';

export const APIROUTER = {
        'login':  api + '/admin/login.do', // 登录
}

Vue.prototype.$api_router = APIROUTER; // 直接声明出去