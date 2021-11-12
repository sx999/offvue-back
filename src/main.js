import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './api/mock.api'; // 接口API

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor);

import  Editor from './components/Editor';
Vue.component("Editor",Editor);
//时间格式组件
import Moment from 'moment'
Vue.prototype.moment = Moment
//axios
import axios from 'axios'
Vue.prototype.axios = axios;    //全局注册，
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('cat_token')) {
	  // config.headers.Authorization = sessionStorage.getItem('cat_token');
      config.headers.common['token'] = sessionStorage.getItem('cat_token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
