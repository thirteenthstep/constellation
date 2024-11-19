import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/schema.graphql',
  documents: ['./**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './graphql/types/graphql.ts': {
      plugins: ['typescript'],
    },
    src: {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '../graphql/types/graphql.ts',
      },
      plugins: [
        'typescript-operations',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        {
          'typescript-rtk-query': {
            importBaseApiFrom: '../client/baseApi',
            exportHooks: true,
          },
        },
      ],
    },
  },
};

export default config;
