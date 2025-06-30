<template>
  <div class="logo-page">
    <h2 class="logo-title">Logo管理</h2>
    <div class="logo-actions">
      <el-upload
        class="upload-demo"
        action="http://localhost:3001/api/logos"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :headers="{ }"
        :data="{ name: newLogoName }"
        :before-upload="beforeUpload"
      >
        <el-input v-model="newLogoName" placeholder="请输入logo名称" style="width:200px;margin-right:12px;" />
        <el-button type="primary">上传新Logo</el-button>
      </el-upload>
    </div>
    <el-divider />
    <el-table :data="logos" style="width:100%;margin-top:24px;">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column label="图片">
        <template #default="scope">
          <img :src="resolveImageUrl(scope.row.image_url)" alt="logo" style="height:40px;max-width:120px;object-fit:contain;" />
        </template>
      </el-table-column>
      <el-table-column label="当前使用" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.is_active" type="success">当前</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button v-if="!scope.row.is_active" size="small" @click="activateLogo(scope.row.id)">设为当前</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const logos = ref([]);
const newLogoName = ref('');

const fetchLogos = async () => {
  const res = await axios.get('http://localhost:3001/api/logos');
  logos.value = res.data;
};

const handleUploadSuccess = () => {
  newLogoName.value = '';
  fetchLogos();
};

const beforeUpload = (file) => {
  if (!newLogoName.value) {
    window.$message?.warning('请先输入logo名称');
    return false;
  }
  return true;
};

const activateLogo = async (id) => {
  await axios.put('http://localhost:3001/api/logos/' + id + '/activate');
  fetchLogos();
};

function resolveImageUrl(url) {
  const baseURL = 'http://localhost:3001';
  if (!url) return '';
  return baseURL.replace(/\/$/, '') + (url.startsWith('/') ? url : '/' + url);
}

onMounted(fetchLogos);
</script>

<style scoped>
.logo-page {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 32px 48px 0 48px;
  box-sizing: border-box;
}
.logo-title {
  color: #222;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 18px;
  text-align: left;
}
.logo-actions {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}
@media (max-width: 900px) {
  .logo-page {
    padding-left: 12px;
    padding-right: 12px;
  }
}
@media (max-width: 600px) {
  .logo-page {
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 12px;
  }
}
</style> 