import React from 'react';

import {useLazyPaginateContentNodesQuery} from '../../api/domain/contentApi.custom.ts';
import {TreeNodesEdge} from '../../api/types/graphql.ts';
import {useAppSelector} from '../../store/store';
import {ContentList} from './ContentList';


export const ContentScreen = () => {
  const [fetch, {currentData, isLoading}] = useLazyPaginateContentNodesQuery();
  const pinnedContent = useAppSelector(state => state.content.pinnedContent);

  if (!currentData && !isLoading) {
    fetch({first: 10});
  }

  if (!currentData) {
    return null;
  }

  const filteredList = (
    currentData.Admin.Tree.GetContentNodes.edges ?? []
  ).filter(
    item =>
      !pinnedContent.includes(item) &&
      item?.node?.structureDefinition?.title &&
      item.node.structureDefinition.title.trim() !== '',
  );
  const combinedList = [...pinnedContent, ...filteredList];

  return (
    <ContentList
      items={combinedList as TreeNodesEdge[]}
      fetchMore={() =>
        fetch({
          first: 10,
          after: combinedList[combinedList.length - 1]?.cursor,
        })
      }
      refresh={() => {}}
    />
  );
};
