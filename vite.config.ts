import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	resolve: {
		alias: {
			"@": "/lib",
		},
	},
	build: {
		lib: {
			entry: "./lib/index.ts",
			name: "index",
			formats: ["es", "cjs"],
			fileName: "index",
		},
	},
	plugins: [dts({ rollupTypes: true })],
});
