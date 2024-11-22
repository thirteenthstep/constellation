import {UnknownAction} from '@reduxjs/toolkit';

import {AuthenticationState} from './authenticationSlice';

export const onLogout = (state: AuthenticationState, _: UnknownAction) => {
  state.login = undefined;
  state.currentUser = undefined;
};
