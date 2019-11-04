import React from 'react';
import App from './App';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

//Redux Imports
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './store/reducer'

//This was present in the default AppEntry.js, so I copied it here. 
if (__DEV__) {
  activateKeepAwake();
}
console.log('are we getting to the index')
const store = createStore(reducer)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f50057',
    accent: '#f50057',
  }
};

function Index() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  )
}

export default registerRootComponent(Index);