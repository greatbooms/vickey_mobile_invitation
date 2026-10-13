import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  let origin = "";
  if (env.VITE_SITE_URL) {
    const url = new URL(env.VITE_SITE_URL);
    if (url.protocol !== "https:" && url.protocol !== "http:")
      throw new Error("VITE_SITE_URL must be an HTTP(S) origin");
    origin = url.origin;
  }
  return {
    server: { proxy: { "/api/weather": "http://127.0.0.1:4173" } },
    plugins: [
      react(),
      {
        name: "invitation-share-metadata",
        transformIndexHtml() {
          return origin
            ? [
                {
                  tag: "meta",
                  attrs: { property: "og:url", content: origin + "/" },
                  injectTo: "head" as const,
                },
                {
                  tag: "meta",
                  attrs: {
                    property: "og:image",
                    content: origin + "/images/pink/couple.jpg",
                  },
                  injectTo: "head" as const,
                },
              ]
            : [];
        },
      },
    ],
  };
});
