import React, {useEffect, useState} from "react";
import Person from "./Person";
import Str from "../../common/Str";
import Routes from "../../Routes";
import {fn, navigate} from "../../common/PageUtil";
import {onApiError} from "../../Api";
import {useStateValue} from "../../State";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from '@material-ui/core/styles';
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function PersonsPage(props) {
  const [{index, alert}, dispatch] = useStateValue();
  const classes = useStyles();

  const [validation, setValidation] = useState(null);
  const [persons, setPersons] = useState(null);

  useEffect(() => {

    let params = {};
    Person.search(index, params)
      .then(setPersons)
      .catch(onApiError);

  }, [index]);

  function onSelectPerson(person) {
    navigate(props.history, Routes.person.person(person));
  }


  return (
    <div>
      <h2>Owners</h2>

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons && persons.list.map((row) => (
              <TableRow key={row.key} onClick={fn(onSelectPerson, row)} className="clickable">
                <TableCell component="th" scope="row">
                  {row.name.fullName()}
                </TableCell>
                <TableCell align="right">{Str.formatDate(row.dateOfBirth)}</TableCell>
                <TableCell align="right">]</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>


    </div>
  )

}

