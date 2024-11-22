import {createAction} from '@reduxjs/toolkit';
import {Mutex} from 'async-mutex';

import {type AuthenticationState} from '../../../features/authentication/service/store/authenticationSlice';
import {JwtLoginInformation} from '../types/graphql';
import {tokenRefreshRequest} from './tokenRefreshRequest';

export const maybeRefreshAccessToken: any = async (
  result: any,
  api: any,
  extraOptions: any,
  tokenRefresh: typeof tokenRefreshRequest,
  retryQuery: () => any,
  mutex: Mutex,
) => {
  if ((result.meta as any)?.response?.status !== 401) {
    // successful request, nothing to do
    return result;
  }
  const getState = api.getState as () => {
    authentication: AuthenticationState;
  };
  if (!getState().authentication.login?.refreshToken) {
    // user did not log in before
    return result;
  }

  console.log('acess token expired - attempt token refresh...');
  if (!mutex.isLocked()) {
    const release = await mutex.acquire();
    try {
      const refreshToken = getState().authentication.login?.refreshToken;
      const accountId = getState().authentication.currentUser?.account?.id;
      if (!accountId || !refreshToken) {
        return result;
      }
      const refreshResult = await tokenRefresh({
        accountId,
        refreshToken,
        api,
        extraOptions,
      });

      if (refreshResult.data) {
        console.log('token refresh successful');

        api.dispatch(
          createAction<JwtLoginInformation>(
            'authentication/setLoginInformation',
          )(refreshResult.data as JwtLoginInformation),
        );

        // Once the tokens are updated, do the failed api call again
        result = await retryQuery();
      } else {
        console.log('token refresh failed');

        api.dispatch(
          createAction<undefined>('authentication/setLoginInformation')(),
        );
      }
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
    result = await retryQuery();
  }
  return result;
};
