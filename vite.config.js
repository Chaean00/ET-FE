// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import svgr from "vite-plugin-svgr";

// export default defineConfig(({ mode }) => {
//   // 현재 mode에 맞는 환경 변수를 로드합니다.
//   const env = loadEnv(mode, process.cwd());

//   return {
//     plugins: [react(), tailwindcss(), svgr()],
//     server: {
//       proxy: {
//         '/api': {
//           target: `http://${env.VITE_API_BASE_URL}:${env.VITE_API_BASE_PORT}`,
//           changeOrigin: true,
//         },
//       },
//     },
//   };
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
});