// @flow

import React, {useEffect, useState} from "react";
import Person from "./Person";
import Str from "../../common/Str";
import Routes from "../../Routes";
import {navigate} from "../../common/PageUtil";
import {onApiError} from "../../core/Api";
import {useStateValue} from "../../core/State";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import QueryString from "../../common/QueryString";
import TextField from "@material-ui/core/TextField";
import {Container} from "@material-ui/core";
import {Formik} from "formik";
import Box from "@material-ui/core/Box";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Title from "../../components/Title";
import {DatePicker} from "@material-ui/pickers";
import getYear from 'date-fns/getYear'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import PaginatedTable from "../../components/PaginatedTable";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
  const [{user}] = useStateValue();
  const classes = useStyles();

  // const [validation, setValidation] = useState(null);
  const [persons, setPersons] = useState(null);

  const query = new QueryString(props.location.search);

  const values = {
    filter: query.get('filter', ''),
    from: query.get('from', null),
    to: query.get('to', null)
  };

  useEffect(() => {

    Person.search(user, query.parsedQuery)
      .then((resource) => {
        query.setSize(resource.size);
        query.setPage(resource.number);
        return resource;
      })
      .then(setPersons)
      .catch(onApiError);

  }, [user, props.location.search]);

  function onSelectPerson(person) {
    navigate(props.history, Routes.person.person(person));
  }

  function handleChangePage(event: object, page: number) {
    query.setPage(page);
    doNavigate();
  }

  function handleChangeRowsPerPage(event: object, size: number) {
    query.setSize(event.target.value);
    doNavigate();
  }

  function handleSort(id: string) {
    query.toggleDirection(id);
    doNavigate();
  }

  function doNavigate() {
    navigate(props.history, query.toString());
  }

  function onFilter(values) {
    query.set('filter', values.filter);
    query.set('from', values.from);
    query.set('to', values.to);
    doNavigate();
  }

  function update(setFieldValue, name, value) {
    setFieldValue(name, value);
    doNavigate();
  }

  function onReset() {
    navigate(props.history, '?');
  }

  return (

    <Paper className={classes.root}>
      <Container>

        <Title>
          Owners
        </Title>

        <Typography className={classes.content}>
          This page lists the owners in the database. You can filter the results, and sort by clicking on the
          column headers.
          Click a row to edit its content.
        </Typography>

      </Container>

      {persons != null &&
      <div>
        <Container>
          <Formik initialValues={values} onSubmit={onFilter} enableReinitialize={true}>
            {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setFieldValue, resetForm}) => (

              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <TextField
                      id="filter"
                      name="filter"
                      value={values.filter}
                      label="Filter"
                      size="small"
                      margin="normal"
                      fullWidth
                      onChange={handleChange}
                      autoFocus
                      variant="outlined"
                      helperText="Press enter to update search results"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DatePicker
                      id="from"
                      name="from"
                      value={values.from ? new Date(values.from, 1, 1) : null}
                      size="small"
                      margin="normal"
                      onChange={option => {
                        update(setFieldValue, "from", getYear(option));
                      }}
                      fullWidth
                      views={["year"]}
                      inputVariant="outlined"
                      label="DoB From"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DatePicker
                      id="to"
                      name="to"
                      value={values.to ? new Date(values.to, 1, 1) : null}
                      size="small"
                      margin="normal"
                      onChange={option => {
                        update(setFieldValue, "to", getYear(option));
                      }}
                      fullWidth
                      views={["year"]}
                      inputVariant="outlined"
                      label="DoB To"
                    />
                  </Grid>
                </Grid>

                <Grid container justify="flex-end" spacing={3}>
                  <Grid item>
                    <Button
                      variant="contained"
                      margin="normal"
                      type="reset"
                      fullWidth
                      onClick={onReset}
                      color="default">
                      Clear
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      margin="normal"
                      fullWidth
                      color="primary">
                      Search
                    </Button>
                  </Grid>
                </Grid>

              </form>
            )}
          </Formik>

          <Box my={3}>
            <Divider light={true}/>
          </Box>

          <PaginatedTable classes={classes}
                          items={persons}
                          query={query}
                          headers={[
                            {
                              name: 'Name',
                              key: 'name.firstName'
                            },
                            {
                              name: 'Date of Birth',
                              key: 'dateOfBirth'
                            },
                            {
                              name: 'Detail'
                            }
                          ]
                          }
                          columnValueFunctions={[
                            (item) => item.name.fullName(),
                            (item) => Str.formatDate(item.dateOfBirth),
                            (item) => <ChevronRightIcon/>
                          ]}
                          handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}
                          handleSort={handleSort}
                          onSelectItem={onSelectPerson}
          >

          </PaginatedTable>

        </Container>
      </div>

      }
    </Paper>

  )

}