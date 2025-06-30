<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const activeMenu = ref('cat');
const router = useRouter();

const handleMenuSelect = (key) => {
  activeMenu.value = key;
  router.push(`/admin/${key}`);
};

// 响应式判断是否为极窄屏
const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 420;
};
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  fetchActiveLogo();
});

const baseURL = 'http://localhost:3001';
const activeLogo = ref(null);
const fetchActiveLogo = async () => {
  const res = await axios.get(baseURL + '/api/logos');
  activeLogo.value = res.data.find(l => l.is_active);
};

const goAdminHome = () => {
  router.push('/admin');
};
</script>

<template>
  <el-container style="height: 100vh; width: 100vw;">
    <el-header class="admin-header">
      <span style="font-weight:bold;letter-spacing:2px;">
        <template v-if="isMobile">
          <img v-if="activeLogo" :src="baseURL + activeLogo.image_url" alt="logo" style="height:32px;cursor:pointer;vertical-align:middle;" @click="goAdminHome" />
        </template>
        <template v-else>
          乌云猫舍管理后台
        </template>
      </span>
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        background-color="#222"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="admin-menu"
        @select="handleMenuSelect"
      >
        <el-menu-item index="cat">猫猫管理</el-menu-item>
        <el-menu-item index="certificate">资质管理</el-menu-item>
        <el-menu-item index="environment">环境管理</el-menu-item>
        <el-menu-item index="contact">联系方式</el-menu-item>
        <el-menu-item index="homebg">首页背景图</el-menu-item>
        <el-menu-item index="logo">logo管理</el-menu-item>
        <el-menu-item index="about">关于我们管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="admin-main">
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.admin-header {
  background:#222;
  color:#fff;
  font-size:22px;
  display:flex;
  align-items:center;
  padding: 0 48px;
  width: 100vw;
  box-sizing: border-box;
}
.admin-menu {
  margin-left:40px;
  flex:1;
  background: #222;
  min-width: 0;
}
.admin-main {
  background:#f5f6fa;
  width: 100vw;
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
  padding: 32px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.admin-main > * {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
@media (max-width: 900px) {
  .admin-header, .admin-main {
    padding-left: 12px;
    padding-right: 12px;
  }
  .admin-main > * {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .admin-header, .admin-main {
    padding-left: 4px;
    padding-right: 4px;
  }
  .admin-main {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .admin-main > * {
    max-width: 100%;
    min-width: 0;
  }
}
.el-header span {
  display: block;
  white-space: normal;
  word-break: break-all;
  text-align: center;
  font-size: 2.5vw;
  max-width: 100%;
  line-height: 1.2;
  font-weight: bold;
}
@media (max-width: 900px) {
  .el-header span {
    font-size: 20px;
  }
}
@media (max-width: 600px) {
  .el-header span {
    font-size: 16px;
  }
}
.el-menu {
  overflow-x: auto;
  flex-wrap: nowrap !important;
  min-width: 0;
}
.el-header span img {
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 2px solid #ffd04b;
  transition: filter 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.el-header span img:hover {
  filter: brightness(1.08);
  border-color: #ffb300;
  box-shadow: 0 4px 16px rgba(255,208,75,0.18);
}
</style> 