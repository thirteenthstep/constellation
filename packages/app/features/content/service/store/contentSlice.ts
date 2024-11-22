import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {TreeNodesEdge} from '../../../../service/api/types/graphql';

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
    togglePinContent: (state, action: PayloadAction<TreeNodesEdge>) => {
      const index = state.pinnedContent.findIndex(
        c => c.node.id === action.payload.node.id,
      );
      if (index !== -1) {
        state.pinnedContent.splice(index, 1);
      } else {
        state.pinnedContent.push(action.payload);
      }
    },
  },
});

export const {togglePinContent} = contentSlice.actions;
