import {api} from '../../../../service/api/baseApi.ts';
import {
  FetchContentNodesDocument,
  FetchContentNodesQuery,
  FetchContentNodesQueryVariables,
} from './contentApi.generated.ts';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    paginateContentNodes: build.query<
      FetchContentNodesQuery,
      FetchContentNodesQueryVariables | void
    >({
      query: variables => ({document: FetchContentNodesDocument, variables}),
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (
          newItems.Admin.Tree.GetContentNodes.edges &&
          newItems.Admin.Tree.GetContentNodes.edges.length > 1
        ) {
          currentCache.Admin.Tree.GetContentNodes.edges?.push(
            ...newItems.Admin.Tree.GetContentNodes.edges.slice(
              1,
              newItems.Admin.Tree.GetContentNodes.edges.length - 1,
            ),
          );
        }
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export {injectedRtkApi as api};
export const {usePaginateContentNodesQuery, useLazyPaginateContentNodesQuery} =
  injectedRtkApi;
