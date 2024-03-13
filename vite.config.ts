import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import uni from "@dcloudio/vite-plugin-uni";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
// import postcssModules from "postcss-modules";
import { UnifiedViteWeappTailwindcssPlugin } from "weapp-tailwindcss/vite";

const isH5 = process.env.UNI_PLATFORM === "h5";
// vue2 版本为 app-plus
const isApp = process.env.UNI_PLATFORM === "app-plus";
const WeappTailwindcssDisabled = isH5 || isApp;
// vue3 版本构建到 app, UNI_PLATFORM 的值为 app

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    UnifiedViteWeappTailwindcssPlugin({
      disabled: WeappTailwindcssDisabled,
      rem2rpx: true,
    }),
    VueDevTools(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),

        // postcssModules({
        // 	generateScopedName: "[name]",
        // }),
      ],
    },
  },
  build: {
    cssCodeSplit: false,
  },
});
