import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './api/schema.graphql',
  documents: ['./**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './api/types/graphql.ts': {
      plugins: ['typescript'],
    },
    src: {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '../api/types/graphql.ts',
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
