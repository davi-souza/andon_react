import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themejson from './theme/theme.json';

const theme = createMuiTheme(themejson);



ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
