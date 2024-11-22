import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {
  Account,
  JwtLoginInformation,
  User,
} from '../../../../service/api/types/graphql';
import {api} from '../api/authenticationApi.generated';
import {onAuthenticateSuccess} from './onAuthenticateSuccess';
import {onGetCurrentUserSuccess} from './onGetCurrentUserSuccess';
import {onLogout} from './onLogout';

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
      onAuthenticateSuccess,
    );
    builder.addMatcher(
      api.endpoints.GetCurrentUser.matchFulfilled,
      onGetCurrentUserSuccess,
    );
    builder.addMatcher(api.endpoints.Authenticate.matchRejected, onLogout);
    builder.addMatcher(api.endpoints.Logout.matchFulfilled, onLogout);
  },
});

export const {setLoginInformation} = authenticationSlice.actions;
