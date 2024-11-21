/* eslint-disable */
import * as Types from '../types/graphql';

import { api } from '../client/baseApi';
export type AuthenticateMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', Auth: { __typename?: 'AuthMutations', loginJwt?: { __typename?: 'LoginJwtPayload', clientMutationId?: string | null, loginResult: { __typename?: 'LoginResult', jwtTokens: { __typename?: 'JwtLoginInformation', accessToken: string, refreshToken: string } } } | null } };

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', Auth: { __typename?: 'AuthMutations', logoutJwt?: { __typename?: 'LogoutJwtPayload', clientMutationId?: string | null } | null } };

export type GetCurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', Viewer: { __typename?: 'ViewerQueryType', Auth: { __typename?: 'AuthViewerSchema', currentUser?: { __typename?: 'CurrentUser', user: { __typename?: 'User', name: string, email: string } } | null } } };


export const AuthenticateDocument = `
    mutation Authenticate($email: String!, $password: String!) {
  Auth {
    loginJwt(input: {email: $email, password: $password}) {
      clientMutationId
      loginResult {
        jwtTokens {
          accessToken
          refreshToken
        }
      }
    }
  }
}
    `;
export const LogoutDocument = `
    mutation Logout {
  Auth {
    logoutJwt(input: {clientMutationId: null}) {
      clientMutationId
    }
  }
}
    `;
export const GetCurrentUserDocument = `
    query GetCurrentUser {
  Viewer {
    Auth {
      currentUser {
        user {
          name
          email
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    Authenticate: build.mutation<AuthenticateMutation, AuthenticateMutationVariables>({
      query: (variables) => ({ document: AuthenticateDocument, variables })
    }),
    Logout: build.mutation<LogoutMutation, LogoutMutationVariables | void>({
      query: (variables) => ({ document: LogoutDocument, variables })
    }),
    GetCurrentUser: build.query<GetCurrentUserQuery, GetCurrentUserQueryVariables | void>({
      query: (variables) => ({ document: GetCurrentUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAuthenticateMutation, useLogoutMutation, useGetCurrentUserQuery, useLazyGetCurrentUserQuery } = injectedRtkApi;

