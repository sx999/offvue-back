import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

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

import axios from 'axios'
Vue.prototype.axios = axios;    //全局注册，

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
