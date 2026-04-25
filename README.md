# 🍱 FoodGrid - Frontend

수업 실습을 기반으로 구현한 MSA 구조의 음식 주문 플랫폼 프론트엔드입니다.

<img width="1909" height="866" alt="Image" src="https://github.com/user-attachments/assets/69a1b5bb-0903-444b-beb3-229188d5f747" />

## Tech Stack

| 구분 | 기술 |
|---|---|
| Framework | Vue.js 3 |
| 상태 관리 | Pinia |
| HTTP 클라이언트 | Axios |
| 라우팅 | Vue Router |

---

## 프로젝트 구조

```
src/
├── api/
│   ├── httpRequester.js   # Axios 인터셉터 (401 → AT 재발급)
│   ├── userService.js     # 로그인, 회원가입, 로그아웃
│   ├── storeService.js    # 메뉴 조회, 등록
│   └── orderService.js    # 주문 생성, 목록, 상세 조회
├── composables/
│   └── useOrder.js        # 주문 제출 로직 (뷰에서 분리)
├── stores/
│   ├── authentication.js  # 로그인 상태 (persist)
│   ├── cart.js            # 장바구니 상태
│   ├── order.js           # 주문 목록 (커서 페이지네이션)
│   └── messageModal.js    # 메시지 모달
├── router/
│   └── index.js
└── views/
    ├── Home.vue           # 메뉴 그리드, 장바구니 담기
    ├── Signin.vue
    ├── Signup.vue
    ├── Order.vue          # 주문 확인, 결제
    ├── OrderList.vue      # 주문 목록 (더보기)
    ├── OrderDetail.vue    # 주문 상세
    └── MenuAdd.vue        # 메뉴 등록
```

---

## 주요 기능

**장바구니 (cartStore)**
- 메뉴 담기, 수량 변경, 삭제
- 총 결제 금액 실시간 계산

**주문 목록 (orderStore)**
- 커서 기반 페이지네이션으로 20개씩 누적 로드

**Axios 인터셉터**
- 401 응답 시 자동으로 Access Token 재발급 후 요청 재시도

**CSS 변수 시스템**
- 메인 컬러 `#FF4D4F`, 보조 컬러 `#ff6b35`로 컬러 분리

---

## 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

백엔드 Gateway가 `localhost:8000`에서 실행 중이어야 합니다.

---

## 화면 구성

| 경로 | 화면 |
|---|---|
| `/` | 메뉴 그리드 (홈) |
| `/signin` | 로그인 |
| `/signup` | 회원가입 |
| `/order` | 주문 확인 |
| `/order/list` | 주문 목록 |
| `/order/:orderId` | 주문 상세 |
| `/menu/add` | 메뉴 등록 |