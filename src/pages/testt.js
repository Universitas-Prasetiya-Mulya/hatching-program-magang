import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import excel from "/public/excel.svg";
import add from "/public/add.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function TablePenilaianAdmin() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentor1, setSelectedMentor1] = useState("");
  const [selectedMentor2, setSelectedMentor2] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [stage, setStage] = useState("");
  const { data: session } = useSession();
  const [hatchingData, setHatchingData] = useState([]); // State to store hatching data

  const handleChange = (event) => {
    setStage(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = hatchingData.filter(
      (row) =>
        row.team_name.toLowerCase().includes(query.toLowerCase()) ||
        row.members.some(
          (member) =>
            member.name.toLowerCase().includes(query.toLowerCase()) ||
            member.nim.toLowerCase().includes(query.toLowerCase())
        ) ||
        (selectedMentor1 === "" && row.mentor_1 === selectedMentor1) ||
        (selectedMentor2 === "" && row.mentor_2 === selectedMentor2)
    );
    setFilteredData(filtered);
    setPage(0);
  };

  const handleDospem1Change = (event) => {
    const mentor_1 = event.target.value;
    setSelectedMentor1(mentor_1);
    const filtered = hatchingData.filter(
      (row) =>
        row.team_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (mentor_1 === "" || row.mentor_1 === mentor_1) &&
        (selectedMentor2 === "" || row.mentor_2 === selectedMentor2)
    );
    setFilteredData(filtered);
    setPage(0);
  };

  const handleDospem2Change = (event) => {
    const mentor_2 = event.target.value;
    setSelectedMentor2(mentor_2);
    const filtered = hatchingData.filter(
      (row) =>
        row.team_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedMentor1 === "" || row.mentor_1 === selectedMentor1) &&
        (mentor_2 === "" || row.mentor_2 === mentor_2)
    );
    setFilteredData(filtered);
    setPage(0);
  };

  useEffect(() => {
    async function fetchHatchingData() {
      try {
        const params = new URLSearchParams({
          stage,
          mentor1_nik: selectedMentor1,
          mentor2_nik: selectedMentor2,
        });
        const response = await fetch(`${API_URL}/hatching/detail?${params}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHatchingData(data.data.hatching);
        } else {
          console.error("Failed to fetch hatching data");
        }
      } catch (error) {
        console.error("An error occurred while fetching hatching data", error);
      }
    }

    fetchHatchingData();
  }, [session, stage, selectedMentor1, selectedMentor2]);

  const dataToRender =
    searchQuery || selectedMentor1 || selectedMentor2
      ? filteredData
      : hatchingData;

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[200],
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 0;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div className="space-y-[20px]">
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        fullWidth
      />
      <div className="flex items-center gap-16">
        <Link
          href="/hatching"
          className="flex bg-primary items-center gap-2 px-3 py-2 rounded-2xl"
        >
          <Image src={add} alt="add" />
          <p className="text-white font-semibold">Add New</p>
        </Link>
        <div className="items-center text-base font-semibold flex gap-4">
          Pilih Stage :
          <Select
            MenuProps={MenuProps}
            value={stage}
            onChange={handleChange}
            variant="outlined"
            displayEmpty
            style={{
              width: 150,
            }}
          >
            <MenuItem value="">Semua Stage</MenuItem>
            <MenuItem value={1}>Stage 1</MenuItem>
            <MenuItem value={2}>Stage 2</MenuItem>
            <MenuItem value={3}>Stage 3</MenuItem>
            <MenuItem value={4}>Stage 4</MenuItem>
            <MenuItem value={5}>Stage 5</MenuItem>
            <MenuItem value={6}>Stage 6</MenuItem>
            <MenuItem value={7}>Stage 7</MenuItem>
          </Select>
        </div>
      </div>
      <div className="items-center text-base font-semibold flex gap-4">
        Dosen Pembimbing 1 :
        <Select
          MenuProps={MenuProps}
          value={selectedMentor1}
          onChange={handleDospem1Change}
          displayEmpty
          variant="outlined"
          style={{
            width: 540,
          }}
        >
          <MenuItem value="">Semua Dosen</MenuItem>
          <MenuItem value="Pak Aji">Pak Aji</MenuItem>
          <MenuItem value="Pak Irawan">Pak Irawan</MenuItem>
          <MenuItem value="Pak Irvan">Pak Irvan</MenuItem>
        </Select>
      </div>
      <div className="items-center text-base font-semibold flex gap-4">
        Dosen Pembimbing 2 :
        <Select
          MenuProps={MenuProps}
          value={selectedMentor2}
          onChange={handleDospem2Change}
          displayEmpty
          variant="outlined"
          style={{
            width: 540,
          }}
        >
          <MenuItem value="">Semua Dosen</MenuItem>
          <MenuItem value="Pak Aji">Pak Aji</MenuItem>
          <MenuItem value="Pak Irawan">Pak Irawan</MenuItem>
          <MenuItem value="Pak Irvan">Pak Irvan</MenuItem>
        </Select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Kelompok</TableCell>
              <TableCell>Anggota Kelompok</TableCell>
              <TableCell>Dosen Pembimbing 1</TableCell>
              <TableCell>Dosen Pembimbing 2</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToRender
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={row.team_numb}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.team_name}</TableCell>
                  <TableCell>
                    {row.members.map((member, index) => (
                      <div key={index}>
                        {member.name} ({member.nim})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{row.mentor_1}</TableCell>
                  <TableCell>{row.mentor_2}</TableCell>
                  <TableCell>
                    <Link href={`/hatching/detail/${row.team_numb}`}>
                      <a>
                        <button className="bg-primary text-white font-semibold px-4 py-1 rounded-lg focus:outline-none hover:bg-secondary">
                          Detail
                        </button>
                      </a>
                    </Link>
                    <Link href={`/hatching/edit/${row.team_numb}`}>
                      <a>
                        <button className="bg-yellow-500 text-white font-semibold px-4 py-1 rounded-lg focus:outline-none ml-2 hover:bg-yellow-600">
                          Edit
                        </button>
                      </a>
                    </Link>
                    <Link href={`/hatching/delete/${row.team_numb}`}>
                      <a>
                        <button className="bg-red-500 text-white font-semibold px-4 py-1 rounded-lg focus:outline-none ml-2 hover:bg-red-600">
                          Delete
                        </button>
                      </a>
                    </Link>
                    <a href="#">
                      <Image src={excel} alt="excel" />
                    </a>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataToRender.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
