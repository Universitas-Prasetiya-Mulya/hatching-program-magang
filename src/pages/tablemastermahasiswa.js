import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSession } from "next-auth/react";
import EditTableMahasiswa from "./edittablemahasiswa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TableMasterMahasiswa() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: session } = useSession();
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchListTableMahasiswa() {
      const resListMasterMahasiswa = await fetch(
        `${API_URL}/master/user?id_role=4`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const dataMahasiswa = await resListMasterMahasiswa.json();
      console.log(dataMahasiswa);
      const users = dataMahasiswa?.data?.users.map((user) => ({
        ...user,
        nim_nik: user.nim,
      }));
      setFilteredData(users);
      setOriginalData(users);
    }
    fetchListTableMahasiswa();
  }, []);

  useEffect(() => {
    async function fetchMajorOptions() {
      const response = await fetch(`${API_URL}/master/major?id_user=1`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();
      const options = data?.data?.map((major) => ({
        value: major.name,
        label: major.name,
      }));
      setMajorOptions(options);
    }

    fetchMajorOptions();
  }, []);

  useEffect(() => {
    const filteredDataToDisplay = selectedMajor
      ? originalData.filter((row) => row.major === selectedMajor.value)
      : originalData;

    setFilteredData(filteredDataToDisplay);
    setPage(0);
  }, [selectedMajor, originalData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setStartIndex(newPage * rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setStartIndex(0);
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "10px",
      height: "38px",
      borderColor: "black",
    }),
  };

  const columns = [
    { id: "no", label: "No", minWidth: 50, align: "center" },
    { id: "name", label: "Nama Mahasiswa", minWidth: 170, align: "center" },
    {
      id: "nim",
      label: "NIM",
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
      id: "jurusan",
      label: "Jurusan",
      minWidth: 100,
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
      <div className="items-center text-base font-semibold flex gap-4 mb-6">
        Jurusan :
        <Select
          className="w-[640px] z-10"
          styles={customStyles}
          options={majorOptions}
          placeholder="Pilih Jurusan"
          isClearable
          value={selectedMajor}
          onChange={(selectedOption) => setSelectedMajor(selectedOption)}
        />
      </div>
      <Paper sx={{ width: "1220px", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className="bg-primary text-white border"
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {Array.isArray(filteredData) && filteredData.length > 0 && (
              <TableBody>
                {filteredData
                  .slice(startIndex, startIndex + rowsPerPage)
                  .map((row, index) => {
                    console.log(row);
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
                          {row.major}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <EditTableMahasiswa
                            data={row}
                            onUpdate={handleUpdateData}
                            session={session}
                            id={row?.id}
                          />
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            )}
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
