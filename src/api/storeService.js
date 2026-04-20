import axios from './httpRequester';

const path = '/store/menu';

// 메뉴 등록 API 호출
export const postMenu = async data => {
    const res = await axios.post(path, data);
    return res.data;
};

// 전체 메뉴 목록 조회 API 호출
export const getMenuList = async () => {
    const res = await axios.get(path);
    return res.data;
};

// 카테고리 코드 목록 조회 API 호출
// params 예시: { code_type: 'menuCategory' }
export const getCodeList = async params => {
    const res = await axios.get('/store/code', { params });
    return res.data;
};