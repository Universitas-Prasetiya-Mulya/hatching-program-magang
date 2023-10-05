import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";
import EditMasterDosen from "./edittabledosen";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TableMasterDosen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const { data: session } = useSession();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchListTableDosen() {
      const resListMasterDosen = await fetch(
        `${API_URL}/master/user?id_role=3`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const dataDosen = await resListMasterDosen.json();
      console.log(dataDosen?.data);
      const users = dataDosen?.data?.users.map((user) => ({
        ...user,
        nim_nik: user.nim,
      }));
      setFilteredData(users);
      setOriginalData(users);
    }
    fetchListTableDosen();
  }, [session]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setStartIndex(newPage * rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setStartIndex(0);
  };

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter(
        (row) =>
          row.name.toLowerCase().includes(query.toLowerCase()) ||
          row.nim.toLowerCase().includes(query.toLowerCase()) ||
          row.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setPage(0);
  };

  const handleUpdateData = (updatedData) => {
    const updatedIndex = originalData.findIndex((d) => d.id === updatedData.id);
    if (updatedIndex !== -1) {
      const updatedOriginalData = [...originalData];
      updatedOriginalData[updatedIndex] = updatedData;
      setOriginalData(updatedOriginalData);
      setFilteredData(updatedOriginalData);
    }
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[200],
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const columns = [
    { id: "no", label: "No", minWidth: 50, align: "center" },
    { id: "name", label: "Nama Dosen", minWidth: 170, align: "center" },
    {
      id: "nik",
      label: "NIK",
      minWidth: 100,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 120,
      align: "center",
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 70,
      align: "center",
    },
  ];

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        fullWidth
        sx={{
          marginBottom: 3,
        }}
      />
      <Paper sx={{ width: "1220px", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className="bg-primary text-white"
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredData) &&
                filteredData
                  .slice(startIndex, startIndex + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <StyledTableRow key={row.id || index}>
                        <TableCell style={{ textAlign: "center" }}>
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.name}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.nim}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", color: "blueviolet" }}
                        >
                          {row.email}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <EditMasterDosen
                            data={row}
                            onUpdate={handleUpdateData}
                            session={session}
                            id={row?.id_user}
                          />
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        {Array.isArray(filteredData) && filteredData.length > 0 && (
          <TablePagination
            labelRowsPerPage="Show rows"
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={filteredData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{
              backgroundColor: "#082658",
              color: "white",
            }}
          />
        )}
      </Paper>
    </div>
  );
}
