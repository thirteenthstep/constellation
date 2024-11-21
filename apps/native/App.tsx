/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Providers} from '@constellation/app/providers/Providers.tsx';


LogBox.ignoreLogs([
  /TNodeChildrenRenderer/,
  /MemoizedTNodeRenderer/,
  /TRenderEngineProvider/,
]);

function App() {
  return (
    <SafeAreaProvider>
      <Providers />
    </SafeAreaProvider>
  );
}

export default App;
