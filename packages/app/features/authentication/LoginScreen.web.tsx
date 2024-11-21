import React from 'react';
import {View} from 'tamagui';

import {Login} from './components/Login';


export const LoginScreen = () => {
  return (
    <View flex={1} flexDirection={'row'} justifyContent={'center'}>
      <Login />
    </View>
  );
};
