import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import store from './modules/redux';
import theme from './modules/theme';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const AppWithStoreAndStylesAndRouter = (
  <CssBaseline>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  </CssBaseline>
);

ReactDOM.render(AppWithStoreAndStylesAndRouter, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
