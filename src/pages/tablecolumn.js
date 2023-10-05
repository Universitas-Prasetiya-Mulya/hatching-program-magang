import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const rows = [
  { events: "Technical Scripter", dates: "13 October" },
  { events: "Gate Mock", dates: "5 November" },
  // Add more rows...
];

export default function BasicTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [selectedFilter, setSelectedFilter] = React.useState("all");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleClick = (id) => {
    // Find the row with the matching id
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, clicked: true };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          id="filter-select"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="clicked">Clicked</MenuItem>
          <MenuItem value="notClicked">Not Clicked</MenuItem>
        </Select>
      </FormControl>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((row) => {
                  if (selectedFilter === "all") {
                    return true;
                  } else if (selectedFilter === "clicked") {
                    return row.clicked;
                  } else if (selectedFilter === "notClicked") {
                    return !row.clicked;
                  }
                  return true;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.events}>
                    <TableCell>{row.events}</TableCell>
                    <TableCell>{row.dates}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleClick(row.id)}
                      >
                        Click me
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
