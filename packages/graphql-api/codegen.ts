import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/types/graphql.ts': {
      plugins: ['typescript'],
    },
    src: {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'types/graphql.ts',
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
