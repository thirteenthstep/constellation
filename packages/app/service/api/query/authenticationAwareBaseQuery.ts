import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query';
import {GraphQLClient} from 'graphql-request';

import {type AuthenticationState} from '../../../features/authentication/service/store/authenticationSlice';
import {graphQLClient} from '../client/graphQLClient';

export const createAuthenticationAwareBaseQuery = (client: GraphQLClient) =>
  graphqlRequestBaseQuery({
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

export const authenticationAwareBaseQuery =
  createAuthenticationAwareBaseQuery(graphQLClient);
