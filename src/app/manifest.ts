import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GAMYAA",
    short_name: "GAMYAA",
    description: "Aerospace & Defence Engineering Intelligence. Building the Future.",
    start_url: "/",
    display: "browser",
    background_color: "#f6f5f1",
    theme_color: "#01223e",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
