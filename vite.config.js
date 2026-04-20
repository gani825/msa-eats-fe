import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        // @를 src 폴더로 단축해서 쓸 수 있게 설정
        // 예: @/stores/authentication → src/stores/authentication
        alias: { '@': path.resolve(__dirname, './src') }
    }
})