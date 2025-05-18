import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { printSchemaWithDirectives } from "@graphql-tools/utils";
import type { Plugin } from "vite";
import { schema } from "../app/graphql/schema";

export default function schemaWatcherPlugin(): Plugin {
	// クラス内変数としてメソッドを定義
	const generateSchemaFile = async () => {
		const output = await printSchemaWithDirectives(schema);
		const outputPath = path.resolve("app/__generated__/schema.graphql");
		writeFileSync(outputPath, output);
		console.log(`✅ GraphQL schema written to ${outputPath}`);
	};

	const runCodegen = (): Promise<void> => {
		return new Promise((resolve, reject) => {
			const child = spawn("npm", ["run", "codegen"], {
				stdio: "inherit",
				shell: true,
			});

			child.on("close", (code) => {
				if (code === 0) {
					console.log("✅ Codegen completed successfully");
					resolve();
				} else {
					console.error(`❌ Codegen failed with exit code ${code}`);
					reject(new Error(`Codegen exited with code ${code}`));
				}
			});

			child.on("error", (err) => {
				console.error("❌ Failed to start codegen process:", err);
				reject(err);
			});
		});
	};

	return {
		name: "schema-watcher-plugin",
		async buildStart() {
			try {
				await generateSchemaFile();
				await runCodegen();
			} catch (error) {
				console.error("❌ Error during initial schema generation:", error);
			}
		},
		async handleHotUpdate(ctx) {
			const normalizedPath = ctx.file.replace(/\\/g, "/");
			const graphqlDir = path.resolve("app/graphql").replace(/\\/g, "/");

			if (normalizedPath.startsWith(graphqlDir)) {
				console.log(
					`📄 Detected change in ${normalizedPath}, regenerating schema...`,
				);
				try {
					await generateSchemaFile();
					await runCodegen();
				} catch (error) {
					console.error("❌ Error during hot update:", error);
				}
				return []; // 空配列を返すことでViteのデフォルト処理をスキップ
			}
		},
	};
}
