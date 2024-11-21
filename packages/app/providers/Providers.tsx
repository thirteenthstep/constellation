import {TamaguiProvider, createTamagui} from '@tamagui/core';
import React, {FC, PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {store} from '../store/store.ts';
import appConfig from '../tamagui.config.ts';
import {NavigationProvider} from './NavigationProvider';


const persistor = persistStore(store);
const tamaguiConfig = createTamagui(appConfig);

export const Providers: FC<PropsWithChildren> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TamaguiProvider config={tamaguiConfig}>
          <NavigationProvider />
        </TamaguiProvider>
      </PersistGate>
    </Provider>
  );
};
