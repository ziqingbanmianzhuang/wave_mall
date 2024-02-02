import { defineConfig } from "vite";
import VueDevTools from 'vite-plugin-vue-devtools'
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [uni(), VueDevTools()],
});
