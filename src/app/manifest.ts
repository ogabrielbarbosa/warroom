import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Warroom — Command Center",
    short_name: "Warroom",
    description: "Warroom — Command Center",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#FF8400",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    // Web Share Target API — makes the app appear in the OS share sheet
    share_target: {
      action: "/share",
      method: "GET",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },
  } as MetadataRoute.Manifest & { share_target: unknown };
}
