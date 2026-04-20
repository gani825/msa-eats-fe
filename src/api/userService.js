import axios from './httpRequester';

const path = '/user';

// 로그인 API 호출
export const signin = async data => {
    const res = await axios.post(`${path}/signin`, data);
    return res.data;
};

// 회원가입 API 호출
export const signup = async data => {
    const res = await axios.post(`${path}/signup`, data);
    return res.data;
};

// 로그아웃 API 호출
export const signout = async data => {
    const res = await axios.post(`${path}/signout`, data);
    return res.data;
};

// AT 만료 시 RT로 새 AT 재발급 요청
export const reissue = async () => {
    const res = await axios.post(`${path}/reissue`);
    return res.data;
};