import PropTypes from 'prop-types';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function ErrorMessage(props) {
  const classes = useStyles();

  if (!props.message) {
    return null;
  }

  return (
      <div id="errorMessage" className={classes.root}>
        <Alert severity="error">
          <strong>{props.message}</strong>
        </Alert>
      </div>
  )
}