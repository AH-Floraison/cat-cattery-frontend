<template>
  <div class="about-page">
    <h2 class="about-title">关于我们管理</h2>
    <el-radio-group v-model="lang" class="about-lang-group">
      <el-radio-button label="zh">中文</el-radio-button>
      <el-radio-button label="en">English</el-radio-button>
    </el-radio-group>
    <el-form label-width="80px" class="about-form" @submit.prevent>
      <el-form-item label="图片">
        <img v-if="about.image_url" :src="resolveImageUrl(about.image_url)" alt="about" class="about-img" />
        <el-upload
          class="upload-demo"
          :http-request="handleUpload"
          :show-file-list="false"
        >
          <el-button>上传/更换图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item :label="lang==='zh' ? '中文内容' : '英文内容'">
        <div>
          <div v-for="(section, idx) in currentSections" :key="idx" class="about-section-edit">
            <el-input
              v-model="section.title"
              placeholder="请输入小标题"
              class="about-title-input"
              :style="{ color: '#ff9800', fontWeight: 'bold', fontSize: '18px', borderColor: '#ffd04b', marginBottom: '6px' }"
            />
            <el-input
              v-if="section.content !== undefined"
              v-model="section.content"
              type="textarea"
              :rows="4"
              placeholder="请输入正文"
              class="about-content-input"
              :style="{ textIndent: '2em', marginBottom: '18px' }"
            />
          </div>
          <el-button @click="addSection" type="warning" plain style="margin-right:8px;">＋添加小标题</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveAbout" style="margin-top: 18px;">保存</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getAbout, updateAbout, uploadAboutImage } from '../api/about';
import { ElMessage } from 'element-plus';
const baseURL = 'http://localhost:3001';
const about = reactive({ image_url: '', content_zh: [], content_en: [] });
const lang = ref('zh');

const currentSections = computed(() => lang.value === 'zh' ? about.content_zh : about.content_en);

function addSection() {
  currentSections.value.push({ title: '', content: '' });
}

const fetchAbout = async () => {
  const res = await getAbout();
  // 兼容老数据
  about.image_url = res.data.image_url;
  about.content_zh = Array.isArray(res.data.content_zh) ? res.data.content_zh : [];
  about.content_en = Array.isArray(res.data.content_en) ? res.data.content_en : [];
};

const handleUpload = async (option) => {
  const formData = new FormData();
  formData.append('image', option.file);
  const res = await uploadAboutImage(formData);
  about.image_url = res.data.image_url;
  ElMessage.success('图片上传成功！');
};

const saveAbout = async () => {
  await updateAbout({
    content_zh: about.content_zh,
    content_en: about.content_en
  });
  ElMessage.success('保存成功！');
  await fetchAbout();
};

function resolveImageUrl(url) {
  if (!url) return '';
  return baseURL.replace(/\/$/, '') + (url.startsWith('/') ? url : '/' + url);
}

onMounted(fetchAbout);
</script>

<style scoped>
.about-page {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 32px 48px 0 48px;
  box-sizing: border-box;
}
.about-title {
  color: #222;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 18px;
  text-align: left;
}
.about-lang-group {
  margin-bottom: 18px;
}
.about-form {
  width: 100%;
  max-width: 900px;
}
.about-img {
  max-width: 180px;
  max-height: 120px;
  border-radius: 8px;
  margin-bottom: 8px;
  display: block;
}
@media (max-width: 900px) {
  .about-page {
    padding-left: 12px;
    padding-right: 12px;
  }
  .about-form {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .about-page {
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 12px;
  }
}
</style> 