import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "./app/__generated__/schema.graphql",
	generates: {
		"./app/__generated__/types.ts": {
			plugins: ["typescript"],
		},
	},
	watch: false,
};

export default config;
