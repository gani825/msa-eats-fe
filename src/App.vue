<script setup>
import { useAuthenticationStore } from '@/stores/authentication';

// 로그인 상태에 따라 헤더 메뉴를 다르게 보여주기 위해 store 가져오기
const authenticationStore = useAuthenticationStore();
</script>

<template>
  <div>
    <header class="header">
      <div class="header-inner">
        <router-link to="/" class="logo">🍱 Green Eats</router-link>
        <nav class="nav">
          <!-- 비로그인 상태일 때 -->
          <template v-if="!authenticationStore.state.isSigned">
            <router-link to="/signin" class="nav-link">로그인</router-link>
            <router-link to="/signup" class="nav-link">회원가입</router-link>
          </template>
          <!-- 로그인 상태일 때 -->
          <template v-else>
            <router-link to="/menu/add" class="nav-link">메뉴등록</router-link>
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
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

.header {
  background-color: #2d6a4f;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
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
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: #d8f3dc;
  text-decoration: none;
  font-size: 15px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.2s;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.15);
}

.main-content {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 24px;
}
</style>