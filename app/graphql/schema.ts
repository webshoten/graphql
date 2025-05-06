import SchemaBuilder from '@pothos/core';

const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    greet: t.string({
      // 引数の定義
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: (_, args) => `Hello, ${args.name}!`,
    }),
  }),
});

export const schema = builder.toSchema();