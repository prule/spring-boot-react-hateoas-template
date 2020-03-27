import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  contentHeader: {
    marginTop: theme.spacing(2),
    fontWeight: 600
  }
}));

export default function Title(props) {

  const classes = useStyles();

  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom className={classes.contentHeader}>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
