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
import Title from "../../components/Title";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import qs from 'qs';
import queryString from 'query-string';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import QueryString from "../../common/QueryString";

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

export default function PersonsPage(props) {
  const [{index, alert}, dispatch] = useStateValue();
  const classes = useStyles();

  const [validation, setValidation] = useState(null);
  const [persons, setPersons] = useState(null);

  const query = new QueryString(props.location.search);

  // const query = queryString.parse(props.location.search);
  // const page = query.page ? query.page : 0;
  // const size = query.size ? query.size : 2;
  // const sort = query.sort ? query.sort : '';

  // sort=name&name.dir=desc

  console.log('before', query);

  useEffect(() => {

    // let params = {size: size, page: page};
    Person.search(index, query.parsedQuery)
      // .then((resource)=> {
        // query.size = resource.page.size;
        // return resource;
      // })
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

  return (

    <Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" gutterBottom>
          Owners
        </Typography>
      </Toolbar>
      {persons != null &&
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
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell  align="right">
                <TableSortLabel
                  active={query.isSorted('dateOfBirth')}
                  direction={query.getSortDirection('dateOfBirth') ? query.getSortDirection('dateOfBirth') : 'asc'}
                  onClick={fn(handleSort, 'dateOfBirth')}
                >
                  Date of Birth
                </TableSortLabel>
              </TableCell>
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 10, 25]}
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
      }
    </Paper>

  )

}

