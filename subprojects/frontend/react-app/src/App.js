import React from 'react';
import Dashboard from "./dashboard/Dashboard";
import {StateProvider} from "./State";
import Wrapper from "./Wrapper";
import {withStyles} from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const styles = {

};

function App(props) {
  const history = useHistory();

  const initialState = {
    theme: {primary: 'green'},
    title: 'Dashboard'
  };

  const reducer = (state, action) => {
    console.log('state', state);
    console.log('action', action);
    switch (action.type) {
      case 'changeTitle':
        return {
          ...state,
          title: action.title
        };
      case 'changeTheme':
        return {
          ...state,
          theme: action.newTheme
        };
      case 'index':
        console.log('got index');
        return {
          ...state,
          index: action.resource
        };
      case 'alert':
        console.log('got alert');
        return {
          ...state,
          alert: action.alert
        };
      case 'notification':
         console.log('got notification', action);
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