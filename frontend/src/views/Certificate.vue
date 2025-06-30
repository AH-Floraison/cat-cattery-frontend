<template>
  <el-card>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:20px;font-weight:bold;">资质管理</span>
      <el-button type="primary" @click="openAdd">新增资质</el-button>
    </div>
    <el-table :data="certs" style="width:100%;margin-top:20px;">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name_zh" label="中文名称" />
      <el-table-column prop="name_en" label="英文名称" />
      <el-table-column prop="description_zh" label="中文描述" />
      <el-table-column prop="description_en" label="英文描述" />
      <el-table-column label="图片" width="120">
        <template #default="scope">
          <el-image v-if="scope.row.image_url" :src="resolveImageUrl(scope.row.image_url)" style="width:60px;height:60px;object-fit:cover;border-radius:8px;" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" type="danger" @click="delCert(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="'新增资质'" v-model="dialogVisible" append-to-body>
      <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
        <el-form-item label="中文名称" prop="name_zh">
          <el-input v-model="form.name_zh" />
        </el-form-item>
        <el-form-item label="英文名称" prop="name_en">
          <el-input v-model="form.name_en" />
        </el-form-item>
        <el-form-item label="中文描述" prop="description_zh">
          <el-input v-model="form.description_zh" type="textarea" />
        </el-form-item>
        <el-form-item label="英文描述" prop="description_en">
          <el-input v-model="form.description_en" type="textarea" />
        </el-form-item>
        <el-form-item label="图片">
          <input type="file" @change="onFileChange" accept="image/*" />
          <el-image v-if="previewImg" :src="previewImg" style="width:60px;height:60px;margin-left:10px;object-fit:cover;border-radius:8px;" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getCertificates, addCertificate, updateCertificate, deleteCertificate } from '../api/certificate';

const certs = ref([]);
const dialogVisible = ref(false);
const editId = ref(null);
const form = reactive({
  name_zh: '',
  name_en: '',
  description_zh: '',
  description_en: '',
  image: null
});
const previewImg = ref('');
const formRef = ref();

const rules = {
  name_zh: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
  name_en: [{ required: true, message: '请输入英文名称', trigger: 'blur' }]
};

const fetchCerts = async () => {
  const res = await getCertificates();
  certs.value = res.data;
};

onMounted(fetchCerts);

const openAdd = () => {
  editId.value = null;
  Object.assign(form, { name_zh: '', name_en: '', description_zh: '', description_en: '', image: null });
  previewImg.value = '';
  dialogVisible.value = true;
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.image = file;
    previewImg.value = URL.createObjectURL(file);
  }
};

const submit = async () => {
  console.log('submit called');
  try {
    await formRef.value.validate();
    const fd = new FormData();
    fd.append('name_zh', form.name_zh);
    fd.append('name_en', form.name_en);
    fd.append('description_zh', form.description_zh);
    fd.append('description_en', form.description_en);
    if (form.image) fd.append('image', form.image);
    if (editId.value) {
      console.log('调用 updateCertificate', editId.value, form);
      await updateCertificate(editId.value, fd);
    } else {
      console.log('调用 addCertificate', form);
      await addCertificate(fd);
    }
    dialogVisible.value = false;
    fetchCerts();
  } catch (err) {
    console.error('保存失败', err);
    alert('保存失败: ' + (err?.response?.data?.error || err.message || err));
  }
};

const delCert = async (id) => {
  await deleteCertificate(id);
  fetchCerts();
};

function resolveImageUrl(url) {
  const baseURL = 'http://localhost:3001';
  if (!url) return '';
  return baseURL.replace(/\/$/, '') + (url.startsWith('/') ? url : '/' + url);
}
</script> 