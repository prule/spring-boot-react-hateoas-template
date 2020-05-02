import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Title from "../../components/Title";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  contentHeader: {
    marginTop: theme.spacing(2)
  }
}));

export default function HomePage(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>

      <Container>

        <Title>
          Pet and Owner Sample Application
        </Title>

        <Typography>
          This is a sample application (which is still a work in progress) which demonstrates basic capability using:
        </Typography>
        <ul>
          <li>Java, Spring-Boot, JPA, HATEOAS</li>
          <li>React.js, JavaScript</li>
          <li>Gradle, Intellij IDEA, Bootstrap</li>
        </ul>
        <p>Click the "Owners" menu item in the navigation bar above to get started.</p>
        <p>This app uses:</p>
        <ul>
          <li>The dashboard template from https://material-ui.com/getting-started/templates/</li>
        </ul>

      </Container>

    </Paper>
  );
}