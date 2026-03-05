import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "rubick",
      formats: ["es", "cjs"],
      fileName: (format) => `rubick.${format === "es" ? "es.js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["@rubick/core"],
    },
  },
});
