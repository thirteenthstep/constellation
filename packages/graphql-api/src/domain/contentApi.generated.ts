/* eslint-disable */
import * as Types from '../types/graphql';

import { api } from '../client/baseApi';
export type AdminQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AdminQuery = { __typename?: 'Query', Admin: { __typename?: 'AdminQueryType', Tree: { __typename?: 'TreeAdminSchema', GetContentNodes: { __typename?: 'TreeNodesConnection', edges?: Array<{ __typename?: 'TreeNodesEdge', node: { __typename?: 'TreeNode', structureDefinition: { __typename?: 'ChildStructureDefinition', title: string } | { __typename?: 'RootStructureDefinition', title: string } } } | null> | null } } } };


export const AdminDocument = `
    query Admin {
  Admin {
    Tree {
      GetContentNodes(first: 10) {
        edges {
          node {
            structureDefinition {
              title
            }
          }
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    Admin: build.query<AdminQuery, AdminQueryVariables | void>({
      query: (variables) => ({ document: AdminDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAdminQuery, useLazyAdminQuery } = injectedRtkApi;

