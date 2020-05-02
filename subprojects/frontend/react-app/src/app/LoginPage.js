// @flow

import React, {useState} from "react";
import Routes from "../Routes";
import Api, {onApiError} from '../core/Api';
import App from "../App";

import {navigate} from "../common/PageUtil";
import {useStateValue} from "../core/State";
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {ErrorMessage} from '../common/ErrorMessage';
import {withStyles} from "@material-ui/core";
import ActionType from "../common/ActionType";
import LinkRelations from "./LinkRelations";
import {Redirect} from "react-router";
import User from "./user/User";

const styles = {};

const schema = yup.object({
  credentials: yup.object().shape({
    username: yup.string().required('Required'),
    password: yup.string().required('Required'),
  })
});

const values = {
  credentials: {
    username: '',
    password: '',
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '80vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function LoginPage(props) {
  const classes = useStyles();
  const [{index, user, alert}, dispatch] = useStateValue();
  const [validation, setValidation] = useState({});

  function onCancel() {
    navigate(Routes.main.home());
  }

  function onSubmit(values) {
    Api.do(index.link(LinkRelations.login), values.credentials)
      .then((response) => {
        App.token = response.token;
        Api.setToken(response.token);
        dispatch(ActionType.forResource(ActionType.USER, new User(response.user)));
      })
      .catch(onApiError(dispatch, setValidation))
    ;
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: Routes.main.home()
        }}
      />
    )
  }

  return (
    <Grid item container spacing={0} xs={12} alignItems="center" justify="center" style={{minHeight: '100vh'}}>

      <Grid item xs={6} container className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <ErrorMessage message={alert ? alert.message : null}/>

            <Formik
              validationSchema={schema}
              onSubmit={onSubmit}
              initialValues={values}
            >
              {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors}) => {
                console.log(errors);
                return (
                  <Form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Field name="credentials.username" id="credentials.username" value={values.credentials.username}
                           onChange={handleChange} component={TextField} variant="outlined" margin="normal"
                           label="Email Address" fullWidth
                           error={!!(errors.credentials && errors.credentials.username)}
                           helperText={(errors.credentials && errors.credentials.username)}
                    />
                    <Field name="credentials.password" id="credentials.password" value={values.credentials.password}
                           onChange={handleChange} component={TextField} variant="outlined" margin="normal"
                           label="Password" fullWidth type="password"
                           error={!!(errors.credentials && errors.credentials.password)}
                           helperText={(errors.credentials && errors.credentials.password)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )

}

export default withStyles(styles)(LoginPage);
