import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './app/graphql/schema';

const config: CodegenConfig = {
  schema: printSchema(schema),
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