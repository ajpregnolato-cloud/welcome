import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { mochaPlugins, type MochaEnv } from "@getmocha/vite-plugins";

const mochaEnv: MochaEnv = {
  APP_ID: process.env.APP_ID,
  APP_URL: process.env.APP_URL,
  ORIGIN: process.env.ORIGIN,
  SHOW_WATERMARK: process.env.SHOW_WATERMARK,
  NODE_ENV: process.env.NODE_ENV,
  PLUGINS: process.env.PLUGINS,
  DEBUG_LOGS: process.env.DEBUG_LOGS,
  ANALYTICS_SCRIPT_ATTRS: process.env.ANALYTICS_SCRIPT_ATTRS,
};

const auxiliaryWorkerConfigPath = "/mocha/emails-service/wrangler.json";
const hasAuxiliaryWorkerConfig = fs.existsSync(auxiliaryWorkerConfigPath);

export default defineConfig({
  plugins: [
    ...mochaPlugins(mochaEnv),
    react(),
    cloudflare({
      auxiliaryWorkers: hasAuxiliaryWorkerConfig
        ? [{ configPath: auxiliaryWorkerConfigPath }]
        : [],
    }),
  ],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
