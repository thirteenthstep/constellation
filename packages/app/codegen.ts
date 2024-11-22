import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './service/api/schema.graphql',
  documents: ['./**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './service/api/types/graphql.d.ts': {
      plugins: [
        'typescript',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
      ],
    },
    src: {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '../service/api/types/graphql.d.ts',
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
            importBaseApiFrom: '../../../../service/api/baseApi',
            exportHooks: true,
          },
        },
      ],
    },
  },
};

export default config;
