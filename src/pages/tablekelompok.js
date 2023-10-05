import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Modal,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import edit from "/public/edit.svg";
import Select from "react-select";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TableKelompok() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const { data: session } = useSession();
  const [startIndex, setStartIndex] = useState(0);
  const [mentor, setMentor] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const router = useRouter();
  const [selectedHatchingId, setSelectedHatchingId] = useState(null);

  const handleDetailClick = () => {
    router.push(`/member`);
  };

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     const response = await fetch(`/hatching/detail/${selectedHatchingId}`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${session?.accessToken}`,
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     setMembers(data.data.hatching.members);
  //   };

  //   fetchDetails();
  // }, [selectedHatchingId]);

  useEffect(() => {
    async function fetchListTableKelompok() {
      const params = new URLSearchParams({
        stage: "",
        mentor1_nik: "",
        mentor2_nik: "",
      });

      const resListTableKelompok = await fetch(
        `${API_URL}/hatching/detail?${params}`,
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

      const dataKelompok = await resListTableKelompok.json();
      console.log(dataKelompok);
      setOriginalData(dataKelompok?.data?.hatching);
      setFilteredData(dataKelompok?.data?.hatching);
    }
    fetchListTableKelompok();
  }, [session]);

  useEffect(() => {
    async function fetchMajorOptions() {
      const response = await fetch(`${API_URL}/master/user?id_role=3`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();
      console.log(data);
      console.log(response);
      const options = data?.data?.users.map((user) => ({
        value: user.name,
        label: user.name,
      }));
      setMentor(options);
    }

    fetchMajorOptions();
  }, [session]);

  const handleUpdateToAPI = async (updatedData, index) => {
    const resUserUpdate = await fetch(
      `${API_URL}/hatching/detail/${updatedData?.id_hatching}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(updatedData),
      }
    );
    console.log(resUserUpdate.status);
    const data = await resUserUpdate.json();
    handleUpdateData(data, index);
  };

  const handleUpdateData = (updatedData, index) => {
    const updatedOriginalData = [...originalData];
    updatedOriginalData[index] = updatedData;
    setOriginalData(updatedOriginalData);
    setFilteredData(updatedOriginalData);
  };

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
          row.team_name.toLowerCase().includes(query.toLowerCase()) ||
          row.team_numb.toLowerCase().includes(query.toLowerCase()) ||
          row.mentor_1.toLowerCase().includes(query.toLowerCase()) ||
          row.mentor_2.toLowerCase().includes(query.toLowerCase()) ||
          row.descp.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setPage(0);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#EEF5FF",
      borderRadius: "5px",
      height: "56px",
    }),
  };

  const handleOpenEditModal = (rowData, index) => {
    setEditedData(rowData);
    setEditIndex(index);
    setIsOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsOpen(false);
  };

  const handleSubmitEditModal = () => {
    handleUpdateToAPI(editedData, editIndex);
    handleCloseEditModal();
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
    { id: "no", label: "No", minWidth: 70, align: "center" },
    { id: "team_numb", label: "No Kelompok", minWidth: 250, align: "center" },
    {
      id: "team_name",
      label: "Nama Kelompok",
      minWidth: 300,
      align: "center",
    },
    {
      id: "mentor_1",
      label: "Dosen Pembimbing 1",
      minWidth: 250,
      align: "center",
    },
    {
      id: "mentor_2",
      label: "Dosen Pembimbing 2",
      minWidth: 250,
      align: "center",
    },
    {
      id: "descp",
      label: "Ide Ringkasan",
      minWidth: 400,
      align: "center",
    },
    {
      id: "detail",
      label: "Member",
      minWidth: 200,
      align: "center",
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 100,
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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
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
            <TableBody>
              {Array.isArray(filteredData) &&
                filteredData
                  .slice(startIndex, startIndex + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <StyledTableRow key={row?.id_hatching || index}>
                        <TableCell style={{ textAlign: "center" }}>
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.team_numb}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.team_name}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.mentor_1}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.mentor_2}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {row.descp}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <button
                            onClick={() => handleDetailClick(row?.id_hatching)}
                            className="bg-blue-400 text-white py-2.5 px-8 rounded-xl"
                          >
                            Lihat Detail
                          </button>
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <button
                            onClick={() => handleOpenEditModal(row, index)}
                          >
                            <Image src={edit} alt="edit" />
                          </button>
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
            count={filteredData.length}
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
      <Modal
        open={isOpen}
        onClose={handleCloseEditModal}
        className="grid place-content-center"
      >
        <div className="p-[15px] bg-white w-[868px] grid place-content-center rounded-xl shadow-md  border-black border-2">
          <div className="bg-white w-[783px] space-y-[25px]">
            <h2 className="text-lg font-bold">Edit Data :</h2>
            <div className="flex gap-5 items-center text-base font-semibold">
              No Kelompok
              <p className="ml-[72px]">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.team_numb || ""}
                onChange={(event) =>
                  setEditedData({
                    ...editedData,
                    team_numb: event.target.value,
                  })
                }
                placeholder="No Kelompok"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Nama Kelompok
              <p className="ml-14">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.team_name || ""}
                onChange={(event) =>
                  setEditedData({
                    ...editedData,
                    team_name: event.target.value,
                  })
                }
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Ide Ringkasan
              <p className="ml-[60px]">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.descp || ""}
                onChange={(event) =>
                  setEditedData({ ...editedData, descp: event.target.value })
                }
                placeholder="Ide Ringkasan"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Dosen Pembimbing 1<p className="ml-[48px]">:</p>
              <Select
                className="w-[640px]"
                styles={customStyles}
                options={mentor}
                onChange={(selectedOption) =>
                  setEditedData({
                    ...editedData,
                    mentor_1: selectedOption ? selectedOption.value : "",
                  })
                }
                value={
                  editedData?.mentor_1
                    ? { value: editedData.mentor_1, label: editedData.mentor_1 }
                    : null
                }
                placeholder="Pilih Dosen Pembimbing 1"
                isClearable
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Dosen Pembimbing 2<p className="ml-[48px]">:</p>
              <Select
                className="w-[640px]"
                styles={customStyles}
                options={mentor}
                onChange={(selectedOption) =>
                  setEditedData({
                    ...editedData,
                    mentor_2: selectedOption ? selectedOption.value : "",
                  })
                }
                value={
                  editedData?.mentor_2
                    ? { value: editedData.mentor_2, label: editedData.mentor_2 }
                    : null
                }
                placeholder="Pilih Dosen Pembimbing 2"
                isClearable
              />
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={handleCloseEditModal}
                className="text-white bg-red rounded-xl w-[160px] h-[42px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitEditModal}
                className="bg-primary w-[160px] h-[42px] rounded-xl text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
