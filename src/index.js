import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Web3ReactProvider } from '@web3-react/core';
import { CookiesProvider } from 'react-cookie' ;

import reportWebVitals from './utils/reportWebVitals';

import { getLibrary } from './utils/helper' ;

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Web3ReactProvider> ,
  document.getElementById('root')
);

reportWebVitals();
