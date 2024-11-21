import React, {FC} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {TreeNodesEdge} from '../../api/types/graphql.ts';
import {ContentItem} from './ContentItem.tsx';


export const ContentList: FC<{
  items: TreeNodesEdge[];
  fetchMore: () => {};
  refresh: () => void;
}> = ({items, fetchMore}) => {
  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchMore}
      hasMore={true}
      loader={<h4>Loading...</h4>}>
      {items.map(item => (
        <ContentItem item={item} />
      ))}
    </InfiniteScroll>
  );
};
