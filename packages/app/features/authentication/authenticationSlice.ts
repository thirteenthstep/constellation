import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

import {api} from '../../api/domain/authenticationApi.generated.ts';
import {Account, JwtLoginInformation, User} from '../../api/types/graphql.ts';


export type AuthenticationState = {
  login?: JwtLoginInformation;
  currentUser?: {
    user?: Partial<User>;
    account?: Pick<Account, 'id'>;
    permissions?: string[];
  };
};

const initialState: AuthenticationState = {};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    setLoginInformation: (
      state,
      action: PayloadAction<JwtLoginInformation | undefined>,
    ) => {
      state.login = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.Authenticate.matchFulfilled,
      (state, action) => {
        state.login = action.payload.Auth.loginJwt?.loginResult?.jwtTokens;

        if (state.login?.accessToken) {
          const jwt = jwtDecode<{
            userId: string;
            accountId: string;
            permissionsInAccount: string[];
          }>(state.login?.accessToken);
          state.currentUser = {
            user: {
              id: jwt.userId,
            },
            account: {
              id: jwt.accountId,
            },
            permissions: jwt.permissionsInAccount,
          };
        }
      },
    );
    builder.addMatcher(
      api.endpoints.GetCurrentUser.matchFulfilled,
      (state, action) => {
        state.currentUser = {
          ...state.currentUser,
          user: {
            name: action.payload.Viewer.Auth.currentUser?.user?.name,
            email: action.payload.Viewer.Auth.currentUser?.user?.email,
            ...state.currentUser?.user,
          },
        };
      },
    );
    builder.addMatcher(api.endpoints.Authenticate.matchRejected, (state, _) => {
      state.login = undefined;
      state.currentUser = undefined;
    });
    builder.addMatcher(
      api.endpoints.Logout.matchFulfilled,
      (state, _) => {
        state.login = undefined;
        state.currentUser = undefined;
      },
    );
  },
});

export const {setLoginInformation} = authenticationSlice.actions;
