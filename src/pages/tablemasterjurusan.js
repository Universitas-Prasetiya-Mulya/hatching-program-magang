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
import EditTableJurusan from "./edittablejurusan";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TableMasterJurusan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchMajorList() {
      const resMajorList = await fetch(`${API_URL}/master/major?id_user=1`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await resMajorList.json();
      console.log(data.data);
      setOriginalData(data.data);
      setFilteredData(data.data);
    }
    fetchMajorList();
  }, [session]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
          row.code.toLowerCase().includes(query.toLowerCase()) ||
          row.prodi.toLowerCase().includes(query.toLowerCase()) ||
          row.faculty.toLowerCase().includes(query.toLowerCase())
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

  return (
    <div className="z-0">
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
                <TableCell
                  className="bg-primary text-white"
                  align="center"
                  style={{ minWidth: 50 }}
                >
                  No
                </TableCell>
                <TableCell
                  className="bg-primary text-white"
                  align="center"
                  style={{ minWidth: 170 }}
                >
                  Nama Jurusan
                </TableCell>
                <TableCell
                  className="bg-primary text-white"
                  align="center"
                  style={{ minWidth: 100 }}
                >
                  Kode Jurusan
                </TableCell>
                <TableCell
                  className="bg-primary text-white"
                  align="center"
                  style={{ minWidth: 100 }}
                >
                  Prodi
                </TableCell>
                <TableCell
                  className="bg-primary text-white"
                  align="center"
                  style={{ minWidth: 120 }}
                >
                  Fakultas
                </TableCell>
                <TableCell
                  className="bg-primary text-white"
                  align="center"
                  style={{ minWidth: 70 }}
                >
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredData) &&
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    console.log(index, row);
                    return (
                      <StyledTableRow key={row.id || index}>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.id}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.name}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.code}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.prodi}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.faculty}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <EditTableJurusan
                            data={row}
                            onUpdate={handleUpdateData}
                            session={session}
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
};

export default TableMasterJurusan;
