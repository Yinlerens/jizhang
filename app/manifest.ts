import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AnimationFrame",
    short_name: "AnimationFrame",
    description: "二次元风格的 AI 对话、图表与记账管理系统",
    start_url: "/",
    display: "standalone",
    background_color: "#fff9ec",
    theme_color: "#ff7aa8",
    icons: [
      {
        src: "/app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
