import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {ENDPOINT_URL} from '../../../environment';

export const createBaseQuery = (endpointUrl?: string) =>
  fetchBaseQuery({
    baseUrl: endpointUrl,
  });

export const baseQuery = createBaseQuery(ENDPOINT_URL);
