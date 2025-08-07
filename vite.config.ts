import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

/** @type {import('vite').UserConfig} */
export default {
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    copyPublicDir: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        auth: resolve(__dirname, "src/auth.html"),
        registration: resolve(__dirname, "src/registration.html"),
        profile: resolve(__dirname, "src/profile.html"),
        messenger: resolve(__dirname, "src/messenger.html"),
        "client-error": resolve(__dirname, "src/client-error.html"),
        "server-error": resolve(__dirname, "src/server-error.html"),
      },
    },
  },
  publicDir: resolve(__dirname, "public"),
  plugins: [handlebars({})],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true,
  },
};
