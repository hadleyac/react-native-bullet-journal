import React, { Component } from 'react';
import App from './App';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { BreadProvider } from "material-bread";
import { registerRootComponent } from 'expo';

//Redux Imports
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './store/reducer'

const store = createStore(reducer)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f50057',
    accent: '#f50057',
  }
};

class Index extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </Provider>

    )
  }
}

export default registerRootComponent(Index);
