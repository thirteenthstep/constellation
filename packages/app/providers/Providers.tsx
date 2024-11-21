import {
  StaticParamList,
  createStaticNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TamaguiProvider, createTamagui} from '@tamagui/core';
import React, {FC, PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {LoginScreen} from '../features/authentication/LoginScreen';
import {store, useAppSelector} from '../store/store.ts';
import appConfig from '../tamagui.config.ts';
import {ContentScreen} from '../features/content/ContentScreen.tsx';
import {ContentHeaderButtons} from '../features/content/ContentHeaderButtons.tsx';
import {ProfileScreen} from '../features/profile/ProfileScreen';


const persistor = persistStore(store);

const useIsSignedIn = () => {
  return !!useAppSelector(state => state.authentication.login);
};
const useIsSignedOut = () => {
  return !useAppSelector(state => state.authentication.login);
};

const RootStack = createNativeStackNavigator({
  groups: {
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        Login: {
          screen: LoginScreen,
          options: {
            headerShown: false
          }
        },
      },
    },
      SignedIn: {
        if: useIsSignedIn,
        screens: {
          Content: {
            screen: ContentScreen,
            options: {
              title: 'Content',
              headerRight: ContentHeaderButtons,
            },
          },
          Profile: {
            screen: ProfileScreen,
          },
        },
      },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

const tamaguiConfig = createTamagui(appConfig);

export const Providers: FC<PropsWithChildren> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TamaguiProvider config={tamaguiConfig}>
          <Navigation />
        </TamaguiProvider>
      </PersistGate>
    </Provider>
  );
};
