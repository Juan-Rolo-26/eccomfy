import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";
import JSDOMRenderer from "@prerenderer/renderer-jsdom";

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/servicios',
        '/servicios/meta-ads',
        '/servicios/seo',
        '/servicios/desarrollo-web',
        '/nosotros',
        '/contacto',
        '/casos-de-exito',
        '/blog',
        '/blog/que-es-un-ecosistema-digital',
        '/blog/como-vender-infoproductos-online-argentina',
        '/blog/agencia-de-marketing-digital-cordoba',
        '/blog/meta-ads-para-coaches-y-mentores',
        '/blog/como-posicionar-marca-personal-en-google',
        '/blog/marketing-para-infoproductores-latam',
        '/blog/diferencia-agencia-freelancer-marketing',
        '/blog/como-generar-leads-calificados-para-servicios',
      ],
      renderer: new JSDOMRenderer({
        renderAfterTime: 3000,
      }),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  server: {
    port: 5173,
  },
});
