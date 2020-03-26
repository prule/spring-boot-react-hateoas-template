// @flow

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
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Toolbar from "@material-ui/core/Toolbar";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import QueryString from "../../common/QueryString";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import {Formik} from "formik";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {Route, useHistory} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  clickable: {
    cursor: 'pointer'
  },
  content: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }
}));

export default function PersonsPage(props) {
  const [{index, alert}, dispatch] = useStateValue();
  const classes = useStyles();

  const [validation, setValidation] = useState(null);
  const [persons, setPersons] = useState(null);
  const [filter, setFilter] = useState('');

  const query = new QueryString(props.location.search);

  const values = {
    filter: query.get('filter', '')
  };

  useEffect(() => {

    // let params = {size: size, page: page};
    Person.search(index, query.parsedQuery)
      .then((resource) => {
        query.setSize(resource.size);
        query.setPage(resource.number);
        return resource;
      })
      .then(setPersons)
      .catch(onApiError);

  }, [index, props.location.search]);

  function onSelectPerson(person) {
    navigate(props.history, Routes.person.person(person));
  }

  function handleChangePage(event: object, page: number) {
    query.setPage(page);
    doNavigate();
  }

  function handleChangeRowsPerPage(event: object, size: number) {
    console.log('event', event);
    console.log('event.target.value', event.target.value);
    query.setSize(event.target.value);
    doNavigate();
  }

  function handleSort(id: string) {
    console.log('handlesort')
    query.toggleDirection(id);
    doNavigate();

  }

  function doNavigate() {
    console.log('navigating', query.toString());
    navigate(props.history, query.toString());
  }

  function onFilter(values) {
    console.log('onFilter', values);
    query.set('filter', values.filter);
    doNavigate();
  }

  return (

    <Paper className={classes.root}>
      <Container>
        <Typography variant="h6" gutterBottom>
          Owners
        </Typography>
        <Typography className={classes.content}>
          This page lists the owners in the database. You can filter the results, and sort by clicking on the column headers.
          Click a row to edit its content.
        </Typography>
      </Container>
      {persons != null &&
      <div>
        <Container>
          <Formik initialValues={values} onSubmit={onFilter}>
            {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors}) => (

              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  id="filter"
                  name="filter"
                  value={values.filter}
                  label="Filter"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                  onChange={handleChange}
                  autoFocus
                  helperText="Press enter to update search results"
                />
              </form>
            )}
          </Formik>
          {/*<form className={classes.root} noValidate autoComplete="off">*/}
          {/*  <div>*/}
          {/*    <TextField id="filter" label="Filter" variant="outlined" size="small" margin="normal" fullWidth/>*/}
          {/*  </div>*/}
          {/*</form>*/}
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={query.getSortDirection('name.firstName') ? query.getSortDirection('name.firstName') : false}>
                    <TableSortLabel
                      active={query.isSorted('name.firstName')}
                      direction={query.getSortDirection('name.firstName') ? query.getSortDirection('name.firstName') : 'asc'}
                      onClick={fn(handleSort, 'name.firstName')}
                    >
                      <b>Name</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={query.isSorted('dateOfBirth')}
                      direction={query.getSortDirection('dateOfBirth') ? query.getSortDirection('dateOfBirth') : 'asc'}
                      onClick={fn(handleSort, 'dateOfBirth')}
                    >
                      <b>Date of Birth</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right"><b>Detail</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {persons && persons.list.map((row) => (
                  <TableRow key={row.key} onClick={fn(onSelectPerson, row)} className={classes.clickable}>
                    <TableCell component="th" scope="row">
                      {row.name.fullName()}
                    </TableCell>
                    <TableCell align="right">{Str.formatDate(row.dateOfBirth)}</TableCell>
                    <TableCell align="right"><ChevronRightIcon/></TableCell>
                  </TableRow>
                ))}
                {persons && persons.list.length === 0 &&
                <TableRow>
                  <TableCell colSpan={3}>
                    <Box fontStyle="italic">No results found</Box>
                  </TableCell>
                </TableRow>
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[2, 10, 20]}
                    colSpan={3}
                    count={persons.totalElements}
                    rowsPerPage={persons.size}
                    page={persons.number}
                    SelectProps={{
                      inputProps: {'aria-label': 'rows per page'},
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Container>
      </div>

      }
    </Paper>

  )

}

