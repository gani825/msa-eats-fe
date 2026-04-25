<script setup>
import { useAuthenticationStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';

const authenticationStore = useAuthenticationStore();
const router = useRouter();

// 로그아웃 처리 후 로그인 페이지로 이동
const handleSignout = async () => {
  await authenticationStore.authSignout();
  router.push('/signin');
};
</script>

<template>
  <div>
    <header class="header">
      <div class="header-inner">
        <router-link to="/" class="logo">Food Grid</router-link>
        <nav class="nav">
          <!-- 비로그인 상태일 때 -->
          <template v-if="!authenticationStore.state.isSigned">
            <router-link to="/signin" class="nav-link">로그인</router-link>
            <router-link to="/signup" class="nav-link">회원가입</router-link>
          </template>
          <!-- 로그인 상태일 때 -->
          <template v-else>
            <router-link to="/order/list" class="nav-link">주문내역</router-link>
            <router-link to="/menu/add" class="nav-link">메뉴등록</router-link>
            <button class="signout-btn" @click="handleSignout">로그아웃</button>
          </template>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <!-- 현재 경로에 맞는 컴포넌트가 여기 렌더링됨 -->
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-base);
}

.header {
  background-color: var(--color-surface);
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.header-inner {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: var(--color-primary);
  font-size: 22px;
  font-weight: 900;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link {
  color: var(--color-text-sub);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--color-primary);
}

.user-name {
  color: var(--color-primary);
  font-size: 14px;
}

.signout-btn {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.main-content {
  max-width: 1000px;
  margin: 26px auto;
  padding: 0 24px;
}
</style>