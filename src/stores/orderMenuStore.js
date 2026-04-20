import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useOrderMenuStore = defineStore('order', () => {
    // 홈에서 선택한 메뉴 정보를 주문 페이지로 전달하기 위한 상태
    const state = reactive({
        selectedMenu: null
    })

    // 선택한 메뉴 저장
    const setOrderMenu = menu => state.selectedMenu = menu

    // 주문 완료 후 상태 초기화
    const clearOrderMenu = () => state.selectedMenu = null

    return { state, setOrderMenu, clearOrderMenu }
})