import React from 'react';
import {Button, Text, View} from 'react-native';

import {
  useAuthenticateMutation,
  useLazyGetCurrentUserQuery,
} from '../../api/domain/authenticationApi.generated.ts';

export const LoginScreen = () => {
  const [authenticate, {data}] = useAuthenticateMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  return (
    <View style={{backgroundColor: 'white'}}>
      <Button
        title={'login'}
        onPress={() =>
          authenticate({
            email: 'editor.staging@example.com',
            password: 'HtxbYgJfB1ysRCEDX6b2',
          }).then(() => getCurrentUser())
        }
      />
    </View>
  );
};
