import {TamaguiProvider, createTamagui} from '@tamagui/core';
import React, {FC, PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {Navigation} from '../navigation/Navigation';
import {store} from '../service/store/store';
import appConfig from '../tamagui.config';

const persistor = persistStore(store);
const tamaguiConfig = createTamagui(appConfig);

export const Providers: FC<PropsWithChildren> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TamaguiProvider config={tamaguiConfig}>
          <Navigation />
        </TamaguiProvider>
      </PersistGate>
    </Provider>
  );
};
