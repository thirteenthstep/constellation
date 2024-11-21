import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query';
import {Mutex} from 'async-mutex';
import {GraphQLClient} from 'graphql-request';

import {
  AuthenticationState,
  setLoginInformation,
} from '../../features/authentication/authenticationSlice';
import {JwtLoginInformation} from '../types/graphql';
import {ENDPOINT_URL} from './graphQLEndpoint';


const GRAPHQL_ENDPOINT = `${ENDPOINT_URL}/graphql`;

export const client: any = new GraphQLClient(GRAPHQL_ENDPOINT);

const authBaseQuery = fetchBaseQuery({
  baseUrl: ENDPOINT_URL,
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

  result = await graphqlBaseQuery({document, variables}, api, extraOptions);
  if ((result.meta as any)?.response?.status !== 401) {
    // successful request, nothing to do
    return result;
  }
  const getState = api.getState as () => {
    authentication: AuthenticationState;
  };
  if (!getState().authentication.login?.refreshToken) {
    // user did not log in before
    return result;
  }

  console.log('acess token expired - attempt token refresh...');
  if (!mutex.isLocked()) {
    const release = await mutex.acquire();
    try {
      const refreshToken = getState().authentication.login?.refreshToken;
      const accountId = getState().authentication.currentUser?.account?.id;
      const refreshResult = await authBaseQuery(
        {
          url: '/refresh-token',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({refreshToken, accountId}),
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        console.log('token refresh successful');

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
        console.log('token refresh failed');

        api.dispatch(setLoginInformation(undefined));
      }
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
    result = await graphqlBaseQuery({document, variables}, api, extraOptions);
  }
  return result;
};
export const api = createApi({
  baseQuery: baseQueryWithReauthGraphql,
  endpoints: () => ({}),
});
