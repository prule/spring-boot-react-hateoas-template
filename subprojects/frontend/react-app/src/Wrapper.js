import './index.css';
import React, {useEffect} from 'react';
import {useStateValue} from "./State";
import ActionType from "./common/ActionType";
import Api, {onApiError} from "./Api";
import Index from "./app/Index";
import {Route, useHistory} from 'react-router-dom'
// import {Route} from "react-router";
import LoginPage from "./app/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {ErrorMessage} from "./common/ErrorMessage";
import {Redirect, Switch} from "react-router";

function Wrapper(props) {

  const [{index, alert, notification}, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(notification !== undefined);

  useEffect(() => {
    Index.load()
      .then((index) => dispatch(ActionType.forResource(ActionType.INDEX, index)))
      .catch(onApiError(dispatch))
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

  return (
    <div>

      <Switch>
        <Route exact path="/login" component={LoginPage}/>
        <PrivateRoute path="/">
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

function PrivateRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) =>
        Api.hasToken() ? (
          children
        ) : (
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