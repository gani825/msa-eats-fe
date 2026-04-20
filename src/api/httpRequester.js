import axios from 'axios';
import { reissue } from '@/api/userService';
import { useAuthenticationStore } from '@/stores/authentication';
import { useMessageModalStore } from '@/stores/messageModal';

// 모든 API 요청의 기본 URL 설정 (Gateway 서버)
axios.defaults.baseURL = 'http://localhost:8000/api/';

// 쿠키(AT, RT)를 자동으로 요청에 포함시키는 설정
axios.defaults.withCredentials = true;

// 응답 인터셉터 - 모든 API 응답을 여기서 가로채서 공통 처리
axios.interceptors.response.use(
    // 성공 응답은 그대로 통과
    res => res,

    async err => {
        const authenticationStore = useAuthenticationStore();
        const messageModalStore = useMessageModalStore();

        if (err.response) {
            const { status, config, data } = err.response;
            console.log('err.response: ', err.response);

            // AT 재발급 요청 중에 500이 터지면 → RT도 만료된 것 → 로그아웃 처리
            if (config.url === '/user/reissue' && status === 500) {
                authenticationStore.signOut();
                messageModalStore.setMessage('세션이 만료되었습니다. 다시 로그인해주세요.');
                return Promise.reject(err);
            }

            // 로그인 상태인데 401이 오면 → AT 만료 → AT 재발급 후 원래 요청 재시도
            if (status === 401 && authenticationStore.state.isSigned) {
                try {
                    await reissue(); // RT로 새 AT 발급
                    return await axios.request(err.config); // 원래 요청 재시도
                } catch (reissueError) {
                    return Promise.reject(reissueError);
                }
            }

            // 그 외 에러는 서버에서 온 메시지를 모달로 표시
            const message = data?.resultMessage || data?.message;
            messageModalStore.setMessage(message);

        } else if (err.request) {
            // 서버 응답 자체가 없는 경우 (네트워크 오류, 서버 다운 등)
            messageModalStore.setMessage('서버와 통신할 수 없습니다. 네트워크 상태를 확인해주세요.');
        } else {
            // 요청 설정 중 오류 발생
            messageModalStore.setMessage('요청 중 알 수 없는 오류가 발생했습니다.');
        }

        return Promise.reject(err);
    }
);

export default axios;