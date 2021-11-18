import Vue from 'vue';
const api = process.env.VUE_APP_URL ? process.env.VUE_APP_URL : '/api';

export const APIROUTER = {
        'login':  api + '/NewAdminController/getAdmin', // 登录
        //专家顾问
        'expert':api+'/NewExpertController/', 
        //公司使命
        'mission':api+'/MissionController/', 
        //轮播图
        'banner':api+'/NewPicController/',
        //图片上传
        'upImg':api+'/PicFileController/uploadPicture',
        // 项目
        'project':api+'/NewItemsController/',
        //联系方式
        'contact':api+'/NewMessageController/',
        //行业新闻
        'tradeNews':api+'/NewConsultController/',
        //成员介绍
        'members':api+'/NewMemberController/',
        //赛事活动
        'events':api+'/NewCompetitionController/',
        //招聘信息
        'invite':api+'/NewRecruitmentConroller/',
        //加入我们
        'joinme':api+'/NewJoinController/'
}

Vue.prototype.$api_router = APIROUTER; // 直接声明出去