import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import AdminLayout from './views/AdminLayout.vue'
import Cat from './views/Cat.vue'
import Certificate from './views/Certificate.vue'
import Environment from './views/Environment.vue'
import Contact from './views/Contact.vue'
import HomeBg from './views/HomeBg.vue'
import Logo from './views/Logo.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'cat', component: Cat },
      { path: 'certificate', component: Certificate },
      { path: 'environment', component: Environment },
      { path: 'contact', component: Contact },
      { path: 'homebg', component: HomeBg },
      { path: 'logo', component: Logo },
      { path: 'about', component: About },
      { path: '', redirect: '/admin/cat' }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫：未登录不能访问 /admin
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('admin_token');
  if (to.path.startsWith('/admin') && !token) {
    next('/login');
  } else if (to.path === '/login' && token) {
    next('/admin');
  } else {
    next();
  }
});

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.mount('#app')
