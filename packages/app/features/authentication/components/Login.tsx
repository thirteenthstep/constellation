import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Input, Text, YStack} from 'tamagui';
import {z} from 'zod';

import {
  AuthenticateMutationVariables,
  useAuthenticateMutation,
  useLazyGetCurrentUserQuery,
} from '../../../api/domain/authenticationApi.generated';
import {Logo} from './Logo';


const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const Login = () => {
  const [mutate] = useAuthenticateMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  const authenticate = (credentials: AuthenticateMutationVariables) => {
    mutate(credentials).then(() => getCurrentUser());
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<AuthenticateMutationVariables>({
    resolver: zodResolver(CredentialsSchema),
  });

  return (
    <YStack padding={20} gap={'$4'}>
      <Logo />
      <YStack>
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              backgroundColor={errors.email ? '#ff000022' : undefined}
            />
          )}
        />
        {errors.email && <Text>{errors.email.message}</Text>}
      </YStack>
      <YStack>
        <Controller
          name="password"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Password"
              textContentType={'password'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              backgroundColor={errors.password ? '#ff000022' : undefined}
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text>{errors.password.message}</Text>}
      </YStack>
      <Button onPress={handleSubmit(authenticate)}>Login</Button>
    </YStack>
  );
};
