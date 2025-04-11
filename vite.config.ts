
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Define plugins array
const plugins = [react()];

// Try to import lovable-tagger, but don't fail if it's not available
try {
  const { lovableTagger } = require("lovable-tagger");
  plugins.push(lovableTagger());
} catch (error) {
  console.warn("lovable-tagger not available, skipping");
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
