import {ImageOff, Pin} from '@tamagui/lucide-icons';
import React, {FC} from 'react';
import {Button, Card, H5, Image, View, ZStack} from 'tamagui';

import {TreeNodesEdge} from '../../../service/api/types/graphql';
import {useAppDispatch, useAppSelector} from '../../../service/store/store';
import {togglePinContent} from '../service/store/contentSlice';
import {ContentDescription} from './ContentDescription';


const ASPECT_RATIO = 9 / 5;

export const ContentItem: FC<{item: TreeNodesEdge}> = ({item}) => {
  const isPinned = useAppSelector(
    state => state.content.pinnedContent,
  ).includes(item);
  const dispatch = useAppDispatch();

  return (
    <Card
      key={item.node.id}
      width={'100%'}
      maxWidth={600}
      aspectRatio={ASPECT_RATIO}
      marginBottom={10}>
      <Card.Header>
        <H5 color={'white'}>{item.node.structureDefinition.title}</H5>
      </Card.Header>

      <View zIndex={2} flex={1}>
        <View padding={20}>
          {item.node.shortDescription && (
            <ContentDescription description={item.node.shortDescription} />
          )}
        </View>
      </View>

      <Card.Footer
        justifyContent={'flex-end'}
        paddingBottom={10}
        paddingRight={10}>
        <Button
          zIndex={3}
          size={36}
          icon={<Pin color={isPinned ? 'white' : undefined} />}
          backgroundColor={isPinned ? '#888' : undefined}
          onPress={() => dispatch(togglePinContent(item))}
        />
      </Card.Footer>

      <Card.Background zIndex={1} backgroundColor={'#888'}>
        <ZStack aspectRatio={ASPECT_RATIO}>
          {item.node.image?.url && (
            <Image flex={1} source={{uri: item.node.image.url}} />
          )}
          {!item.node.image?.url && (
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
              <ImageOff size={'$6'} color={'white'} />
            </View>
          )}
          <View flex={1} backgroundColor={'#00000044'} />
        </ZStack>
      </Card.Background>
    </Card>
  );
};
