import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import {BrowserRouter, Redirect} from 'react-router-dom';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App/>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
