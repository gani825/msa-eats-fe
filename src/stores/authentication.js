import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { signin, signout } from '@/api/userService'
import router from '@/router'

export const useAuthenticationStore = defineStore(
    'authentication',
    () => {
        // 로그인 상태와 유저 정보를 담는 반응형 상태
        const state = reactive({
            signedUser: {
                id: 0,
                name: ''
            },
            isSigned: false // true: 로그인 상태, false: 비로그인 상태
        })

        // 로그인 처리 - API 호출 후 상태 업데이트
        const authSignin = async data => {
            const res = await signin(data)
            state.signedUser = res.resultData
            state.isSigned = true
        }

        // 로그아웃 처리 - API 호출 후 상태 초기화
        const authSignout = async () => {
            await signout()
            state.isSigned = false
            state.signedUser = null
            await router.push('/signin')
        }

        return { state, authSignin, authSignout }
    },
    { persist: true } // 새로고침해도 로그인 상태 유지
)