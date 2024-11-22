import {CircleUser} from '@tamagui/lucide-icons';
import React, {FC, PropsWithChildren} from 'react';
import {H4, Text, View, YStack} from 'tamagui';

import {useAppSelector} from '../../../service/store/store.ts';

export const Profile: FC = () => {
  const currentUser = useAppSelector(state => state.authentication.currentUser);

  return (
    <YStack gap={'$4'} padding={20}>
      <View flex={1} flexDirection={'row'} justifyContent={'center'}>
        <CircleUser size={'$6'} color={'#888'} />
      </View>
      <H4>{currentUser?.user?.name && `Hello ${currentUser.user.name}`}</H4>

      <UserInfoItem label={'UserId'}>{currentUser?.user?.id}</UserInfoItem>
      <UserInfoItem label={'Email'}>{currentUser?.user?.email}</UserInfoItem>
      <UserInfoItem label={'AccountId'}>
        {currentUser?.account?.id}
      </UserInfoItem>
      <UserInfoItem label={'Permissions'}>
        {currentUser?.permissions?.map((p: string) => `${p}\n`)}
      </UserInfoItem>
    </YStack>
  );
};

const UserInfoItem: FC<PropsWithChildren<{label: string}>> = ({
  label,
  children,
}) => {
  return (
    <YStack>
      <Text fontWeight={'600'}>{label}</Text>
      <Text>{children}</Text>
    </YStack>
  );
};
