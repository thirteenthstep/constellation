import { api } from '../client/baseApi';
import { FetchContentNodesDocument, FetchContentNodesQuery, FetchContentNodesQueryVariables } from './contentApi.generated.ts';


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
        if (newItems.Admin.Tree.GetContentNodes.edges) {
          currentCache.Admin.Tree.GetContentNodes.edges?.push(
            ...newItems.Admin.Tree.GetContentNodes.edges,
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
