/* eslint-disable */
import * as Types from '../types/graphql';

import { api } from '../client/baseApi';
export type AuthMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type AuthMutation = { __typename?: 'Mutation', Auth: { __typename?: 'AuthMutations', loginJwt?: { __typename?: 'LoginJwtPayload', clientMutationId?: string | null, loginResult: { __typename?: 'LoginResult', jwtTokens: { __typename?: 'JwtLoginInformation', accessToken: string, refreshToken: string } } } | null } };


export const AuthDocument = `
    mutation Auth($email: String!, $password: String!) {
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

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    Auth: build.mutation<AuthMutation, AuthMutationVariables>({
      query: (variables) => ({ document: AuthDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAuthMutation } = injectedRtkApi;

