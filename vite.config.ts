import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import uni from "@dcloudio/vite-plugin-uni";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from "weapp-tailwindcss/vite";
import { UnifiedViteWeappTailwindcssPlugin } from "weapp-tailwindcss/vite";
UnifiedViteWeappTailwindcssPlugin({
  rem2rpx: true,
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), uvwt(), VueDevTools()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
