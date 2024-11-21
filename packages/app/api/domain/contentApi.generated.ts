/* eslint-disable */
import * as Types from '../types/graphql';

import { api } from '../client/baseApi';
export type FetchContentNodesQueryVariables = Types.Exact<{
  first: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FetchContentNodesQuery = { __typename?: 'Query', Admin: { __typename?: 'AdminQueryType', Tree: { __typename?: 'TreeAdminSchema', GetContentNodes: { __typename?: 'TreeNodesConnection', edges?: Array<{ __typename?: 'TreeNodesEdge', cursor: string, node: { __typename?: 'TreeNode', id: string, description?: string | null, shortDescription?: string | null, structureDefinition: { __typename?: 'ChildStructureDefinition', title: string } | { __typename?: 'RootStructureDefinition', title: string }, image?: { __typename?: 'File', id: string, name: string, url?: string | null, thumbnail?: string | null } | null } } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } } } };


export const FetchContentNodesDocument = `
    query fetchContentNodes($first: Int!, $after: String) {
  Admin {
    Tree {
      GetContentNodes(first: $first, after: $after) {
        edges {
          node {
            id
            structureDefinition {
              title
            }
            description
            shortDescription
            image {
              id
              name
              url
              thumbnail
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchContentNodes: build.query<FetchContentNodesQuery, FetchContentNodesQueryVariables>({
      query: (variables) => ({ document: FetchContentNodesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useFetchContentNodesQuery, useLazyFetchContentNodesQuery } = injectedRtkApi;

