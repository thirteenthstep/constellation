import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC, PropsWithChildren} from 'react';
import {Provider} from 'react-redux';

import {LoginScreen} from '../features/authentication/LoginScreen.tsx';
import {ContentScreen} from '../features/content/ContentScreen.tsx';
import {store, useAppSelector} from '../store/store.ts';


const useIsSignedIn = () => {
  return !!useAppSelector(state => state.authentication.login);
};
const useIsSignedOut = () => {
  return !useAppSelector(state => state.authentication.login);
};

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      if: useIsSignedOut,
      screen: LoginScreen,
    },
    Content: {
      if: useIsSignedIn,
      screen: ContentScreen,
      options: {
        title: 'Content',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export const Providers: FC<PropsWithChildren> = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
