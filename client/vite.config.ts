import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // .envファイルで定義したVITE_BASEを読み込む
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE,
    plugins: [react()],
    server: {
      host: true, // ネットワーク越しにアクセス可能にする
      proxy: { // スマホからAPIサーバにアクセスできるように
        "/api": {
          target: "http://localhost:12000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
  };
});
