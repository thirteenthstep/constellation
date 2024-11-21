import {LogOut} from '@tamagui/lucide-icons';
import React, {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import {Button, Spinner, XStack} from 'tamagui';

import {useLogoutMutation} from '../../../api/domain/authenticationApi.generated';


export const Logout: FC = () => {
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
