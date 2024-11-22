import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer} from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

import {authenticationSlice} from '../../features/authentication/service/store/authenticationSlice';
import {contentSlice} from '../../features/content/service/store/contentSlice';
import {api} from '../api/baseApi';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [api.reducerPath],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [authenticationSlice.reducerPath]: authenticationSlice.reducer,
  [contentSlice.reducerPath]: contentSlice.reducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector.withTypes<RootState>();
