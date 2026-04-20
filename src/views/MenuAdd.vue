<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { postMenu, getCodeList } from '@/api/storeService';

const router = useRouter();

const state = reactive({
  menu: {
    name: '',
    price: 0,
    stockQuantity: 0,
    menuCategory: ''
  },
  categoryList: [], // 카테고리 코드 목록 (백엔드 /store/code API에서 가져옴)
  loading: false
});

// 카테고리 목록 조회 (Store Service → /store/code?code_type=menuCategory)
onMounted(async () => {
  const res = await getCodeList({ code_type: 'menuCategory' });
  state.categoryList = res.resultData;
});

// 메뉴 등록 버튼 클릭 시 호출
const submit = async () => {
  state.loading = true;
  await postMenu(state.menu);
  alert('메뉴가 등록되었습니다.');
  router.push('/');
  state.loading = false;
};
</script>

<template>
  <div class="menu-add-container">
    <h2 class="page-title">메뉴 등록</h2>

    <div class="form-card">
      <div class="form-group">
        <label>메뉴명</label>
        <input type="text" v-model="state.menu.name" placeholder="메뉴 이름을 입력하세요" />
      </div>

      <div class="form-group">
        <label>가격</label>
        <input type="number" v-model.number="state.menu.price" min="100" placeholder="가격 (원)" />
      </div>

      <div class="form-group">
        <label>수량</label>
        <input type="number" v-model.number="state.menu.stockQuantity" min="0" placeholder="재고 수량" />
      </div>

      <div class="form-group">
        <label>카테고리</label>
        <!-- 백엔드에서 받아온 카테고리 목록으로 select 렌더링 -->
        <select v-model="state.menu.menuCategory">
          <option value="" disabled>카테고리를 선택하세요</option>
          <option v-for="item in state.categoryList" :key="item.code" :value="item.value">
            {{ item.value }}
          </option>
        </select>
      </div>

      <button class="submit-btn" @click="submit" :disabled="state.loading">
        {{ state.loading ? '등록 중...' : '등록하기' }}
      </button>

      <button class="back-btn" @click="router.push('/')">
        취소
      </button>
    </div>
  </div>
</template>

<style scoped>
.menu-add-container {
  max-width: 480px;
  margin: 0 auto;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  color: #2d6a4f;
  margin-bottom: 20px;
}

.form-card {
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
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

input, select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border 0.2s;
}

input:focus, select:focus {
  border-color: #2d6a4f;
}

.submit-btn {
  padding: 14px;
  background-color: #2d6a4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1b4332;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.back-btn {
  padding: 10px;
  background-color: transparent;
  color: #888;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #f5f5f5;
}
</style>