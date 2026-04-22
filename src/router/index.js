import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/Signin.vue'
import Home from '@/views/Home.vue'
import Order from '@/views/Order.vue'
import OrderList from '@/views/OrderList.vue'
import OrderDetail from '@/views/OrderDetail.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Home }, // 메인 메뉴판
        { path: '/signin', component: SignIn },  // 로그인
        { path: '/signup', component: () => import('@/views/Signup.vue') }, // 회원가입 (지연 로딩)
        { path: '/menu/add', component: () => import('@/views/MenuAdd.vue') }, // 메뉴 등록 (지연 로딩)
        { path: '/order', component: Order }, // 주문 확인
        { path: '/order/list', component: OrderList }, // 주문 목록 (/orders → /order/list 변경)
        // props: true → URL의 orderId 파라미터를 컴포넌트 props로 자동 전달
        { path: '/order/:orderId', name: 'OrderDetail', component: OrderDetail, props: true }, // 주문 상세
    ],
})

export default router