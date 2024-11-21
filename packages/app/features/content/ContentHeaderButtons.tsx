import {useNavigation} from '@react-navigation/native';
import {CircleUser, LogOut} from '@tamagui/lucide-icons';
import React, {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import {Button, Spinner, XStack} from 'tamagui';

import {useLogoutMutation} from '../../api/domain/authenticationApi.generated.ts';


export const ProfileButton: FC = () => {
  const navigation = useNavigation();

  return (
    <Button
      backgroundColor={'transparent'}
      icon={<CircleUser size={24} />}
      onPress={() => navigation.navigate('Profile')}
    />
  );
};

export const LogoutButton: FC = () => {
  const [logout, {isLoading, error}] = useLogoutMutation();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message);
    }
  }, [error]);

  return (
    <XStack>
      <Button
        backgroundColor={'transparent'}
        icon={isLoading ? <Spinner /> : <LogOut size={24} />}
        onPress={() => logout()}
        disabled={isLoading}
      />
    </XStack>
  );
};
