import React, {FC} from 'react';
import {Image, View, ViewProps} from 'tamagui';

export const Logo: FC<ViewProps> = props => {
  return (
    <View aspectRatio={448 / 128} {...props}>
      <Image
        width={'100%'}
        height={'100%'}
        source={{
          uri: 'https://constellation.academy/wp-content/uploads/2023/10/constellation-academy-logo.svg',
        }}
      />
    </View>
  );
};
