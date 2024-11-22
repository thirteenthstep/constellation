import {Mutex} from 'async-mutex';

import {tokenRefreshRequest} from '../tokenRefresh/tokenRefreshRequest';
import {maybeRefreshAccessToken} from '../tokenRefresh/tokenRefreshStrategy';
import {authenticationAwareBaseQuery} from './authenticationAwareBaseQuery';

const mutex = new Mutex();
export const createTokenRefreshBaseQuery =
  (
    baseQuery: typeof authenticationAwareBaseQuery,
    tokenRefreshStrategy: typeof maybeRefreshAccessToken,
    tokenRefresh: typeof tokenRefreshRequest,
  ) =>
  async ({document, variables}: any, api: any, extraOptions: any) => {
    await mutex.waitForUnlock();
    const result = await baseQuery({document, variables}, api, extraOptions);

    const retryQuery = () =>
      baseQuery(
        {
          document,
          variables,
        },
        api,
        extraOptions,
      );

    return tokenRefreshStrategy(
      result,
      api,
      extraOptions,
      tokenRefresh,
      retryQuery,
      mutex,
    );
  };

export const tokenRefreshBaseQuery = createTokenRefreshBaseQuery(
  authenticationAwareBaseQuery,
  maybeRefreshAccessToken,
  tokenRefreshRequest,
);
