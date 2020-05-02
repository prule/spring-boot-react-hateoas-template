import '../index.css';
import React, {Fragment, useEffect} from 'react';
import {useStateValue} from "./State";
import ActionType from "../common/ActionType";
import Api, {onApiError} from "./Api";
import IndexResource from "../app/IndexResource";
import {Route, useHistory} from 'react-router-dom'
import LoginPage from "../app/LoginPage";
import Dashboard from "../dashboard/Dashboard";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {ErrorMessage} from "../common/ErrorMessage";
import {Redirect, Switch} from "react-router";
import User from "../app/user/User";
import logger from './Logging';

function Wrapper(props) {

  const [{index, user, alert, notification}, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(notification !== undefined);

  useEffect(() => {
    IndexResource.load()
      .then((index) => {
        dispatch(ActionType.forResource(ActionType.INDEX, index))
        return index;
      })
      .then(User.me)
      .then(user => dispatch(ActionType.forResource(ActionType.USER, user)))
      .catch((error) => {
        console.log(error);
        if (error.status === 403) {
          // not logged on
          dispatch(ActionType.forResource(ActionType.USER, null));
        } else {
          onApiError(dispatch)(error);
        }
      })
  }, []);

  if (index == null) {

    if (alert) {
      return (
        <ErrorMessage message={"An unexpected error has occurred. Please check your network is working and the server can be contacted."}/>
      );
    }

    return null;
  }

  const handleClose = (event, reason) => {
    // setOpen(false);
    dispatch(ActionType.forResource(ActionType.NOTIFICATION, undefined))
  };

  // logger.debug('render wrapper, user=', user);
  // logger.debug('render wrapper, props=', props);

  if (user !== undefined) {
    return (
      <div>

        <Switch>
          <Route exact path="/login" component={LoginPage}/>
          <PrivateRoute path="/" user={user}>
            <Route path="/" component={Dashboard}/>
          </PrivateRoute>
        </Switch>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!notification}
          autoHideDuration={6000}
          onClose={handleClose}
          message={notification}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small"/>
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    )
  }
  else {
    return null;
  }
}

function PrivateRoute({children, user, ...rest}) {
  console.log('token', Api.hasToken());
  console.log('user', user);

  return (
    <Route
      {...rest}
      render={({location}) =>
        Api.hasToken() && user ?
          (children)
          : (
            <Redirect
              to={{
                pathname: "/login",
                state: {from: location}
              }}
            />
          )
      }
    />
  );
}

export default Wrapper;