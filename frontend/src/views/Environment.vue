<template>
  <el-card>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:20px;font-weight:bold;">环境图片管理</span>
      <el-button type="primary" @click="openAdd">新增环境图片</el-button>
    </div>
    <el-table :data="envs" style="width:100%;margin-top:20px;">
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
          <el-button size="small" type="danger" @click="delEnv(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="editId ? '编辑环境图片' : '新增环境图片'" v-model="dialogVisible">
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
import { getEnvironments, addEnvironment, updateEnvironment, deleteEnvironment } from '../api/environment';

const baseURL = 'http://localhost:3001';
const envs = ref([]);
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
  name_zh: [
    {
      validator: (rule, value, callback) => {
        if (!value && !form.name_en) {
          callback(new Error('中英文名称至少填写一个'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  name_en: [
    {
      validator: (rule, value, callback) => {
        if (!value && !form.name_zh) {
          callback(new Error('中英文名称至少填写一个'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

const fetchEnvs = async () => {
  const res = await getEnvironments();
  envs.value = res.data;
};

onMounted(fetchEnvs);

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
  try {
    await formRef.value.validate();
    const fd = new FormData();
    fd.append('name_zh', form.name_zh);
    fd.append('name_en', form.name_en);
    fd.append('description_zh', form.description_zh);
    fd.append('description_en', form.description_en);
    if (form.image) fd.append('image', form.image);
    if (editId.value) {
      await updateEnvironment(editId.value, fd);
    } else {
      await addEnvironment(fd);
    }
    dialogVisible.value = false;
    await fetchEnvs();
  } catch (err) {
    alert('保存失败: ' + (err?.response?.data?.error || err.message || err));
  }
};

const delEnv = async (id) => {
  await deleteEnvironment(id);
  fetchEnvs();
};

function resolveImageUrl(url) {
  if (!url) return '';
  // 防止出现 //uploads 或 baseURL 末尾多斜杠
  return baseURL.replace(/\/$/, '') + (url.startsWith('/') ? url : '/' + url);
}
</script> 