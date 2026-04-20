<script setup>
import { ref } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authentication = useAuthenticationStore();
const router = useRouter();

// 로그인 버튼 클릭 시 호출
const handleLogin = async () => {
  const params = {
    email: email.value,
    password: password.value
  }
  await authentication.authSignin(params);
  alert('로그인 성공!');
  router.push('/'); // 홈으로 이동
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>로그인</h2>
      <input v-model="email" type="email" placeholder="이메일" />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <button @click="handleLogin">로그인</button>
      <p class="link-text">
        계정이 없으신가요? <router-link to="/signup">회원가입</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.auth-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

h2 {
  text-align: center;
  color: #2d6a4f;
  margin-bottom: 8px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border 0.2s;
}

input:focus {
  border-color: #2d6a4f;
}

button {
  padding: 12px;
  background-color: #2d6a4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #1b4332;
}

.link-text {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.link-text a {
  color: #2d6a4f;
  font-weight: bold;
}
</style>