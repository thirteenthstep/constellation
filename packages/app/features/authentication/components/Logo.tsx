import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {View} from 'tamagui';

export const Logo = () => {
  const dimensions = useWindowDimensions();

  return (
    <View aspectRatio={448 / 128} maxWidth={dimensions.width / 2}>
      <SvgUri uri="https://constellation.academy/wp-content/uploads/2023/10/constellation-academy-logo.svg" />
    </View>
  );
};
