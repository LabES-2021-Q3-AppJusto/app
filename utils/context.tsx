import React, { ReactNode } from 'react';
import { Linking } from 'expo';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import Api from "../store/api";
import { createStore } from '../store';
import { getExtra } from "./config";
import { defineLocationUpdatesTask } from './location';

const extra = getExtra();
export const api = new Api(extra);
export const store = createStore(extra);
export const ApiContext = React.createContext<Api>(api);

defineLocationUpdatesTask(store, api);

export interface Props {
  children: ReactNode;
}

export const AppContext = ({ children }: Props) => {
  const linking = {
    prefixes: [
      Linking.makeUrl('/'),
      'https://appjusto.com.br'
    ],
  };
  return (
    <ApiContext.Provider value={api}>
      <Provider store={store}>
        <NavigationContainer linking={linking}>
          {children}
        </NavigationContainer>
      </Provider>
    </ApiContext.Provider>
  );
}
