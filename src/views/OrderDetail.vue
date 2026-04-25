<script setup>
import { reactive, onMounted } from 'vue';
import { getOrderDetail } from '@/api/orderService';

// router에서 props: true 설정 → URL 파라미터가 자동으로 props로 주입됨
const props = defineProps({
  orderId: {
    type: String, // URL 파라미터는 기본적으로 String
    required: true
  }
});

const state = reactive({
  detailList: [], // [{ id, name, price, quantity }]
  isLoading: false
});

onMounted(async () => {
  console.log('orderId: ', props.orderId);
  state.isLoading = true;
  try {
    const response = await getOrderDetail(props.orderId);
    state.detailList = response.resultData;
  } catch (error) {
    console.error('상세 정보 로드 실패', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="detail-container">
    <div class="detail-top">
      <button class="back-btn" @click="$router.back()">← 뒤로</button>
      <h1 class="detail-title">주문 상세</h1>
      <p class="detail-desc">주문하신 메뉴 목록이에요</p>
    </div>

    <p v-if="state.isLoading" class="detail-loading">로딩 중...</p>

    <div v-else class="detail-card">
      <div v-for="detail in state.detailList" :key="detail.id" class="detail-item">
        <div class="detail-item-left">
          <span class="detail-emoji">🍱</span>
          <span class="detail-name">{{ detail.name }}</span>
        </div>
        <div class="detail-item-right">
          <span class="detail-qty">{{ detail.quantity }}개</span>
          <span class="detail-price">{{ detail.price?.toLocaleString() }}원</span>
        </div>
      </div>

      <!-- 총액 합산 표시 -->
      <div class="detail-total">
        <span>총 결제 금액</span>
        <span class="detail-total-price">
          {{ state.detailList.reduce((sum, d) => sum + d.price * d.quantity, 0).toLocaleString() }}원
        </span>
      </div>
    </div>

    <p v-if="!state.isLoading && state.detailList.length === 0" class="detail-empty">
      상세 정보를 불러올 수 없어요.
    </p>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 4px 0 40px;
}

.detail-top {
  margin-bottom: 28px;
}

.back-btn {
  background: transparent;
  border: none;
  color: var(--color-secondary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 12px;
}

.detail-title {
  font-size: 26px;
  font-weight: 900;
  color: var(--color-text-base);
  letter-spacing: -0.5px;
}

.detail-desc {
  margin-top: 6px;
  font-size: 13px;
  color: var(--color-text-light);
}

.detail-loading {
  text-align: center;
  color: var(--color-text-muted);
  margin-top: 80px;
  font-size: 15px;
}

.detail-card {
  background: var(--color-surface);
  border-radius: 14px;
  border: 1.5px solid var(--color-border);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);
}

.detail-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-emoji {
  font-size: 24px;
}

.detail-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-base);
}

.detail-item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.detail-qty {
  font-size: 12px;
  color: var(--color-text-muted);
}

.detail-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-base);
}

.detail-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  margin-top: 4px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-base);
}

.detail-total-price {
  font-size: 20px;
  font-weight: 900;
  color: var(--color-primary);
}

.detail-empty {
  text-align: center;
  color: var(--color-text-muted);
  margin-top: 80px;
  font-size: 15px;
}
</style>