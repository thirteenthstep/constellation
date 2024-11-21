/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Providers} from '@constellation/app/providers/Providers.tsx';

function App() {
  return (
    <SafeAreaProvider>
      <Providers />
    </SafeAreaProvider>
  );
}

export default App;
