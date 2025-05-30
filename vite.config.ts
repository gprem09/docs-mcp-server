import { defineConfig } from "vitest/config";
import path from 'path';
import packageJson from "./package.json" assert { type: "json" };

export default defineConfig({
  plugins: [
  ],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  resolve: {
    // Keep existing resolve extensions
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  optimizeDeps: {
    force: true
  },
  build: {
    outDir: 'dist', // Output directory
    sourcemap: true, // Generate sourcemaps
    emptyOutDir: true, // Clean the output directory before build (replaces tsup clean:true)
    lib: {
      // Define entry points using path.resolve for robustness
      entry: {
        server: path.resolve(__dirname, 'src/server.ts'),
        cli: path.resolve(__dirname, 'src/cli.ts'),
        web: path.resolve(__dirname, 'src/web.ts'),
      },
      formats: ['es'], // Output ESM format only
      // Output filenames will be based on entry keys (server.js, cli.js, web.js)
      // fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      // Externalize dependencies and node built-ins
      external: [
        /^node:/, // Externalize all node built-ins (e.g., 'node:fs', 'node:path')
        ...Object.keys(packageJson.dependencies || {}),
        // Explicitly externalize potentially problematic packages if needed
        'fingerprint-generator',
        'header-generator',
        'better-sqlite3', // Often needs to be external due to native bindings
        'playwright', // Playwright should definitely be external
        'sqlite-vec', // Likely involves native bindings
      ],
      
      output: {
        // Optional: Configure output further if needed
        // preserveModules: true, // Uncomment if you need to preserve source file structure
        // entryFileNames: '[name].js', // Adjust naming if needed
      },
    },
    // Target Node.js environment based on the version running the build
    target: `node${process.versions.node.split('.')[0]}`,
    ssr: true, // Explicitly mark this as an SSR/Node build
  },
  test: {
    globals: true,
    environment: "node",
    testTimeout: 5000,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
