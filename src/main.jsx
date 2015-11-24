import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TypingContainer from './TypingContainer';
import {reducer} from './reducer';
import App from './app';

let store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('container')
);
