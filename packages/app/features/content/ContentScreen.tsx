import React, {useState} from 'react';

import {TreeNodesEdge} from '../../service/api/types/graphql';
import {useAppSelector} from '../../service/store/store';
import {ContentList} from './components/ContentList';
import {usePaginateContentNodesQuery} from './service/api/contentApi.custom';

export const ContentScreen = () => {
  const [cursor, setCursor] = useState<string>();
  const {currentData} = usePaginateContentNodesQuery({
    first: 10,
    after: cursor,
  });
  const pinnedContent = useAppSelector(state => state.content.pinnedContent);

  if (!currentData || !currentData.Admin.Tree.GetContentNodes.edges) {
    return null;
  }

  const filteredList = currentData.Admin.Tree.GetContentNodes.edges.filter(
    item =>
      !pinnedContent.find(c => c.node.id === item?.node?.id) &&
      item?.node?.structureDefinition?.title &&
      item.node.structureDefinition.title.trim() !== '',
  );
  const combinedList = [...pinnedContent, ...filteredList];

  return (
    <ContentList
      items={combinedList as TreeNodesEdge[]}
      fetchMore={() => setCursor(combinedList[combinedList.length - 1]?.cursor)}
    />
  );
};
