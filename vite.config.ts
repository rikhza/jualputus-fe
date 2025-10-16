import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		exclude: ["lucide-react"],
		include: ["react", "react-dom"],
	},
	build: {
		// Disable source maps in production for smaller bundle
		sourcemap: false,
		// Reduce chunk size
		target: "esnext",
		// Optimize chunks
		rollupOptions: {
			output: {
				// Advanced code splitting
				manualChunks: (id) => {
					// Vendor chunks
					if (id.includes("node_modules")) {
						if (id.includes("react") || id.includes("react-dom")) {
							return "react-vendor";
						}
						if (id.includes("lucide-react")) {
							return "lucide";
						}
						if (id.includes("@react-google-maps")) {
							return "maps";
						}
						// Other vendor packages
						return "vendor";
					}
					// Component chunks
					if (id.includes("src/components/form/")) {
						return "form-components";
					}
					if (id.includes("src/components/ui/")) {
						return "ui-components";
					}
				},
				// Asset file names
				assetFileNames: (assetInfo) => {
					const info = assetInfo.name?.split(".");
					const ext = info?.[info.length - 1];
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || "")) {
						return `assets/images/[name]-[hash][extname]`;
					} else if (/woff|woff2/.test(ext || "")) {
						return `assets/fonts/[name]-[hash][extname]`;
					}
					return `assets/[name]-[hash][extname]`;
				},
				// Entry and chunk file names
				chunkFileNames: "assets/js/[name]-[hash].js",
				entryFileNames: "assets/js/[name]-[hash].js",
			},
		},
		// Increase chunk size warning limit
		chunkSizeWarningLimit: 1000,
		// Enable minification with esbuild (faster, built-in)
		minify: "esbuild",
		// CSS code splitting
		cssCodeSplit: true,
		// Report compressed size
		reportCompressedSize: true,
		// CSS minification (default esbuild is fast enough)
		cssMinify: true,
	},
	server: {
		// Enable HMR
		hmr: {
			overlay: true,
		},
		// Set port from env or default
		port: (process.env.PORT as unknown as number) || 3000,
		// Open browser on server start
		open: false,
	},
	preview: {
		port: 4173,
	},
	// Esbuild options for faster builds
	esbuild: {
		logOverride: { "this-is-undefined-in-esm": "silent" },
		// Drop console in production
		drop:
			process.env.NODE_ENV === "production"
				? ["console", "debugger"]
				: [],
	},
	// Performance optimizations
	define: {
		__DEV__: process.env.NODE_ENV !== "production",
	},
});
