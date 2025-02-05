import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        auctions: resolve(__dirname, "pages/auctions.html"),
        login: resolve(__dirname, "pages/login.html"),
        register: resolve(__dirname, "pages/register.html"),
        profile: resolve(__dirname, "pages/profile.html"),
        "specific-auction": resolve(__dirname, "pages/specific-auction.html"),
      },
    },
  },
});
