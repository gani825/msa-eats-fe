// 장바구니 상태 관리 스토어
// - 홈에서 메뉴를 담고, 주문 페이지에서 일괄 주문하는 방식으로 변경됨
import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
    // 장바구니 아이템 목록
    const state = reactive({ items: [] });

    // 담긴 메뉴 총 개수 (중복 합산 아님, 종류 수)
    const totalCount = computed(() => state.items.length);

    // 총 결제 금액 = Σ(단가 × 수량)
    const totalAmount = computed(() =>
        state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    );

    // 장바구니에 메뉴 추가 (이미 있으면 수량만 증가)
    function addToCart(menu) {
        const existing = state.items.find(i => i.menuId === menu.id);
        if (existing) {
            existing.quantity++;
        } else {
            state.items.push({ menuId: menu.id, quantity: 1, price: menu.price });
        }
    }

    // 특정 메뉴 제거
    function removeItem(menuId) {
        state.items = state.items.filter(i => i.menuId !== menuId);
    }

    // 주문 완료 후 전체 초기화
    function clearCart() {
        state.items = [];
    }

    return { state, totalCount, totalAmount, addToCart, removeItem, clearCart };
});