import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
    root: resolve(__dirname,'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        copyPublicDir:true,
        emptyOutDir: true,
    },
    publicDir:resolve(__dirname, 'public'),
    plugins: [
        handlebars({})
    ],
}