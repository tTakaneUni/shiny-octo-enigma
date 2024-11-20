import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";
import * as path from "path";

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
  plugins: [react(), yextSSG()],
  build: {
    assetsInlineLimit: 0, // TODO: Remove this if we ever upgrade to a Vite version that includes this fix: https://github.com/vitejs/vite/pull/14958
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom"],
          yext: ["@yext/pages", "@yext/schema-wrapper", "@yext/types"],
          yextSearch: ["@yext/search-headless-react", "@yext/search-ui-react"],
        },
      },
    },
  },
  ssr: {
    noExternal: ["@yext/search-headless-react", "@yext/search-ui-react"],
  },
});
