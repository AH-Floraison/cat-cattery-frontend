<template>
  <el-card>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:20px;font-weight:bold;">联系方式管理</span>
      <el-button type="primary" @click="openAdd">新增联系方式</el-button>
    </div>
    <el-table :data="contacts" style="width:100%;margin-top:20px;">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="value" label="内容" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delContact(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="editId ? '编辑联系方式' : '新增联系方式'" v-model="dialogVisible">
      <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
        <el-form-item label="类型" prop="type">
          <el-input v-model="form.type" placeholder="如：电话、邮箱、微信、小红书等" />
        </el-form-item>
        <el-form-item label="内容" prop="value">
          <el-input v-model="form.value" />
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
import { getContacts, addContact, updateContact, deleteContact } from '../api/contact';

const contacts = ref([]);
const dialogVisible = ref(false);
const editId = ref(null);
const form = reactive({
  type: '',
  value: ''
});
const formRef = ref();

const rules = {
  type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
  value: [{ required: true, message: '请输入内容', trigger: 'blur' }]
};

const fetchContacts = async () => {
  const res = await getContacts();
  contacts.value = res.data;
};

onMounted(fetchContacts);

const openAdd = () => {
  editId.value = null;
  Object.assign(form, { type: '', value: '' });
  dialogVisible.value = true;
};

const openEdit = (row) => {
  editId.value = row.id;
  Object.assign(form, row);
  dialogVisible.value = true;
};

const submit = async () => {
  await formRef.value.validate();
  if (editId.value) {
    await updateContact(editId.value, form);
  } else {
    await addContact(form);
  }
  dialogVisible.value = false;
  fetchContacts();
};

const delContact = async (id) => {
  await deleteContact(id);
  fetchContacts();
};
</script> 