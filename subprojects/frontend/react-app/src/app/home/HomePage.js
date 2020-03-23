import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
}));

export default function HomePage(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>

      <Container>

        <Typography variant="h6">
          Pet and Owner Sample Application
        </Typography>

        <Typography>
          <p>
            This is a sample application (which is still a work in progress) which demonstrates basic capability using:
          </p>
          <ul>
            <li>Java, Spring-Boot, JPA, HATEOAS</li>
            <li>React.js, JavaScript</li>
            <li>Gradle, Intellij IDEA, Bootstrap</li>
          </ul>
          <p>Click the "Owners" menu item in the navigation bar above to get started.</p>
        </Typography>

      </Container>

    </Paper>
  );
}