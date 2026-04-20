import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMessageModalStore = defineStore('messageModal', () => {
    // 에러 메시지 모달 상태
    const state = reactive({
        message: null,
        isShow: false
    })

    // 메시지 설정 시 모달 표시
    const setMessage = val => {
        console.log('messageModalStore-setMessage-val:', val)
        state.message = val
        state.isShow = true
    }

    // 모달 닫기
    const closeMessage = () => {
        state.message = null
        state.isShow = false
    }

    return { state, setMessage, closeMessage }
})