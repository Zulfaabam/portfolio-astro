import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  vite: {
    optimizeDeps: {
      // Islands load dynamically. Prebundle both Drawably entry points before
      // the first request so late optimization cannot invalidate the dialog.
      include: ["drawably", "drawably/react"],
    },
  },
});
