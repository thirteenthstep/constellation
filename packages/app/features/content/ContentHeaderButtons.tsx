import {useNavigation} from '@react-navigation/native';
import {CircleUser, LogOut} from '@tamagui/lucide-icons';
import React, {FC} from 'react';
import {Button, XStack} from 'tamagui';

import {useLogoutMutation} from '../../api/domain/authenticationApi.generated.ts';


export const ContentHeaderButtons: FC = () => {
  const navigation = useNavigation();
  const [logout] = useLogoutMutation();

  return (
    <XStack>
      <Button
        backgroundColor={'transparent'}
        icon={<CircleUser size={24} />}
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        backgroundColor={'transparent'}
        icon={<LogOut size={24} />}
        onPress={() => logout()}
      />
    </XStack>
  );
};
