import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400 700"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      formats: ["woff2"],
    },
  ],
  vite: {
    optimizeDeps: {
      // Islands load dynamically. Prebundle both Drawably entry points before
      // the first request so late optimization cannot invalidate the dialog.
      include: ["drawably", "drawably/react"],
    },
  },
});
