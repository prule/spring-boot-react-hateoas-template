import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {fn} from "../common/PageUtil";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import React from "react";

export default function PaginatedTable(props) {
  const classes = props.classes;
  const items = props.items;
  const query = props.query;
  const handleSort = props.handleSort;
  const onSelectItem = props.onSelectItem;

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.headers.map((header, index) => {
              return (
                <TableCell
                  key={`paginated-table-header-${index}`}
                  sortDirection={query ? (query.getSortDirection(header.key) ? query.getSortDirection(header.key) : false) : null}>
                  <TableSortLabel
                    active={query ? query.isSorted(header.key) : null}
                    direction={query ? (query.getSortDirection(header.key) ? query.getSortDirection(header.key) : 'asc') : null}
                    onClick={query ? fn(handleSort, header.key) : null}>
                    <b>{header.name}</b>
                  </TableSortLabel>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {items && items.list.map((row) => (
            <TableRow key={row.key} onClick={fn(onSelectItem, row)} className={classes.clickable}>
              {props.columnValueFunctions.map((columnValueFunction, index) => {
                return (
                  <TableCell component="th" scope="row" key={`paginated-table-cell-${index}`}>
                    {columnValueFunction(row)}
                  </TableCell>
                );
              })
              }
            </TableRow>
          ))}

          {items && items.length === 0 &&
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
              colSpan={props.columnValueFunctions.length}
              count={items.totalElements}
              rowsPerPage={items.size}
              page={items.number}
              SelectProps={{
                inputProps: {'aria-label': 'rows per page'},
                native: true,
              }}
              onChangePage={props.handleChangePage}
              onChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}