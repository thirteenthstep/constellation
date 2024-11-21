import React, {FC} from 'react';
import {FlatList} from 'react-native';

import {TreeNodesEdge} from '../../api/types/graphql.ts';
import {ContentItem} from './ContentItem.tsx';


export const ContentList: FC<{
  items: TreeNodesEdge[];
  fetchMore: () => {};
  refresh: () => void;
}> = ({items, fetchMore}) => {
  return (
    <FlatList
      data={items}
      onEndReached={fetchMore}
      renderItem={({item}) => <ContentItem item={item} />}
    />
  );
};
