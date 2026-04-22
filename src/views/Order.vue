<script setup>
import { useCartStore } from '@/stores/cart';
import { useOrder } from '@/composables/useOrder'; // 주문 제출 로직 분리

// 장바구니 스토어 (아이템 목록, 총액 관리)
const cartStore = useCartStore();

// 주문 제출 컴포저블 (isSubmitting 상태, submitOrder 함수 제공)
const { isSubmitting, submitOrder } = useOrder();
</script>

<template>
  <div class="order-container">
    <h2 class="page-title">주문 확인</h2>

    <!-- 장바구니가 비었을 때 -->
    <div class="empty-state" v-if="cartStore.state.items.length === 0">
      <p>선택된 메뉴가 없습니다.</p>
      <button @click="$router.push('/')">메뉴판으로 돌아가기</button>
    </div>

    <!-- 장바구니에 아이템이 있을 때 -->
    <div class="order-card" v-else>
      <div v-for="item in cartStore.state.items" :key="item.menuId" class="order-item">
        <div class="item-info">
          <span class="item-name">메뉴 ID: {{ item.menuId }}</span>
          <span class="item-price">{{ item.price.toLocaleString() }}원</span>
        </div>
        <div class="item-controls">
          <!-- 수량 직접 수정 가능 -->
          <input type="number" v-model.number="item.quantity" min="1" />
          <button class="remove-btn" @click="cartStore.removeItem(item.menuId)">삭제</button>
        </div>
      </div>

      <div class="divider"></div>

      <div class="total-section">
        <span>총 주문 금액</span>
        <span class="total-price">{{ cartStore.totalAmount.toLocaleString() }}원</span>
      </div>

      <button
          class="order-btn"
          @click="submitOrder"
          :disabled="isSubmitting"
      >
        {{ isSubmitting ? '주문 처리 중...' : '한번에 주문하기' }}
      </button>

      <button class="back-btn" @click="$router.push('/')">
        돌아가기
      </button>
    </div>
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
  color: #FF4D4F;
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

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-weight: 600;
  color: #333;
}

.item-price {
  font-size: 14px;
  color: #888;
}

.item-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.item-controls input {
  width: 60px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 6px;
  text-align: center;
  font-size: 15px;
}

.remove-btn {
  padding: 6px 10px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #999;
  cursor: pointer;
  font-size: 12px;
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
  color: #FF4D4F;
  font-weight: bold;
}

.order-btn {
  padding: 14px;
  background-color: #FF4D4F;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
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
  background-color: #FF4D4F;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>