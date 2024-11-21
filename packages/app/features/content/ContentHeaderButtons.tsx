import {useNavigation} from '@react-navigation/native';
import {CircleUser} from '@tamagui/lucide-icons';
import React, {FC} from 'react';
import {Button} from 'tamagui';

import {Logout} from '../authentication/components/Logout';


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

export const LogoutButton = Logout;
