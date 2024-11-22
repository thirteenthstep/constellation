import React, {FC} from 'react';
import {FlatList} from 'react-native';

import {TreeNodesEdge} from '../../../service/api/types/graphql';
import {ContentItem} from './ContentItem.tsx';

export const ContentList: FC<{
  items: TreeNodesEdge[];
  fetchMore: () => void;
  refresh?: () => void;
}> = ({items, fetchMore}) => {
  return (
    <FlatList
      data={items}
      onEndReached={fetchMore}
      renderItem={({item}) => <ContentItem key={item.node.id} item={item} />}
    />
  );
};
