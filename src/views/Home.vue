<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMenuList } from '@/api/storeService';
import { useAuthenticationStore } from '@/stores/authentication';
import { useCartStore } from '@/stores/cart'; // orderMenuStore → cartStore로 변경

const authenticationStore = useAuthenticationStore();
const router = useRouter();
const menus = ref([]);
const cartStore = useCartStore();

const fetchMenus = async () => {
  const res = await getMenuList();
  menus.value = res.resultData;
};

// 장바구니 담기 (기존: 바로 주문 페이지 이동 → 변경: 카트에 추가 후 수량 누적)
const addToCart = (menu) => {
  cartStore.addToCart(menu);
};

onMounted(fetchMenus);
</script>

<template>
  <div class="fg-wrap">
    <div class="fg-top">
      <span class="fg-user-name">안녕하세요 {{ authenticationStore.state.signedUser?.name }}님</span>
      <p class="fg-desc">오늘 뭐 먹지? 지금 바로 주문해요 🍽</p>
    </div>

    <!-- 장바구니에 담긴 항목이 있으면 주문 바로가기 표시 -->
    <div v-if="cartStore.totalCount > 0" class="cart-summary">
      <span>현재 {{ cartStore.totalCount }}개 담김 · {{ cartStore.totalAmount.toLocaleString() }}원</span>
      <button @click="router.push('/order')">주문하러 가기 →</button>
    </div>

    <div class="fg-grid">
      <div
          v-for="menu in menus"
          :key="menu.id"
          class="fg-card"
          :class="{ 'fg-sold-out': menu.stockQuantity === 0 }"
      >
        <div class="fg-thumb">
          <span class="fg-emoji">🍱</span>
          <span v-if="menu.stockQuantity === 0" class="fg-badge-sold">품절</span>
          <span v-else-if="menu.stockQuantity <= 3" class="fg-badge-low">마감임박</span>
        </div>
        <div class="fg-info">
          <span class="fg-cat">{{ menu.menuCategory }}</span>
          <h3 class="fg-name">{{ menu.name }}</h3>
          <div class="fg-bottom">
            <span class="fg-price">{{ menu.price.toLocaleString() }}원</span>
            <span class="fg-stock">{{ menu.stockQuantity }}개 남음</span>
          </div>
          <!-- 품절이 아닐 때만 담기 버튼 표시 -->
          <button
              v-if="menu.stockQuantity > 0"
              class="fg-add-btn"
              @click="addToCart(menu)"
          >
            + 담기
          </button>
        </div>
      </div>
    </div>

    <p v-if="menus.length === 0" class="fg-empty">메뉴가 없어요.</p>
  </div>
</template>

<style scoped>
.fg-wrap {
  padding: 4px 0 35px;
}

.fg-top {
  margin-bottom: 32px;
}

.fg-user-name {
  font-size: 20px;
  font-weight: 700;
  color: #FF4D4F;
}

.fg-desc {
  margin-top: 6px;
  font-size: 16px;
  color: #777;
}

/* 장바구니 요약 바 */
.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff4ec;
  border: 1.5px solid #ff6b35;
  border-radius: 10px;
  padding: 12px 18px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #ff6b35;
}

.cart-summary button {
  background: #ff6b35;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 700;
}

.fg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 20px;
}

.fg-card {
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  border: 1.5px solid #ebebeb;
}

.fg-card:hover:not(.fg-sold-out) {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.fg-sold-out {
  opacity: 0.45;
}

.fg-thumb {
  background: #f7f3ee;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fg-emoji {
  font-size: 48px;
}

.fg-badge-sold {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #333;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
}

.fg-badge-low {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff6b35;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
}

.fg-info {
  padding: 14px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.fg-cat {
  font-size: 11px;
  color: #ff6b35;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.fg-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  line-height: 1.3;
}

.fg-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.fg-price {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.fg-stock {
  font-size: 11px;
  color: #bbb;
}

.fg-add-btn {
  margin-top: 8px;
  padding: 7px;
  background: #ff6b35;
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.fg-empty {
  text-align: center;
  color: #ccc;
  margin-top: 80px;
  font-size: 15px;
}
</style>