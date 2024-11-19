import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Text, View} from 'react-native';

import {useAdminQuery} from '../../graphql/domain/contentApi.generated.ts';

export const ContentScreen = () => {
  const {data} = useAdminQuery();

  if (!data) {
    return null;
  }

  return (
    <View style={{width: 1000, height: 1000, backgroundColor: 'red'}}>
      <FlashList
        data={data.Admin.Tree.GetContentNodes.edges}
        renderItem={({item}) => (
          <View style={{height: 100, backgroundColor: '#aaa', margin: 10}}>
            <Text>{item?.node.structureDefinition.title}</Text>
          </View>
        )}
      />
    </View>
  );
};
