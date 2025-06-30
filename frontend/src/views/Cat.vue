<template>
  <el-card>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:20px;font-weight:bold;">猫猫管理</span>
      <el-button type="primary" @click="openAdd">新增猫猫</el-button>
    </div>
    <el-table :data="cats" style="width:100%;margin-top:20px;">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name_zh" label="中文名" />
      <el-table-column prop="name_en" label="英文名" />
      <el-table-column prop="breed_zh" label="中文品种" />
      <el-table-column prop="breed_en" label="英文品种" />
      <el-table-column prop="color_zh" label="中文颜色" />
      <el-table-column prop="color_en" label="英文颜色" />
      <el-table-column prop="description_zh" label="中文描述" />
      <el-table-column prop="description_en" label="英文描述" />
      <el-table-column label="图片" width="120">
        <template #default="scope">
          <el-image v-if="scope.row.image_url" :src="resolveImageUrl(scope.row.image_url)" style="width:60px;height:60px;object-fit:cover;border-radius:8px;" />
        </template>
      </el-table-column>
      <el-table-column prop="is_available" label="在售" width="70">
        <template #default="scope">
          <el-tag :type="scope.row.is_available ? 'success' : 'info'">
            {{ scope.row.is_available ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delCat(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="editId ? '编辑猫猫' : '新增猫猫'" v-model="dialogVisible">
      <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
        <el-form-item label="中文名" prop="name_zh">
          <el-input v-model="form.name_zh" />
        </el-form-item>
        <el-form-item label="英文名" prop="name_en">
          <el-input v-model="form.name_en" />
        </el-form-item>
        <el-form-item label="中文品种" prop="breed_zh">
          <el-input v-model="form.breed_zh" />
        </el-form-item>
        <el-form-item label="英文品种" prop="breed_en">
          <el-input v-model="form.breed_en" />
        </el-form-item>
        <el-form-item label="中文颜色" prop="color_zh">
          <el-input v-model="form.color_zh" />
        </el-form-item>
        <el-form-item label="英文颜色" prop="color_en">
          <el-input v-model="form.color_en" />
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
        <el-form-item label="在售">
          <el-switch v-model="form.is_available" active-text="是" inactive-text="否" />
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
import { getCats, addCat, updateCat, deleteCat } from '../api/cat';

const baseURL = 'http://localhost:3001';
const cats = ref([]);
const dialogVisible = ref(false);
const editId = ref(null);
const form = reactive({
  name_zh: '',
  name_en: '',
  breed_zh: '',
  breed_en: '',
  color_zh: '',
  color_en: '',
  description_zh: '',
  description_en: '',
  is_available: true,
  image: null
});
const previewImg = ref('');
const formRef = ref();

const rules = {
  name_zh: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
  name_en: [{ required: true, message: '请输入英文名', trigger: 'blur' }]
};

const fetchCats = async () => {
  const res = await getCats();
  cats.value = res.data;
};

onMounted(fetchCats);

const openAdd = () => {
  editId.value = null;
  Object.assign(form, { name_zh: '', name_en: '', breed_zh: '', breed_en: '', color_zh: '', color_en: '', description_zh: '', description_en: '', is_available: true, image: null });
  previewImg.value = '';
  dialogVisible.value = true;
};

const openEdit = (row) => {
  editId.value = row.id;
  Object.assign(form, row);
  previewImg.value = row.image_url ? baseURL + row.image_url : '';
  form.image = null;
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
  await formRef.value.validate();
  const fd = new FormData();
  fd.append('name_zh', form.name_zh || '');
  fd.append('name_en', form.name_en || '');
  fd.append('breed_zh', form.breed_zh || '');
  fd.append('breed_en', form.breed_en || '');
  fd.append('color_zh', form.color_zh || '');
  fd.append('color_en', form.color_en || '');
  fd.append('description_zh', form.description_zh || '');
  fd.append('description_en', form.description_en || '');
  fd.append('is_available', form.is_available ? '1' : '0');
  if (form.image) fd.append('image', form.image);
  if (editId.value) {
    await updateCat(editId.value, fd);
  } else {
    await addCat(fd);
  }
  dialogVisible.value = false;
  fetchCats();
};

const delCat = async (id) => {
  await deleteCat(id);
  fetchCats();
};

function resolveImageUrl(url) {
  if (!url) return '';
  return baseURL.replace(/\/$/, '') + (url.startsWith('/') ? url : '/' + url);
}
</script> 