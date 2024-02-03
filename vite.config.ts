import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import uni from "@dcloudio/vite-plugin-uni";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), VueDevTools()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
