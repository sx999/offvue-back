import Vue from 'vue';
const api = process.env.VUE_APP_URL ? process.env.VUE_APP_URL : '/api';

export const APIROUTER = {
        'login':  api + '/NewAdminController/getAdmin', // 登录
        'expertfindAll':api+'/NewExpertController/',  //专家顾问(查询全部)
        //轮播图
        'banner':api+'/NewPicController/',
        // 项目
        'project':api+'/NewItemsController/' 
}

Vue.prototype.$api_router = APIROUTER; // 直接声明出去