import '../index.css';
import React, {useEffect} from 'react';
import {useStateValue} from "./State";
import ActionType from "../common/ActionType";
import Api, {onApiError} from "./Api";
import IndexResource from "../app/IndexResource";
import {Route} from 'react-router-dom'
import LoginPage from "../app/LoginPage";
import Dashboard from "../dashboard/Dashboard";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {ErrorMessage} from "../common/ErrorMessage";
import {Redirect, Switch} from "react-router";
import User from "../app/user/User";
import log from './Logging';
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

function Wrapper(props) {

  const [{index, user, alert, notification, reload}, dispatch] = useStateValue();

  Api.dispatch = dispatch;

  useEffect(() => {
    IndexResource.load()
      .then((index) => {
        dispatch(ActionType.forResource(ActionType.INDEX, index))
        return index;
      })
      .then(User.me)
      .then(user => dispatch(ActionType.forResource(ActionType.USER, user)))
      .catch((error) => {
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

  const handleReload = () => { window.location.reload() }

  log( 'render wrapper, user=%o', user);
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

        <Dialog onClose={handleReload} aria-labelledby="customized-dialog-title" open={!!reload}>
           <DialogTitle id="customized-dialog-title" onClose={handleReload}>
             Application Updated
           </DialogTitle>
           <DialogContent dividers>
             <Typography gutterBottom>
               This application has been updated and must be reloaded.
             </Typography>
           </DialogContent>
           <DialogActions>
             <Button autoFocus onClick={handleReload} color="primary">
               Reload
             </Button>
           </DialogActions>
         </Dialog>
      </div>
    )
  }
  else {
    return null;
  }
}

function PrivateRoute({children, user, ...rest}) {
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