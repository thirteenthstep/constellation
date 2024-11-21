import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {TreeNodesEdge} from '../../api/types/graphql.ts';


export type ContentState = {
  pinnedContent: TreeNodesEdge[];
};

const initialState: ContentState = {
  pinnedContent: [],
};

export const contentSlice = createSlice({
  name: 'content',
  initialState: initialState,
  reducers: {
    pinContent: (state, action: PayloadAction<TreeNodesEdge>) => {
      if (!state.pinnedContent.includes(action.payload)) {
        state.pinnedContent.push(action.payload);
      }
    },
    unpinContent: (state, action: PayloadAction<TreeNodesEdge>) => {
      state.pinnedContent.splice(
        state.pinnedContent.indexOf(action.payload),
        1,
      );
    },
  },
});

export const {pinContent, unpinContent} = contentSlice.actions;
