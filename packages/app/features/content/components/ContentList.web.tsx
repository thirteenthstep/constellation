import React, {FC} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {TreeNodesEdge} from '../../../service/api/types/graphql';
import {ContentItem} from './ContentItem.tsx';

export const ContentList: FC<{
  items: TreeNodesEdge[];
  fetchMore: () => {};
  refresh?: () => void;
}> = ({items, fetchMore}) => {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMore}
      hasMore={true}
      loader={<h4>Loading...</h4>}>
      {items.map(item => (
        <ContentItem key={item.node.id} item={item} />
      ))}
    </InfiniteScroll>
  );
};
