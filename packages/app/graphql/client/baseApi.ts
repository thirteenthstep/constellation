import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query';
import {Mutex} from 'async-mutex';
import {GraphQLClient} from 'graphql-request';

import {
  AuthenticationState,
  setLoginInformation,
} from '../../features/authentication/authenticationSlice.ts';
import {JwtLoginInformation} from '../types/graphql.ts';


const BASE_URL =
  // @ts-ignore
  import.meta.env.VITE_ENDPOINT_URL ?? '';
const GRAPHQL_ENDPOINT = `${BASE_URL}/graphql`;

export const client: any = new GraphQLClient(GRAPHQL_ENDPOINT);

const authBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const graphqlBaseQuery = graphqlRequestBaseQuery({
  client,
  prepareHeaders: (headers, {getState}) => {
    const state = getState() as {authentication: AuthenticationState};
    const token = state.authentication.login?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const mutex = new Mutex();

export const baseQueryWithReauthGraphql: any = async (
  {document, variables}: any,
  api: any,
  extraOptions: any,
) => {
  await mutex.waitForUnlock();
  let result;
  try {
    result = await graphqlBaseQuery({document, variables}, api, extraOptions);
    return result;
  } catch (e: any) {
    // Intercept HTTP 401 responses and do the refresh token call
    if (e && e.response && e.response.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const getState = api.getState as () => {
            authentication: AuthenticationState;
          };
          const refreshToken = getState().authentication.login?.refreshToken;
          const accountId = getState().authentication.currentUser?.account?.id;
          const refreshResult = await authBaseQuery(
            {
              url: '/refresh-token',
              method: 'POST',
              body: JSON.stringify({refreshToken, accountId}),
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            api.dispatch(
              setLoginInformation(refreshResult.data as JwtLoginInformation),
            );

            // Once the tokens are updated, do the failed api call again
            result = await graphqlBaseQuery(
              {document, variables},
              api,
              extraOptions,
            );
          } else {
            api.dispatch(setLoginInformation(undefined));
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await graphqlBaseQuery(
          {document, variables},
          api,
          extraOptions,
        );
      }
      return result;
    }
  }
};
export const api = createApi({
  baseQuery: baseQueryWithReauthGraphql,
  endpoints: () => ({}),
});
