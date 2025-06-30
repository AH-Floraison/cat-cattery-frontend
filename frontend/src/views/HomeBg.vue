<template>
  <el-card class="homebg-card">
    <h2 class="about-title">首页背景图管理</h2>
    <div class="homebg-content">
      <div v-if="!showSuccess" style="width:100%;display:flex;flex-direction:column;align-items:center;">
        <el-image v-if="showPreview && imageUrl" :src="baseURL+imageUrl" class="homebg-img" fit="cover" />
        <div v-else class="homebg-empty">暂无背景图</div>
        <el-upload
          class="homebg-upload"
          action=""
          :http-request="uploadBg"
          :show-file-list="false"
          accept="image/*"
        >
          <el-button class="homebg-btn" type="primary">上传新背景图</el-button>
        </el-upload>
      </div>
      <el-alert v-if="showSuccess" title="上传成功！" type="success" show-icon style="margin-top:32px;width:100%;text-align:center;" />
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const baseURL = 'http://localhost:3001';
const imageUrl = ref('');
const showPreview = ref(true);
const showSuccess = ref(false);

const fetchBg = async () => {
  const res = await axios.get(baseURL + '/api/environments/home-bg');
  imageUrl.value = res.data.image_url;
  showPreview.value = !!res.data.image_url;
  showSuccess.value = false;
};

const uploadBg = async (option) => {
  const formData = new FormData();
  formData.append('image', option.file);
  await axios.post(baseURL + '/api/environments/home-bg', formData);
  ElMessage.success('上传成功！');
  await fetchBg();
  showSuccess.value = true;
};

onMounted(fetchBg);
</script>

<style scoped>
.homebg-card {
  max-width: 500px;
  margin: 40px auto;
  padding-bottom: 18px;
}
.about-title {
  color: #222;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 18px;
  text-align: left;
}
.homebg-content {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 320px;
  justify-content: flex-start;
}
.homebg-img {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  margin-bottom: 18px;
  max-height: 320px;
  object-fit: contain;
  background: #f6f6f6;
}
.homebg-empty {
  color: #888;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 18px;
}
.homebg-upload {
  width: 100%;
  display: flex;
  justify-content: center;
}
.homebg-btn {
  width: 100%;
  max-width: 320px;
  font-size: 1.1rem;
  margin: 0 auto;
  display: block;
  text-align: center;
}
.homebg-btn:hover {
  /* 保持Element Plus默认按钮hover效果 */
}
@media (max-width: 600px) {
  .homebg-card {
    max-width: 98vw;
    margin: 12px auto;
    padding-bottom: 8px;
  }
  .homebg-img {
    max-width: 98vw;
    min-width: 0;
  }
  .homebg-btn {
    max-width: 100vw;
  }
}
</style> 