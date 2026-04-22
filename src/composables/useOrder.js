// 주문 제출 로직을 뷰에서 분리한 컴포저블 (Composition API 재사용 패턴)
// - Order.vue에서 import해서 사용
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { postOrder } from '@/api/orderService';

export function useOrder() {
    const router = useRouter();
    const cartStore = useCartStore();
    const isSubmitting = ref(false);

    const submitOrder = async () => {
        if (cartStore.state.items.length === 0) {
            alert('장바구니가 비어있습니다.');
            return;
        }
        if (!confirm('정말 주문하시겠습니까?')) return;

        isSubmitting.value = true;
        try {
            // BE에서 totalAmount를 서버 계산값과 비교 검증하므로 반드시 포함
            const res = await postOrder({
                items: cartStore.state.items.map(item => ({
                    menuId: item.menuId,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartStore.totalAmount
            });
            alert(`주문 성공! 주문번호: ${res.resultData}`);
            cartStore.clearCart();
            router.push('/');
        } catch (err) {
            alert('주문 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            isSubmitting.value = false;
        }
    };

    return { isSubmitting, submitOrder };
}