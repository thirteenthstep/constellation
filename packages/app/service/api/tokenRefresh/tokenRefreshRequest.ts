import {baseQuery} from '../query/baseQuery';

export const tokenRefreshRequest = ({
  accountId,
  refreshToken,
  api,
  extraOptions,
}: {
  accountId: string;
  refreshToken: string;
  api: any;
  extraOptions: any;
}) =>
  baseQuery(
    {
      url: '/refresh-token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({accountId, refreshToken}),
    },
    api,
    extraOptions,
  );
