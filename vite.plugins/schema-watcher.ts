import { spawn } from "node:child_process";
import path from "node:path";
import type { Plugin } from "vite";

export default function schemaWatcherPlugin(): Plugin {
	return {
		name: "custom-watcher-plugin",
		handleHotUpdate({ file }) {
			const normalizedPath = file.replace(/\\/g, "/"); // Windows対策でパスを正規化

			if (
				normalizedPath.startsWith(
					path.resolve("app/graphql").replace(/\\/g, "/"),
				)
			) {
				console.log(
					`📄 Detected change in ${normalizedPath}, running script...`,
				);

				const child = spawn("npm", ["run", "codegen"], { stdio: "inherit" });

				child.on("close", (code) => {
					console.log(`✅ Script exited with code ${code}`);
				});
			}
		},
	};
}
