import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import compress from "astro-compress";
import vercelStatic from "@astrojs/vercel/static";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import partytown from "@astrojs/partytown";
import critters from "astro-critters";
import serviceWorker from "astrojs-service-worker";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  site: "https://darleyconstrucoes.com",
  integrations: [
    tailwind(),
    solidJs(),
    compress(),
    sitemap(),
    robotsTxt(),
    webmanifest({
      /**
       * required
       **/
      name: "Darley Construções",
      /**
       * optional
       **/
      icon: "src/assets/LogoMarca_verdebranco.svg",
      // source for favicon & icons

      short_name: "Darley Construções",
      description:
        "A Darley Construções é uma empresa da área de construção cível que atua em Uberlândia e região. Trabalhamos com construções e reformas industriais, comerciais e industriais.",
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#008000",
      display: "standalone",
      orientation: "portrait",
    }),
    partytown({
      config: {
        forward: ["dataLayer.push","gtag"],
      },
    }),
    critters(),
    serviceWorker(),
  ],
  output: "static",
  adapter: vercelStatic({
    analytics: true,
    imageService: true,
    imagesConfig: {
      sizes: [320, 640, 960, 1200, 1800],
      formats: ["image/avif", "image/webp"],
    },
  }),
});
