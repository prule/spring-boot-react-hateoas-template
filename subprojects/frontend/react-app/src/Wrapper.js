import './index.css';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import App from './App';
import theme, {drawerWidth, styles} from './theme';
import * as serviceWorker from './serviceWorker';
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import Header from "./Header";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/home/HomePage";
import Content from "./Content";
import Box from "@material-ui/core/Box";
import {StateProvider, useStateValue} from "./State";
import {withStyles} from "@material-ui/core/styles";
import Container from "./Container";
import ActionType from "./common/ActionType";
import {onApiError} from "./Api";
import Index from "./app/Index";

function Wrapper(props) {
  const {classes} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const [{index, alert}, dispatch] = useStateValue();

  useEffect(() => {
    Index.load()
      .then((index) => dispatch(ActionType.forResource(ActionType.INDEX, index)))
      .catch(onApiError(dispatch))
  }, []);

  if (index == null) {
    return null;
  }

  return (
    <div className={classes.root}>

      <Route exact path="/login" component={LoginPage}/>
      <Route path="/app" component={Container}/>

    </div>
  )
};

export default withStyles(styles)(Wrapper);