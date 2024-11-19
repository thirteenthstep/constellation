import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {decode} from 'jwt-js-decode';

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
          const jwt = decode(state.login?.accessToken);
          state.currentUser = {
            user: {
              id: jwt.payload.userId,
            },
            account: {
              id: jwt.payload.accountId,
            },
            permissions: jwt.payload.permissionsInAccount,
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
      api.endpoints.GetCurrentUser.matchRejected,
      (state, _) => {
        state.login = undefined;
        state.currentUser = undefined;
      },
    );
  },
});

export const {setLoginInformation} = authenticationSlice.actions;
