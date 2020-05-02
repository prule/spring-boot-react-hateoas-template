// @flow

import React, {useEffect, useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Routes from "../../Routes";
import {onApiError} from "../../core/Api";

import {navigate, fn} from '../../common/PageUtil';

import Person from "./Person";
import {useStateValue} from "../../core/State";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {Box, Container} from "@material-ui/core";
import ActionType from "../../common/ActionType";
import {ErrorMessage} from "../../common/ErrorMessage";

const schema = yup.object({
  person: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    })
  })
});

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`
  },
  container: {
    maxWidth: "200px"
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textAlign: "right",
  },
  form: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
});

function PersonPage(props) {
  const {classes} = props;

  const [{user, alert}, dispatch] = useStateValue();

  const personKey = props.match.params.key;

  const [validation, setValidation] = useState(null);
  const [person, setPerson] = useState(null);
  const [pets, setPets] = useState(null);

  const values = {
    person: person
  };

  useEffect(() => {
    Person.find(user, personKey)
      .then(setPerson)
      .then((person) => person.searchPets()
        .then(setPets)
        .catch((err) => onApiError(err, setValidation))
      )
      .catch((err) => onApiError(err, setValidation));
  }, [personKey]);

  function onCancel() {
    navigate(props.history, Routes.person.persons());
  }

  function onSave(values) {
    values.person.save()
      .then((resource)=> {
        setPerson(resource);
        dispatch(ActionType.forNotification("Person Saved"));
        navigate(props.history, Routes.person.persons());
      })
      .catch((e) => {
        console.log('error is ', e);
        return onApiError(dispatch, setValidation)
      })
  }

  function onSelectPet(pet) {
    navigate(props.history, Routes.person.pet(person, pet));
  }

  function onAddPet() {
    navigate(props.history, Routes.person.pet(person, null));
  }

  return (

    <div>
      <ErrorMessage message={alert ? alert.message : null}/>

      <Paper className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" gutterBottom>
            Owner
          </Typography>
        </Toolbar>
        {person &&
        <Container>

          <Formik validationSchema={schema} onSubmit={onSave} initialValues={values}>
            {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors}) => (

              <Form className={classes.form} noValidate onSubmit={handleSubmit}>

                <Field name="person.name.firstName" value={values.person.name.firstName} onChange={handleChange} component={TextField} label="First Name" fullWidth
                       error={!!(errors.person && errors.person.name && errors.person.name.firstName)}
                       helperText={(errors.person && errors.person.name && errors.person.name.firstName)}
                />

                <Field name="person.name.otherNames" id="person.name.otherNames" value={values.person.name.otherNames} onChange={handleChange} component={TextField} label="Other Names" fullWidth
                       error={!!(errors.person && errors.person.name && errors.person.name.otherNames)}
                       helperText={(errors.person && errors.person.name && errors.person.name.otherNames)}
                />

                <Field name="person.name.lastName" id="person.name.lastName" value={values.person.name.lastName} onChange={handleChange} component={TextField} label="Last Name" fullWidth
                       error={!!(errors.person && errors.person.name && errors.person.name.lastName)}
                       helperText={(errors.person && errors.person.name && errors.person.name.lastName)}
                />

                <Box p={1} className={classes.buttons}>
                  <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                    Save
                  </Button>
                  <Button onClick={onCancel} variant="contained" color="default">
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
        }
      </Paper>
    </div>

  )
}

export default withStyles(styles)(PersonPage);