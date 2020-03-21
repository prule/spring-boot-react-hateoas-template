// @flow

import React, {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import withStyles from "@material-ui/core/styles/withStyles";

import Routes from "../../Routes";
import {onApiError} from "../../Api";

import {navigate, fn} from '../../common/PageUtil';

import Person from "./Person";
import {useStateValue} from "../../State";
import {Formik} from "formik";
import * as yup from "yup";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required()
});

const styles = theme => ({
 paper: {
   marginTop: theme.spacing.unit * 8,
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
     .spacing.unit * 5}px`
 },
 container: {
   maxWidth: "200px"
 }
});

function PersonPage(props) {
  const {classes} = props;

  const [{index, alert}, dispatch] = useStateValue();

  const personKey = props.match.params.key;

  const [validation, setValidation] = useState(null);
  const [person, setPerson] = useState(null);
  const [pets, setPets] = useState(null);

  useEffect(() => {
    Person.find(index, personKey)
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

  function onSave() {
    person.save()
      .then(setPerson)
      .then(() => navigate(Routes.person.persons()))
      .catch(onApiError);
  }

  function onSelectPet(pet) {
    navigate(props.history, Routes.person.pet(person, pet));
  }

  function onAddPet() {
    navigate(props.history, Routes.person.pet(person, null));
  }

  return (
    <div>
      <h2>Owner</h2>
      <br/>

      {person &&

      <div className={classes.container}>
        <Paper elevation={1} className={classes.paper}>
          <h1>Form</h1>
          <Formik>
            <form onSubmit={() => {}}>

              <TextField
                id="person.name.firstName"
                name="name"
                label="Name"
                value={person.name.firstName}
                fullWidth
              />

              <Button type="submit">Save</Button>
              <Button onClick={onCancel}>Cancel</Button>

            </form>


          </Formik>
        </Paper>
      </div>
      }
    </div>
  )
}

export default withStyles(styles)(PersonPage);