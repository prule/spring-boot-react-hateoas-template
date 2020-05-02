// @flow

import React from 'react';
import Dashboard from "./dashboard/Dashboard";
import {StateProvider} from "./State";
import Wrapper from "./Wrapper";
import {withStyles} from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import ActionType from "./common/ActionType";
import {navigate} from "./common/PageUtil";
import Routes from "./Routes";

const styles = {};

function App(props) {
  const history = useHistory();

  const initialState = {
    theme: {primary: 'green'},
    title: 'Dashboard'
  };

  const reducer = (state: Object, action: ActionType) => {
    console.log('state', state);
    console.log('action', action);
    switch (action.type) {
      case 'changeTitle':
        return {
          ...state,
          title: action.title
        };
      case ActionType.INDEX:
        return {
          ...state,
          index: action.resource
        };
      case ActionType.USER:
        // if (action.resource) {
        //   navigate(history, Routes.main.home());
        // }
        // else {
        //   navigate(history, Routes.main.login());
        // }
        return {
          ...state,
          user: action.resource
        };
      case ActionType.ALERT:
        return {
          ...state,
          alert: action.alert
        };
      case ActionType.NOTIFICATION:
        return {
          ...state,
          notification: action.notification
        };

      default:
        return state;
    }
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