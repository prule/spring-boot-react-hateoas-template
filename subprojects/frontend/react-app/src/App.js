// @flow

import './App.css'

import React from 'react';
import {Route, Router} from "react-router";
import history from './history';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import {StateProvider} from './State';
import ActionType from "./common/ActionType";

import Main from "./Main";
import Menu from "./app/Menu";
import LoginPage from "./app/LoginPage";

export default function App() {
  // const initialState = {
  //   index: null
  // };

  // const reducer = (state, action: ActionType) => {
  //   console.log('action', action);
  //   let func = ActionType.handlerMap[action.type];
  //   if (func) {
  //     return func(state, action);
  //   } else {
  //     console.error('No handler has been defined for action ', action);
  //   }
  // };

  return (
    <Container maxWidth="true">
      <Box>
        <Main/>
      </Box>
    </Container>
  )

}

