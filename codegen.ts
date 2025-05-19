import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "./app/__generated__/schema.graphql",
	documents: ["./app/**/*.{ts,tsx}"], // ← ここで自動抽出される
	generates: {
		"./app/__generated__/types.ts": {
			plugins: ["typescript", "typescript-operations", "typescript-urql"],
			config: {
				withHooks: true,
				gqlTagName: "graphql", // <-- graphqlタグを使ってる場合に必須
			},
		},
	},
};

export default config;
