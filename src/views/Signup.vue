<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '@/api/userService';

const router = useRouter();

const form = ref({
  email: '',
  name: '',
  password: '',
  userRole: '일반유저'
});

const passwordConfirm = ref('');
const isSubmitting = ref(false);

// 비밀번호 일치 여부 확인 (computed로 실시간 체크)
const passwordError = computed(() => {
  if (passwordConfirm.value && form.value.password !== passwordConfirm.value) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
});

// 회원가입 버튼 클릭 시 호출
const handleSignup = async () => {
  if (passwordError.value) return;
  isSubmitting.value = true;

  // User Service의 회원가입 API 호출
  await signup(form.value);

  alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
  router.push('/signin');
  isSubmitting.value = false;
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>회원가입</h2>

      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label>이메일</label>
          <input v-model="form.email" type="email" placeholder="example@green.com" required />
        </div>

        <div class="form-group">
          <label>이름</label>
          <input v-model="form.name" type="text" placeholder="이름을 입력하세요" required />
        </div>

        <div class="form-group">
          <label>비밀번호</label>
          <input v-model="form.password" type="password" placeholder="비밀번호" required />
        </div>

        <div class="form-group">
          <label>비밀번호 확인</label>
          <input v-model="passwordConfirm" type="password" placeholder="비밀번호 재입력" required />
        </div>

        <!-- 비밀번호 불일치 시 에러 메시지 표시 -->
        <p v-if="passwordError" class="error-msg">{{ passwordError }}</p>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? '처리 중...' : '회원가입' }}
        </button>
      </form>

      <p class="link-text">
        이미 계정이 있으신가요? <router-link to="/signin">로그인하기</router-link>
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  font-size: 14px;
  color: #444;
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

button:hover:not(:disabled) {
  background-color: #1b4332;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-msg {
  color: #e63946;
  font-size: 13px;
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