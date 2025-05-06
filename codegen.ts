import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    ["./app/graphql/schema.ts"]: {
      loader: "graphql-tag/loader"
    }
  },
  documents: './app/**/*.{ts,tsx}',
  generates: {
    './app/__generated__/gql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-urql',
      ],
    },
  },
};

export default config;