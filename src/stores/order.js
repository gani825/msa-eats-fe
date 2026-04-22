// src/stores/order.js
// 주문 목록 상태 관리 스토어
// - 커서 기반 페이지네이션: lastId 기준으로 20개씩 추가 로드
import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { getOrderList } from '@/api/orderService';

export const useOrderStore = defineStore('order', () => {
    const state = reactive({
        orders: [], // 조회된 주문 목록 누적
        lastId: null, // 커서: 마지막 주문 ID (다음 요청에 사용)
        hasNext: true, // 다음 페이지 존재 여부
        isLoading: false
    });

    // 주문 목록 20개씩 추가 로드 (커서 페이지네이션)
    async function fetchOrders() {
        if (state.isLoading || !state.hasNext) return; // 중복 요청 방지
        state.isLoading = true;
        try {
            const res = await getOrderList({ last_id: state.lastId });
            state.orders.push(...res.resultData.orders); // 기존 목록에 누적
            state.hasNext = res.resultData.hasNext;
            state.lastId = res.resultData.nextLastId; // 다음 커서 갱신
        } catch (err) {
            console.error('주문 목록 로드 실패:', err);
        } finally {
            state.isLoading = false;
        }
    }

    return { state, fetchOrders };
});