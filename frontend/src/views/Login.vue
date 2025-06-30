<template>
  <div class="login-container">
    <div class="login-card">
      <h2>后台登录</h2>
      <el-form :model="form" ref="formRef" @submit.prevent>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" autocomplete="username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="current-password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
      <div v-if="error" class="login-error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const form = ref({ username: '', password: '' });
const error = ref('');
const formRef = ref();
const router = useRouter();

const login = async () => {
  error.value = '';
  if (!form.value.username || !form.value.password) {
    error.value = '请输入账号和密码';
    return;
  }
  try {
    const res = await axios.post('http://localhost:3001/api/login', form.value);
    localStorage.setItem('admin_token', res.data.token);
    router.push('/admin');
  } catch (e) {
    error.value = e?.response?.data?.error || '登录失败';
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
  padding: 0;
  box-sizing: border-box;
}
.login-card {
  background: #fff;
  padding: 40px 32px 32px 32px;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 400px;
  min-width: 0;
  box-sizing: border-box;
}
@media (max-width: 500px) {
  .login-card {
    padding: 24px 8px 16px 8px;
    max-width: 98vw;
    width: 100%;
  }
}
.login-card h2 {
  text-align: center;
  margin-bottom: 28px;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
}
.login-error {
  color: #e74c3c;
  text-align: center;
  margin-top: 12px;
}
</style> 