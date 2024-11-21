import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'tamagui';

import {Login} from './components/Login';


export const LoginScreen = () => {
  const safeArea = useSafeAreaInsets();

  return (
    <View
      flex={1}
      backgroundColor={'white'}
      paddingTop={safeArea.top}
      paddingLeft={safeArea.left}
      paddingRight={safeArea.right}>
      <Login />
    </View>
  );
};
