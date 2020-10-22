import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { MenuProvider } from 'react-native-popup-menu';

import CalculatorPageContainer from './src/components/CalculatorPageContainer';
import { store, persistor } from './src/redux/Store';

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <CalculatorPageContainer />
          </MenuProvider>
        </PersistGate>
      </Provider>
    )
  }
}
