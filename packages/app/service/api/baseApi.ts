import {createApi} from '@reduxjs/toolkit/query/react';

import {tokenRefreshBaseQuery} from './query/tokenRefreshBaseQuery';

export const api = createApi({
  baseQuery: tokenRefreshBaseQuery,
  endpoints: () => ({}),
});
