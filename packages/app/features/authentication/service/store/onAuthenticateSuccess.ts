import {PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

import {AuthenticateMutation} from '../api/authenticationApi.generated';
import {type AuthenticationState} from './authenticationSlice';

export const onAuthenticateSuccess = (
  state: AuthenticationState,
  action: PayloadAction<AuthenticateMutation>,
) => {
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
};
