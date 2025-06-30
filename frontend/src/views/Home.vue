<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <nav class="navbar">
      <div class="navbar-left">
        <img v-if="activeLogo" :src="resolveImageUrl(activeLogo.image_url)" alt="logo" class="site-logo" @click="scrollToTop" />
      </div>
      <ul class="nav-list" v-if="!isMobile">
        <li v-for="item in navItems" :key="item.key">
          <a
            :href="item.href"
            :class="['nav-link', { active: activeSection === item.key }]"
            @click.prevent="scrollToSection(item.key)"
          >
            {{ t(item.label) }}
          </a>
        </li>
      </ul>
      <div class="navbar-right">
        <button class="lang-switch" @click="toggleLang">{{ currentLang === 'zh' ? 'EN' : '中' }}</button>
        <button class="hamburger" v-if="isMobile" @click="drawerVisible = true">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <!-- 移动端抽屉菜单 -->
    <transition name="drawer-fade">
      <div class="mobile-drawer" v-if="drawerVisible">
        <div class="drawer-content">
          <button class="drawer-close" @click="drawerVisible = false">×</button>
          <ul class="drawer-menu">
            <li v-for="item in navItems" :key="item.key">
              <a @click.prevent="handleDrawerNav(item.key)">{{ t(item.label) }}</a>
            </li>
          </ul>
        </div>
        <div class="drawer-mask" @click="drawerVisible = false"></div>
      </div>
    </transition>
    <!-- Hero Section -->
    <section class="hero" :style="heroBgStyle">
      <div class="hero-content">
        <h1>{{ t('hero_title') }}</h1>
        <p class="hero-subtitle">{{ t('hero_subtitle') }}</p>
        <a href="#kittens" class="cta-button">{{ t('hero_cta') }}</a>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="content-section">
      <div class="container">
        <h2>{{ t('about_title') }}</h2>
        <div class="about-content">
          <div class="about-text">
            <template v-if="currentLang === 'zh'">
              <div v-for="(section, idx) in aboutContent.content_zh" :key="idx" style="margin-bottom:18px;">
                <div v-if="section.title" style="color:#ff9800;font-weight:bold;font-size:20px;margin-bottom:6px;">{{ section.title }}</div>
                <div v-if="section.content" style="text-indent:2em;line-height:1.8;">{{ section.content }}</div>
              </div>
            </template>
            <template v-else>
              <div v-for="(section, idx) in aboutContent.content_en" :key="idx" style="margin-bottom:18px;">
                <div v-if="section.title" style="color:#ff9800;font-weight:bold;font-size:20px;margin-bottom:6px;">{{ section.title }}</div>
                <div v-if="section.content" style="text-indent:2em;line-height:1.8;">{{ section.content }}</div>
              </div>
            </template>
          </div>
          <div class="about-image">
            <img
              v-if="aboutContent.image_url"
              :src="resolveImageUrl(aboutContent.image_url)"
              alt="乌云猫舍介绍图"
              class="about-img"
            />
            <img
              v-else
              src="/images/cattery-intro.png"
              alt="乌云猫舍介绍图"
              class="about-img"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Certificates Section -->
    <section id="certificates" class="content-section">
      <div class="container">
        <h2>{{ t('cert_title') }}</h2>
        <div class="cert-gallery">
          <div v-for="cert in certificates" :key="cert.id" class="cert-card">
            <img :src="cert.image_url ? resolveImageUrl(cert.image_url) : '/images/cert-cfa.png'" :alt="currentLang === 'zh' ? cert.name_zh : cert.name_en" />
            <div class="cert-info">
              <div class="cert-name">{{ currentLang === 'zh' ? cert.name_zh : cert.name_en }}</div>
              <div class="cert-desc">{{ currentLang === 'zh' ? cert.description_zh : cert.description_en }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Kittens Section -->
    <section id="kittens" class="content-section">
      <div class="container">
        <h2>{{ t('kittens_title') }}</h2>
        <div class="kitten-gallery">
          <div v-for="cat in cats" :key="cat.id" class="kitten-card">
            <img :src="cat.image_url ? resolveImageUrl(cat.image_url) : '/images/kitten-1.png'" :alt="currentLang === 'zh' ? cat.name_zh : cat.name_en" />
            <h3>{{ currentLang === 'zh' ? cat.name_zh : cat.name_en }}</h3>
            <p>{{ (currentLang === 'zh' ? cat.breed_zh : cat.breed_en) + ' | ' + (currentLang === 'zh' ? cat.color_zh : cat.color_en) }}</p>
            <p>{{ currentLang === 'zh' ? cat.description_zh : cat.description_en }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Environment Section -->
    <section id="environment" class="content-section">
      <div class="container">
        <h2>{{ t('environment_title') }}</h2>
        <div class="environment-gallery">
          <div v-for="env in environments" :key="env.id" class="env-card">
            <img :src="env.image_url ? resolveImageUrl(env.image_url) : ''" :alt="currentLang === 'zh' ? env.name_zh : env.name_en" />
            <div class="env-info">
              <h3>{{ currentLang === 'zh' ? env.name_zh : env.name_en }}</h3>
              <p>{{ currentLang === 'zh' ? env.description_zh : env.description_en }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <footer id="contact">
      <div class="container">
        <div class="footer-content">
          <div class="footer-col">
            <h3>{{ t('contact_title') }}</h3>
            <p v-for="contact in contacts" :key="contact.id">
              <strong>{{ contact.type }}:</strong> {{ contact.value }}
            </p>
          </div>
          <div class="footer-col">
            <h3>{{ t('address_title') }}</h3>
            <p><strong>{{ t('address_cn') }}</strong> 辽宁省沈阳市于洪区云龙湖街51-5号</p>
            <p><strong>{{ t('address_uk') }}</strong> 1-freegrounds avenue, hedge end</p>
          </div>
          <div class="footer-col">
            <h3>{{ t('follow_title') }}</h3>
            <a href="https://www.instagram.com/dark_clouds_cattery/" target="_blank">Instagram</a>
            <p class="certs">TICA/CFA {{ t('certs') }}</p>
          </div>
        </div>
        <div class="copyright">
          <p>{{ t('copyright') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCats } from '../api/cat';
import { getCertificates } from '../api/certificate';
import { getActiveLogo } from '../api/logo';
import { getAbout } from '../api/about';
import axios from 'axios';

const baseURL = 'http://localhost:3001';
const cats = ref([]);
const environments = ref([]);
const contacts = ref([]);
const heroBg = ref('');
const certificates = ref([]);
const activeLogo = ref(null);
const drawerVisible = ref(false);
const isMobile = ref(window.innerWidth <= 700);

// 新增：关于我们内容
const aboutContent = ref({ content_zh: '', content_en: '', image_url: '' });

const navItems = [
  { key: 'about', label: 'nav_about', href: '#about' },
  { key: 'kittens', label: 'nav_kittens', href: '#kittens' },
  { key: 'certificates', label: 'nav_certificates', href: '#certificates' },
  { key: 'environment', label: 'nav_environment', href: '#environment' },
  { key: 'contact', label: 'nav_contact', href: '#contact' },
];

const currentLang = ref(localStorage.getItem('lang') || 'zh');
const langPack = {
  zh: {
    nav_home: '首页',
    nav_about: '关于我们',
    nav_kittens: '猫咪展示',
    nav_certificates: '资质荣誉',
    nav_environment: '猫舍环境',
    nav_contact: '联系我们',
    hero_title: '欢迎来到乌云猫舍',
    hero_subtitle: '致力于繁育最甜美健康的米努特与曼基康猫咪',
    hero_cta: '了解我们的猫咪',
    about_title: '关于我们',
    about_welcome: '欢迎来到乌云猫舍',
    about_p1: '我们是一家在国际权威爱猫协会 TICA 与 CFA 双重注册的专业猫舍，全身心致力于繁育健康、亲人且拥有甜美长相的顶级米努特（Minuet）与曼基康（Munchkin）猫咪。在乌云猫舍，我们对生命的尊重与对繁育的专业，是我们引以为傲的基石。',
    about_home_title: '我们的家园',
    about_p2: '为了给猫咪们提供最卓越的成长环境，我们在全球两地设立了宽敞、现代化的家园：',
    about_location1_title: '中国沈阳总部',
    about_location1_desc: '坐落于辽宁省沈阳市，占地面积高达1600平方米，为猫咪们提供了宫殿级的广阔活动与生活空间。',
    about_location2_title: '英国南安普顿分部',
    about_location2_desc: '拥有500平方米的舒适环境，目前仍在扩建升级中，旨在为我们的海外家庭提供同样高品质的猫咪。',
    about_p3: '我们精心设计了包括SPA洗护区、独立医疗区、科学营养配餐区以及不同成长阶段的幼猫专属生活区，确保每一只猫咪自出生起，就能享受到无微不至的科学照料与关爱。',
    about_breeding_title: '我们的繁育理念',
    about_p4: '我们专注于繁育拥有"大眼睛、甜美长相"的健康猫咪，每一只新生的小猫都承载着我们对卓越品质的执着追求。我们精心培育的颜色系列丰富多样，涵盖经典色系（金白、乳白、三花、银白、蓝白）与稀有色系（太阳色金渐层、焦糖蓝金、蓝金等）。我们坚信，每一只从乌云猫舍走出的猫咪，都将是您家庭中颜值与健康并存的完美伴侣。',
    cert_title: '资质荣誉',
    cert_cfa: 'CFA 注册证书',
    cert_tica: 'TICA 注册证书',
    kittens_title: '猫咪展示',
    environment_title: '猫舍环境',
    env1_desc: '宽敞明亮的大厅',
    env2_desc: 'SPA洗护区',
    env3_desc: '独立医疗区',
    env4_desc: '科学营养配餐区',
    env5_desc: '幼猫A区',
    env6_desc: '幼猫B区',
    contact_title: '联系我们',
    address_title: '我们的地址',
    address_cn: '中国',
    address_uk: '英国',
    follow_title: '关注我们',
    certs: '注册猫舍',
    copyright: '© 2024 乌云猫舍 | Dark Clouds Cattery. All Rights Reserved.'
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_kittens: 'Kittens',
    nav_certificates: 'Certificates',
    nav_environment: 'Cattery',
    nav_contact: 'Contact',
    hero_title: 'Welcome to Dark Clouds Cattery',
    hero_subtitle: 'Dedicated to breeding the sweetest and healthiest Minuet & Munchkin cats.',
    hero_cta: 'Meet Our Kittens',
    about_title: 'About Us',
    about_welcome: 'Welcome to Dark Clouds Cattery',
    about_p1: 'We are a professional cattery registered with both TICA and CFA, wholeheartedly dedicated to breeding healthy, affectionate, and beautiful top-quality Minuet and Munchkin cats. At Dark Clouds Cattery, our respect for life and our professional breeding standards are the cornerstones of our pride.',
    about_home_title: 'Our Home',
    about_p2: 'To provide the most exceptional environment for our cats, we have established spacious, modern homes in two global locations:',
    about_location1_title: 'China Shenyang HQ',
    about_location1_desc: 'Located in Shenyang, Liaoning, with a vast 1600 square meters of palace-like living and activity space for our cats.',
    about_location2_title: 'UK Southampton Branch',
    about_location2_desc: 'A comfortable 500 square meter environment, currently undergoing expansion to provide the same high-quality cats for our overseas families.',
    about_p3: 'We have meticulously designed facilities including a SPA & washing area, an independent medical area, a scientific nutrition catering area, and dedicated living quarters for kittens at different growth stages, ensuring every cat receives attentive scientific care and love from birth.',
    about_breeding_title: 'Our Breeding Philosophy',
    about_p4: 'We specialize in breeding healthy cats with "big eyes and sweet looks." Every newborn kitten embodies our commitment to exceptional quality. We cultivate a rich variety of color series, including classic colors (golden & white, cream & white, calico, silver & white, blue & white) and rare colors (sun-colored golden shaded, caramel blue golden, blue golden, etc.). We firmly believe that every cat from Dark Clouds Cattery will be a perfect companion for your family, combining both beauty and health.',
    cert_title: 'Certificates & Honors',
    cert_cfa: 'CFA Registration Certificate',
    cert_tica: 'TICA Registration Certificate',
    kittens_title: 'Kittens',
    environment_title: 'Cattery Environment',
    env1_desc: 'Spacious and bright hall',
    env2_desc: 'SPA & Washing Area',
    env3_desc: 'Independent Medical Area',
    env4_desc: 'Scientific Nutrition Area',
    env5_desc: 'Kitten Area A',
    env6_desc: 'Kitten Area B',
    contact_title: 'Contact Us',
    address_title: 'Our Addresses',
    address_cn: 'China',
    address_uk: 'UK',
    follow_title: 'Follow Us',
    certs: 'Registered Cattery',
    copyright: '© 2024 Dark Clouds Cattery. All Rights Reserved.'
  }
};

const t = (key) => langPack[currentLang.value][key] || key;
const toggleLang = () => {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh';
  localStorage.setItem('lang', currentLang.value);
};

const heroBgStyle = computed(() => heroBg.value ? {
  backgroundImage: `url(${baseURL}${heroBg.value}?t=${Date.now()})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  position: 'relative'
} : {});

const activeSection = ref('home');

function scrollToSection(key) {
  const el = document.getElementById(key);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeSection.value = key;
  }
}

function onScroll() {
  // 动态高亮当前section
  const sectionIds = navItems.map(i => i.key);
  let found = 'home';
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 80) found = id;
    }
  }
  activeSection.value = found;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function resolveImageUrl(url) {
  if (!url) return '';
  // 防止出现 //uploads 或 baseURL 末尾多斜杠
  return baseURL.replace(/\/$/, '') + (url.startsWith('/') ? url : '/' + url);
}

function handleResize() {
  isMobile.value = window.innerWidth <= 700;
  if (!isMobile.value) drawerVisible.value = false;
}

function handleDrawerNav(key) {
  drawerVisible.value = false;
  setTimeout(() => scrollToSection(key), 200);
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', handleResize);

onMounted(async () => {
  const aboutRes = await getAbout();
  aboutContent.value = aboutRes.data;
  activeLogo.value = await getActiveLogo();
  // 获取猫咪数据
  const catRes = await getCats();
  cats.value = catRes.data;
  // 获取资质数据
  const certRes = await getCertificates();
  certificates.value = certRes.data;
  // 获取环境数据
  const envRes = await axios.get(baseURL + '/api/environments');
  environments.value = Array.isArray(envRes.data)
    ? envRes.data.filter(env => env.key !== 'home_bg')
    : (envRes.data.data || []).filter(env => env.key !== 'home_bg');
  console.log('环境数据', environments.value); // 调试用
  // 获取联系方式
  const contactRes = await axios.get(baseURL + '/api/contacts');
  contacts.value = contactRes.data;
  // 获取首页背景图
  const bgRes = await axios.get(baseURL + '/api/environments/home-bg');
  heroBg.value = bgRes.data.image_url;
});
</script>

<style scoped>
@import '../style.css';
.home-container {
  background: #f9f9f9;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
}
.home-container,
.home-container .content-section,
.home-container .about-content,
.home-container .about-text,
.home-container h2,
.home-container h3,
.home-container p,
.home-container ul,
.home-container li {
  color: #222;
}
.navbar {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  position: sticky;
  top: 0;
  z-index: 100;
  margin: 0;
}
.navbar-left {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
.navbar-right {
  flex: 0 0 auto;
  display: flex;
  alignItems: center;
}
.nav-list {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  gap: 48px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-link {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #222;
  position: relative;
  cursor: pointer;
  transition: color 0.2s;
  padding: 18px 0 14px 0;
  user-select: none;
  text-decoration: none;
  background: none;
  border: none;
  outline: none;
  display: inline-block;
}
.nav-link:hover,
.nav-link.active {
  color: #f7b500;
}
.nav-link::after {
  content: '';
  display: block;
  position: absolute;
  left: 0; right: 0; bottom: 6px;
  height: 3px;
  background: linear-gradient(90deg, #f7b500 0%, #ffec8b 100%);
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0.6);
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}
.nav-link:hover::after,
.nav-link.active::after {
  opacity: 1;
  transform: scaleX(1);
}
.lang-switch {
  margin-left: 32px;
  padding: 6px 24px;
  border: 2px solid #f7b500;
  background: #fff;
  color: #222;
  border-radius: 24px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background 0.2s, color 0.2s, border 0.2s;
  box-shadow: 0 2px 8px rgba(247,181,0,0.08);
}
.lang-switch:hover {
  background: #f7b500;
  color: #fff;
  border-color: #f7b500;
}
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hero-content h1 {
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 4px 24px rgba(0,0,0,0.25);
  margin-bottom: 0.5em;
}
.hero-content p.hero-subtitle {
  color: #222;
  font-size: 1.5rem;
  font-weight: 500;
  background: rgba(255,255,255,0.7);
  padding: 8px 32px;
  border-radius: 12px;
  margin: 24px 0 16px 0;
  text-align: center;
}
.cta-button {
  background: linear-gradient(90deg, #ffd04b 0%, #ff7e5f 100%);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  padding: 12px 36px;
  box-shadow: 0 4px 16px rgba(255,208,75,0.15);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  margin-top: 12px;
}
.cta-button:hover {
  background: linear-gradient(90deg, #ffb347 0%, #ff7e5f 100%);
  box-shadow: 0 8px 24px rgba(255,208,75,0.25);
}
.content-section h2 {
  font-size: 2.2rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
}
.content-section h2::after {
  content: '';
  display: block;
  width: 48px;
  height: 4px;
  background: #ffd04b;
  border-radius: 2px;
  margin: 8px 0 0 0;
}
.content-section h3 {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff7e5f;
  margin-top: 24px;
  margin-bottom: 8px;
}
.content-section p, .content-section ul, .content-section li {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
}
.cert-gallery {
  display: flex;
  gap: 32px;
  justify-content: center;
  margin: 32px 0;
}
.cert-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 16px;
  text-align: center;
  width: 320px;
}
.cert-card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
}
.cert-card p {
  font-weight: bold;
  color: #222;
}
.cert-info {
  margin-top: 18px;
  text-align: left;
}
.cert-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-align: center;
}
.cert-desc {
  font-size: 1rem;
  color: #444;
  line-height: 1.8;
  text-indent: 2em;
  white-space: pre-line;
}
.environment-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}
.env-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 0;
  text-align: center;
  width: 320px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.env-card img {
  width: 100%;
  border-radius: 8px 8px 0 0;
  margin-bottom: 0;
  height: 200px;
  object-fit: cover;
  display: block;
}
.env-info {
  padding: 18px 12px 16px 12px;
  background: #fff;
  border-radius: 0 0 12px 12px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.env-info h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #222;
  margin: 0 0 8px 0;
  line-height: 1.2;
}
.env-info p {
  font-size: 1rem;
  color: #444;
  margin: 0;
  line-height: 1.5;
  word-break: break-all;
}
.site-logo {
  height: 48px;
  margin-right: 32px;
  vertical-align: middle;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 2px solid #ffd04b;
  transition: filter 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.site-logo:hover {
  filter: brightness(1.08);
  border-color: #ffb300;
  box-shadow: 0 4px 16px rgba(255,208,75,0.18);
}
.hamburger {
  display: none;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
}
.hamburger span {
  display: block;
  width: 26px;
  height: 3px;
  background: #222;
  margin: 4px 0;
  border-radius: 2px;
  transition: all 0.2s;
}
@media (max-width: 700px) {
  .nav-list {
    display: none !important;
  }
  .hamburger {
    display: flex;
  }
  .navbar {
    padding: 0 16px;
  }
}
.mobile-drawer {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  display: flex;
}
.drawer-mask {
  flex: 1;
  background: rgba(0,0,0,0.25);
}
.drawer-content {
  width: 220px;
  background: #fff;
  height: 100%;
  box-shadow: 2px 0 16px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 18px 0 18px;
  position: relative;
}
.drawer-close {
  position: absolute;
  top: 12px; right: 12px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
}
.drawer-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
.drawer-menu li {
  margin-bottom: 28px;
}
.drawer-menu a {
  font-size: 1.2rem;
  color: #222;
  text-decoration: none;
  font-weight: bold;
  display: block;
  width: 100%;
  padding: 6px 0;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}
.drawer-menu a:hover {
  background: #f7b500;
  color: #fff;
}
.drawer-fade-enter-active, .drawer-fade-leave-active {
  transition: opacity 0.2s;
}
.drawer-fade-enter-from, .drawer-fade-leave-to {
  opacity: 0;
}
.container {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 48px;
  box-sizing: border-box;
}
@media (max-width: 900px) {
  .navbar, .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
.about-content {
  display: flex;
  align-items: flex-start;
  margin-top: 0;
  min-height: unset;
}
.about-text {
  flex: 1;
  min-width: 0;
}
.about-image {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  min-height: 0;
}
.about-img {
  max-width: 420px;
  max-height: 420px;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  background: #fff;
  object-fit: contain;
}
@media (max-width: 900px) {
  .about-content {
    flex-direction: column;
  }
  .about-image {
    width: 100%;
    margin-left: 0;
    margin-top: 24px;
    justify-content: center;
  }
}
</style> 