import {PayloadAction} from '@reduxjs/toolkit';

import {GetCurrentUserQuery} from '../api/authenticationApi.generated';
import {type AuthenticationState} from './authenticationSlice';

export const onGetCurrentUserSuccess = (
  state: AuthenticationState,
  action: PayloadAction<GetCurrentUserQuery>,
) => {
  state.currentUser = {
    ...state.currentUser,
    user: {
      name: action.payload.Viewer.Auth.currentUser?.user?.name,
      email: action.payload.Viewer.Auth.currentUser?.user?.email,
      ...state.currentUser?.user,
    },
  };
};
