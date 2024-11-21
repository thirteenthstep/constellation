import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'tamagui';

import {Profile} from './Profile';


export const ProfileScreen: FC = () => {
  return (
    <ScrollView>
      <SafeAreaView edges={['right', 'bottom', 'left']}>
        <Profile />
      </SafeAreaView>
    </ScrollView>
  );
};
