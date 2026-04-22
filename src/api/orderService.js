// 주문 관련 API 서비스
import axios from './httpRequester';

const path = '/order';

// 주문 생성 (totalAmount 포함 필수 - BE에서 금액 위변조 검증)
export const postOrder = async data => {
    const res = await axios.post(path, data);
    return res.data;
};

// 주문 목록 조회 (커서 기반 페이지네이션: params = { last_id })
export const getOrderList = async params => {
    const res = await axios.get(path, { params });
    return res.data;
};

// 주문 상세 조회 (orderId로 해당 주문의 메뉴명 포함 아이템 목록 조회)
export const getOrderDetail = async orderId => {
    const res = await axios.get(`${path}/${orderId}`);
    return res.data;
};