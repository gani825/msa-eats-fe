<script setup>
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useOrderStore} from '@/stores/order';

const router = useRouter();
const orderStore = useOrderStore();

onMounted(() => {
  // 이미 로드된 데이터가 있으면 재요청 안 함
  if (orderStore.state.orders.length === 0) {
    orderStore.fetchOrders();
  }
});

// 주문 카드 클릭 시 상세 페이지로 이동
const goToDetail = (orderId) => {
  router.push({name: 'OrderDetail', params: {orderId}});
};
</script>

<template>
  <div class="ol-wrap">
    <div class="ol-top">
      <h1 class="ol-title">주문 내역</h1>
      <p class="ol-desc">지금까지 주문한 내역이에요</p>
    </div>

    <div class="ol-list">
      <!-- orderId, totalAmount, status, userName 포함된 목록 -->
      <div
          v-for="order in orderStore.state.orders"
          :key="order.orderId"
          class="ol-card"
          @click="goToDetail(order.orderId)"
      >
        <div class="ol-card-header">
          <span class="ol-status" :class="{ pending: order.status === '주문대기', completed: order.status === '주문완료', cancelled: order.status === '주문취소'}">
            {{ order.status }}
        </span>
          <span class="ol-total">{{ order.totalAmount?.toLocaleString() }}원</span>
        </div>
        <div class="ol-user">{{ order.userName }} 님의 주문 · #{{ order.orderId }}</div>
      </div>
    </div>

    <!-- 다음 페이지 존재하면 더보기 버튼 표시 -->
    <div class="ol-footer">
      <button
          v-if="orderStore.state.hasNext"
          class="ol-more-btn"
          @click="orderStore.fetchOrders()"
          :disabled="orderStore.state.isLoading"
      >
        {{ orderStore.state.isLoading ? '로딩 중...' : '주문 20개 더보기' }}
      </button>
    </div>

    <p v-if="orderStore.state.orders.length === 0 && !orderStore.state.isLoading" class="ol-empty">
      주문 내역이 없어요.
    </p>
  </div>
</template>

<style scoped>
.ol-wrap {
  padding: 4px 0 40px;
}

.ol-top {
  margin-bottom: 28px;
}

.ol-title {
  font-size: 26px;
  font-weight: 900;
  color: var(--color-text-base);
  letter-spacing: -0.5px;
}

.ol-desc {
  margin-top: 6px;
  font-size: 13px;
  color: var(--color-text-light);
}

.ol-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ol-card {
  background: var(--color-surface);
  border-radius: 14px;
  border: 1.5px solid var(--color-border);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.ol-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
}

.ol-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ol-status {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  background: #f0f0f0;
  color: var(--color-text-sub);
}

.ol-status.pending {
  background: var(--color-secondary-bg);
  color: var(--color-secondary);
}

.ol-status.completed {
  background: var(--color-success-bg);
  color: var(--color-success-text);
}

.ol-status.cancelled {
  background: #f5f5f5;
  color: var(--color-text-muted);
}

.ol-total {
  font-size: 18px;
  font-weight: 900;
  color: var(--color-text-base);
}

.ol-user {
  font-size: 13px;
  color: var(--color-text-muted);
}

.ol-footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.ol-more-btn {
  padding: 10px 24px;
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-sub);
  font-size: 14px;
  cursor: pointer;
}

.ol-more-btn:disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.ol-empty {
  text-align: center;
  color: var(--color-text-muted);
  margin-top: 80px;
  font-size: 15px;
}
</style>