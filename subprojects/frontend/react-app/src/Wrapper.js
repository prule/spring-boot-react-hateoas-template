import './index.css';
import React, {useEffect} from 'react';
import {useStateValue} from "./State";
import ActionType from "./common/ActionType";
import {onApiError} from "./Api";
import Index from "./app/Index";
import {Route} from "react-router";
import LoginPage from "./app/LoginPage";
import Container from "./Container";
import Dashboard from "./dashboard/Dashboard";

function Wrapper(props) {

  const [{index, alert}, dispatch] = useStateValue();

  useEffect(() => {
    Index.load()
      .then((index) => dispatch(ActionType.forResource(ActionType.INDEX, index)))
      .catch(onApiError(dispatch))
  }, []);

  if (index == null) {
    console.log("no index");
    return null;
  }

  console.log("index loaded");
  return (
    <div>
      <Route exact path="/login" component={LoginPage}/>
      <Route path="/app" component={Dashboard}/>
    </div>
  )
}

export default Wrapper;