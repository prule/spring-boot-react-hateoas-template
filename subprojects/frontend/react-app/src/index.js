import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import {BrowserRouter, Redirect} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App/>
      {/*<Redirect to={"/app/home"}/>*/}
    </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
