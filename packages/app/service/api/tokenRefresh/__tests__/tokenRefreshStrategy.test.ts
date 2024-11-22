import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {createAction} from '@reduxjs/toolkit';
import {Mutex} from 'async-mutex';
import {legacy_configureStore} from 'redux-mock-store';

import {JwtLoginInformation} from '../../types/graphql';
import {maybeRefreshAccessToken} from '../tokenRefreshStrategy';


const mockStore = legacy_configureStore();

describe('maybeRefreshAccessToken', () => {
  let store: any;

  const api = {
    getState: jest.fn(),
    dispatch: jest.fn(),
  };

  const extraOptions = {};
  const retryQuery = jest.fn();
  const tokenRefresh = jest.fn();
  const mutex = new Mutex();

  beforeEach(() => {
    store = mockStore({
      authentication: {
        login: {refreshToken: 'dummy-refresh-token'},
        currentUser: {account: {id: 'dummy-account-id'}},
      },
    });
    api.getState.mockImplementation(() => store.getState());
    api.dispatch.mockImplementation(store.dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the original result if the status is not 401', async () => {
    const result = {meta: {response: {status: 200}}};
    const response = await maybeRefreshAccessToken(
      result,
      api,
      extraOptions,
      tokenRefresh,
      retryQuery,
      mutex,
    );
    expect(response).toBe(result);
  });

  it('should return the original result if no refreshToken is found', async () => {
    store = mockStore({authentication: {login: null}});
    api.getState.mockImplementation(() => store.getState());

    const result = {meta: {response: {status: 401}}};
    const response = await maybeRefreshAccessToken(
      result,
      api,
      extraOptions,
      tokenRefresh,
      retryQuery,
      mutex,
    );
    expect(response).toBe(result);
  });

  it('should refresh token and retry query on 401 status', async () => {
    const result = {meta: {response: {status: 401}}};
    tokenRefresh.mockResolvedValue({data: {token: 'new-token'}} as never);
    retryQuery.mockResolvedValue('retry-result' as never);

    const response = await maybeRefreshAccessToken(
      result,
      api,
      extraOptions,
      tokenRefresh,
      retryQuery,
      mutex,
    );

    expect(response).toBe('retry-result');
    expect(tokenRefresh).toHaveBeenCalledWith({
      accountId: 'dummy-account-id',
      refreshToken: 'dummy-refresh-token',
      api,
      extraOptions,
    });
    expect(api.dispatch).toHaveBeenCalledWith(
      createAction<JwtLoginInformation>('authentication/setLoginInformation')({
        token: 'new-token',
      } as never),
    );
  });

  it('should clear token information if refresh fails', async () => {
    const result = {meta: {response: {status: 401}}};
    tokenRefresh.mockResolvedValue({} as never);

    await maybeRefreshAccessToken(
      result,
      api,
      extraOptions,
      tokenRefresh,
      retryQuery,
      mutex,
    );

    expect(api.dispatch).toHaveBeenCalledWith(
      createAction<undefined>('authentication/setLoginInformation')(),
    );
  });

  it('should wait for mutex to unlock and retry query', async () => {
    const result = {meta: {response: {status: 401}}};

    mutex.acquire().then(release => setTimeout(release, 100));

    const retryQueryMock = jest.fn().mockResolvedValue('retry-result' as never);
    const response = await maybeRefreshAccessToken(
      result,
      api,
      extraOptions,
      tokenRefresh,
      retryQueryMock,
      mutex,
    );

    expect(response).toBe('retry-result');
  });
});
