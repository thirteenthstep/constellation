import {
  StaticParamList,
  createStaticNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {LoginScreen} from '../features/authentication/LoginScreen';
import {ContentScreen} from '../features/content/ContentScreen';
import {
  LogoutButton,
  ProfileButton,
} from '../features/content/components/ContentHeaderButtons';
import {ProfileScreen} from '../features/profile/ProfileScreen';
import {useAppSelector} from '../service/store/store';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends SignedInStackParamList {}
  }
}

const SignedOutStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

const SignedInStack = createNativeStackNavigator({
  screens: {
    Content: {
      screen: ContentScreen,
      options: {
        title: 'Content',
        headerLeft: ProfileButton,
        headerRight: LogoutButton,
      },
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

export type SignedInStackParamList = StaticParamList<typeof SignedInStack>;

// creating seperate stacks should be unnecessary since there are conditional screen groups in react navigation 7.x
// unfortunately the recommended approach is quite buggy atm (https://github.com/react-navigation/react-navigation/issues/12283)
const SignedOutNavigation = createStaticNavigation(SignedOutStack);
const SignedInNavigation = createStaticNavigation(SignedInStack);

export const Navigation = () => {
  const isLoggedIn = useAppSelector(state => state.authentication.login);

  return isLoggedIn ? <SignedInNavigation /> : <SignedOutNavigation />;
};
