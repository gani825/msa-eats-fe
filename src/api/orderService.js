import axios from './httpRequester';

const path = '/order';

// 주문 생성 API 호출
// data 예시: { items: [{ menuId, price, quantity }] }
export const placeOrder = async data => {
    const res = await axios.post(path, data);
    return res.data; // 생성된 Order ID 반환
};