import {decode} from 'html-entities';
import React, {FC} from 'react';
import {useWindowDimensions} from 'react-native';
import RenderHtml, {
  CSSLongNativeTranslatableTextPropKey,
} from 'react-native-render-html';


const TAGS_STYLES = {body: {color: 'white'}};
const IGNORED_STYLES: CSSLongNativeTranslatableTextPropKey[] = ['color'];

export const ContentDescription: FC<{description: string}> = ({
  description,
}) => {
  const {width} = useWindowDimensions();

  return (
    <RenderHtml
      tagsStyles={TAGS_STYLES}
      ignoredStyles={IGNORED_STYLES}
      contentWidth={width}
      source={{html: decode(description)}}
    />
  );
};
