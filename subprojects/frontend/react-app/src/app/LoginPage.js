// @flow

import React, {useEffect, useState} from "react";
import Routes from "../Routes";
import Api, {onApiError} from '../Api';
import App from "../App";

import "react-datepicker/dist/react-datepicker.css";
import {navigate} from "../common/PageUtil";
import {useStateValue} from "../State";
import {Formik} from "formik";
import * as yup from 'yup';
import {withStyles} from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const styles = {};

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
});

const values = {
  username: '',
  password: '',
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

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
  const [{index, alert}, dispatch] = useStateValue();
  const [validation, setValidation] = useState({});

  function onCancel() {
    navigate(Routes.main.home());
  }

  function onSubmit(values) {
    // clear();
    Api.post(index.link('login'), values)
      .then((response) => {
        App.token = response.token;
        Api.setToken(response.token);
        navigate(props.history, Routes.person.persons())
      })
      .catch(onApiError(dispatch, setValidation))
    ;
  }

  console.log(validation);

  return (
    <Grid container spacing={0} xs={12} alignItems="center" justify="center">

      <Grid xs={6} container component="main" className={classes.root}>
        <CssBaseline/>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik
              validationSchema={schema}
              onSubmit={onSubmit}
              initialValues={values}
            >
              {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (

                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Email Address"
                    name="username"
                    autoComplete="off"
                    autoFocus
                    value={values.username}
                    onChange={handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
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

                </form>

              )}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )

}

export default withStyles(styles)(LoginPage);