// @flow

import React from 'react';
import Dashboard from "../dashboard/Dashboard";
import {StateProvider} from "./State";
import Wrapper from "./Wrapper";
import {withStyles} from "@material-ui/core";
import reducer from "../Reducer";

const styles = {};

function App(props) {

  const initialState = {
    theme: {primary: 'green'},
    title: 'Dashboard'
  };


  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Wrapper>
        <Dashboard/>
      </Wrapper>
    </StateProvider>
  );
}

export default withStyles(styles)(App);