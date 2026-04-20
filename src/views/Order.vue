<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderMenuStore } from '@/stores/orderMenuStore';
import { placeOrder } from '@/api/orderService';

const router = useRouter();
const orderMenuStore = useOrderMenuStore();

const state = reactive({
  selectedMenu: {
    name: '',
    price: 0,
    stockQuantity: 0
  },
  order: {
    menuId: 0,
    price: 0,
    quantity: 1
  },
  loading: false
});

onMounted(() => {
  // store에서 선택한 메뉴 정보 가져오기
  state.selectedMenu = orderMenuStore.state.selectedMenu;
  state.order.menuId = state.selectedMenu.menuId;
  state.order.price = state.selectedMenu.price;
});

// 수량 변경 시 범위 제한 및 총 금액 재계산
const validateQuantity = () => {
  if (state.order.quantity < 1) {
    state.order.quantity = 1;
  } else if (state.order.quantity > state.selectedMenu.stockQuantity) {
    state.order.quantity = state.selectedMenu.stockQuantity;
  }
  // 총 금액 = 수량 * 단가
  state.order.price = state.order.quantity * state.selectedMenu.price;
};

// 주문 제출
const submitOrder = async () => {
  state.loading = true;
  const params = {
    items: [state.order]
  };
  await placeOrder(params);
  orderMenuStore.clearOrderMenu(); // 주문 완료 후 store 초기화
  alert('주문이 완료되었습니다!')
  router.push('/');
};
</script>

<template>
  <!-- 선택된 메뉴가 있을 때 -->
  <div class="order-container" v-if="state.selectedMenu">
    <h2 class="page-title">주문 확인</h2>

    <div class="order-card">
      <h3 class="menu-name">{{ state.selectedMenu.name }}</h3>
      <p class="menu-price">단가: {{ state.selectedMenu.price.toLocaleString() }}원</p>

      <div class="quantity-control">
        <label>수량</label>
        <input
            type="number"
            v-model.number="state.order.quantity"
            min="1"
            :max="state.selectedMenu.stockQuantity"
            @input="validateQuantity"
        />
      </div>

      <div class="divider"></div>

      <div class="total-section">
        <span>총 주문 금액</span>
        <span class="total-price">{{ state.order.price.toLocaleString() }}원</span>
      </div>

      <button
          class="order-btn"
          @click="submitOrder"
          :disabled="state.loading"
      >
        {{ state.loading ? '주문 중...' : '결제 및 주문하기' }}
      </button>

      <button class="back-btn" @click="router.push('/')">
        돌아가기
      </button>
    </div>
  </div>

  <!-- 선택된 메뉴가 없을 때 -->
  <div class="empty-state" v-else>
    <p>선택된 메뉴가 없습니다.</p>
    <button @click="router.push('/')">메뉴판으로 돌아가기</button>
  </div>
</template>

<style scoped>
.order-container {
  max-width: 480px;
  margin: 0 auto;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  color: #2d6a4f;
  margin-bottom: 20px;
}

.order-card {
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.menu-name {
  font-size: 20px;
  font-weight: bold;
  color: #1b4332;
}

.menu-price {
  color: #555;
  font-size: 15px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity-control label {
  font-weight: 600;
  color: #333;
}

.quantity-control input {
  width: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  text-align: center;
}

.divider {
  border-top: 1px solid #eee;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
}

.total-price {
  font-size: 20px;
  color: #2d6a4f;
  font-weight: bold;
}

.order-btn {
  padding: 14px;
  background-color: #2d6a4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
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

.empty-state {
  text-align: center;
  margin-top: 80px;
  color: #aaa;
}

.empty-state button {
  margin-top: 16px;
  padding: 10px 20px;
  background-color: #2d6a4f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>