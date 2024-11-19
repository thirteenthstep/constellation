import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {api} from '../../graphql/domain/authenticationApi.generated.ts';
import {
  Account,
  JwtLoginInformation,
  User,
} from '../../graphql/types/graphql.ts';

export type AuthenticationState = {
  login?: JwtLoginInformation;
  currentUser?: {
    user?: Partial<User>;
    account?: Partial<Account>;
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
      },
    );
    builder.addMatcher(
      api.endpoints.GetCurrentUser.matchFulfilled,
      (state, action) => {
        state.currentUser = {
          user: action.payload.Viewer.Auth.currentUser?.user,
          account: action.payload.Viewer.Auth.currentUser?.accounts?.[0],
        };
      },
    );
    builder.addMatcher(api.endpoints.Authenticate.matchRejected, (state, _) => {
      state.login = undefined;
      state.currentUser = undefined;
    });
    builder.addMatcher(
      api.endpoints.GetCurrentUser.matchRejected,
      (state, _) => {
        state.login = undefined;
        state.currentUser = undefined;
      },
    );
  },
});

export const {setLoginInformation} = authenticationSlice.actions;
