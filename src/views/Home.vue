<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMenuList } from '@/api/storeService';
import { useOrderMenuStore } from '@/stores/orderMenuStore';

const router = useRouter();
const menus = ref([]);
const orderMenuStore = useOrderMenuStore();

// 메뉴 목록 조회 (Gateway → Store Service)
const fetchMenus = async () => {
  const res = await getMenuList();
  menus.value = res.resultData;
};

// 선택한 메뉴를 store에 저장 후 주문 페이지로 이동
const goToOrder = (menu) => {
  orderMenuStore.setOrderMenu({
    menuId: menu.id,
    name: menu.name,
    price: menu.price,
    stockQuantity: menu.stockQuantity
  });
  router.push('/order');
};

onMounted(fetchMenus);
</script>

<template>
  <div>
    <h1 class="page-title">오늘의 메뉴</h1>
    <div class="menu-grid">
      <div v-for="menu in menus" :key="menu.id" class="menu-card">
        <div class="menu-category">{{ menu.menuCategory }}</div>
        <h3 class="menu-name">{{ menu.name }}</h3>
        <p class="menu-price">{{ menu.price.toLocaleString() }}원</p>
        <p class="menu-stock">남은 수량: {{ menu.stockQuantity }}개</p>
        <button
            class="order-btn"
            @click="goToOrder(menu)"
            :disabled="menu.stockQuantity === 0"
        >
          {{ menu.stockQuantity === 0 ? '품절' : '주문하기' }}
        </button>
      </div>
    </div>
    <p v-if="menus.length === 0" class="empty-msg">등록된 메뉴가 없습니다.</p>
  </div>
</template>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #2d6a4f;
  margin-bottom: 24px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.menu-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s;
}

.menu-card:hover {
  transform: translateY(-3px);
}

.menu-category {
  font-size: 12px;
  color: #888;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 20px;
  width: fit-content;
}

.menu-name {
  font-size: 18px;
  font-weight: bold;
  color: #1b4332;
}

.menu-price {
  font-size: 16px;
  color: #2d6a4f;
  font-weight: 600;
}

.menu-stock {
  font-size: 13px;
  color: #999;
}

.order-btn {
  margin-top: 8px;
  padding: 10px;
  background-color: #2d6a4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.order-btn:hover:not(:disabled) {
  background-color: #1b4332;
}

.order-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.empty-msg {
  text-align: center;
  color: #aaa;
  margin-top: 60px;
  font-size: 16px;
}
</style>