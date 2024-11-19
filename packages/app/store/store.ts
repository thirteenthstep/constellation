import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {authenticationSlice} from '../features/authentication/authenticationSlice.ts';
import {api} from '../graphql/domain/authenticationApi.generated.ts';


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authenticationSlice.reducerPath]: authenticationSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
