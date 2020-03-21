import React from 'react';
import Dashboard from "./dashboard/Dashboard";
import {StateProvider} from "./State";
import Wrapper from "./Wrapper";
import LoginPage from "./app/LoginPage";
import {Route} from "react-router";
import Container from "./Container";
import PersonsPage from "./app/person/PersonsPage";

export default function App() {
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
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Wrapper>
        <Dashboard/>
        {/*<Route exact path="/login" component={LoginPage}/>*/}
      </Wrapper>
    </StateProvider>
  );
}
