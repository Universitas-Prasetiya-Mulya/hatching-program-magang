import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import Select from "react-select";
import Image from "next/image";
import add from "/public/add.svg";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TablePenilaianAdmin() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [mentorOptions1, setMentorOptions1] = useState([]);
  const [mentorOptions2, setMentorOptions2] = useState([]);
  const [selectedMentor1, setSelectedMentor1] = useState("");
  const [selectedMentor2, setSelectedMentor2] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [stageOptions, setStageOptions] = useState([]);

  useEffect(() => {
    async function fetchListHatching() {
      console.log("Request Headers:", {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      });

      const params = new URLSearchParams({
        stage: "",
        mentor1_nik: "",
        mentor2_nik: "",
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

      const result = await response.json();
      setData(result?.data?.hatching);

      const uniqueStages = Array.from(
        new Set(
          result?.data?.hatching
            ?.flatMap((team) => team.members.map((member) => member.evaluation))
            .flat()
            .map((evaluation) => evaluation.stage)
        )
      );

      const stageOptions = uniqueStages.map((stage) => ({
        value: stage,
        label: `Stage ${stage}`,
      }));

      setStageOptions(stageOptions);
    }

    fetchListHatching();
  }, [session]);

  useEffect(() => {
    async function fetchMentorOptions1() {
      const response = await fetch(`${API_URL}/master/mentor?id_role=2`, {
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
      if (data?.data?.mentors) {
        const options = data.data.mentors.map((mentor) => ({
          value: mentor.name,
          label: mentor.name,
        }));
        setMentorOptions1(options);
      }
    }

    fetchMentorOptions1();
  }, [session]);

  useEffect(() => {
    async function fetchMentorOptions2() {
      const response = await fetch(`${API_URL}/master/mentor?id_role=3`, {
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

      const options = data?.data?.mentors.map((mentor) => ({
        value: mentor.name,
        label: mentor.name,
      }));
      setMentorOptions2(options);
    }

    fetchMentorOptions2();
  }, [session]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const filteredData = data?.filter((row) => {
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      (selectedStage === "" || row.team_numb === selectedStage) &&
      (selectedMentor1 === "" || row.mentor_1 === selectedMentor1) &&
      (selectedMentor2 === "" || row.mentor_2 === selectedMentor2) &&
      (row.team_name.toLowerCase().includes(searchQueryLower) ||
        row.team_numb.toString().toLowerCase().includes(searchQueryLower) ||
        row.mentor_1.toLowerCase().includes(searchQueryLower) ||
        row.mentor_2.toLowerCase().includes(searchQueryLower) ||
        row.members.some((member) =>
          member.name.toLowerCase().includes(searchQueryLower)
        ) ||
        row.members.some((member) =>
          member.nim.toString().toLowerCase().includes(searchQueryLower)
        ))
    );
  });

  const handleMentor1Change = (selectedOption) => {
    setSelectedMentor1(selectedOption?.value || "");
  };

  const handleMentor2Change = (selectedOption) => {
    setSelectedMentor2(selectedOption?.value || "");
  };

  const handleStageChange = (selectedOption) => {
    setSelectedStage(selectedOption?.value || "");
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[200],
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="space-y-[20px]">
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
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
          Pilih Stage:
          <Select
            options={stageOptions}
            isSearchable={true}
            isClearable={true}
            placeholder="Select Stage"
            styles={{
              control: (provided) => ({
                ...provided,
                width: 200,
                height: 50,
              }),
            }}
            onChange={handleStageChange}
          />
        </div>
      </div>
      <div className="items-center text-base font-semibold flex gap-4">
        Dosen Pembimbing 1:
        <Select
          isSearchable={true}
          isClearable={true}
          options={mentorOptions1}
          displayEmpty
          variant="outlined"
          styles={{
            control: (provided) => ({
              ...provided,
              width: 540,
              height: 50,
            }),
          }}
          onChange={handleMentor1Change}
        />
      </div>
      <div className="items-center text-base font-semibold flex gap-4">
        Dosen Pembimbing 2:
        <Select
          isSearchable={true}
          isClearable={true}
          options={mentorOptions2}
          displayEmpty
          variant="outlined"
          styles={{
            control: (provided) => ({
              ...provided,
              width: 540,
              height: 50,
            }),
          }}
          onChange={handleMentor2Change}
        />
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="border-t-[1px] border-l-[1px]"
                  rowSpan={3}
                  style={{
                    minWidth: 50,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  No
                </TableCell>
                <TableCell
                  className="border-t-[1px]"
                  rowSpan={3}
                  style={{
                    minWidth: 250,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  No Kelompok
                </TableCell>
                <TableCell
                  className="border-t-[1px]"
                  rowSpan={3}
                  style={{
                    minWidth: 250,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  Nama Kelompok
                </TableCell>
                <TableCell
                  className="border-t-[1px]"
                  rowSpan={1.5}
                  colSpan={2.5}
                  style={{
                    minWidth: 500,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  Dosen Pembimbing
                </TableCell>
                <TableCell
                  className="border-t-[1px]"
                  rowSpan={3}
                  style={{
                    minWidth: 250,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  Nama Mahasiswa
                </TableCell>
                <TableCell
                  className="border-t-[1px]"
                  rowSpan={3}
                  style={{
                    minWidth: 250,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  NIM
                </TableCell>
                <TableCell
                  className="border-t-[1px]"
                  rowSpan={1.5}
                  colSpan={2.5}
                  style={{
                    minWidth: 500,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  Dosen Pembimbing
                </TableCell>

                <TableCell
                  className="border-t-[1px] border-r-[1px]"
                  colSpan={14}
                  style={{
                    height: 50,
                    minWidth: 2400,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  Nilai
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  rowSpan={2.5}
                  style={{
                    height: 100,
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Dosen Pembimbing 1
                </TableCell>
                <TableCell
                  rowSpan={2.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Dosen Pembimbing 2
                </TableCell>
                <TableCell
                  className="border-l-[1px]"
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Stage 1
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Stage 2
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Stage 3
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Stage 4
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Stage 5
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Stage 6
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 58,
                  }}
                >
                  Stage 7
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 1
                </TableCell>
                <TableCell
                  style={{
                    height: 50,
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 2
                </TableCell>

                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 1
                </TableCell>
                <TableCell
                  style={{
                    height: 50,
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 2
                </TableCell>

                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 1
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 2
                </TableCell>

                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 1
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 2
                </TableCell>

                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 1
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 2
                </TableCell>

                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 1
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 2
                </TableCell>

                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 1
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    top: 80,
                    backgroundColor: "#EEF5FF",
                    verticalAlign: "middle",
                    color: "black",
                    top: 114,
                  }}
                >
                  Dosen Pembimbing 2
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData
                  .slice(startIndex, startIndex + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={row.id || index}>
                      <TableCell
                        className="border-b-[1px]"
                        style={{ textAlign: "center" }}
                      >
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell
                        className="border-b-[1px]"
                        style={{ textAlign: "center" }}
                      >
                        {row.team_numb}
                      </TableCell>
                      <TableCell
                        className="border-b-[1px]"
                        style={{ textAlign: "center" }}
                      >
                        {row.team_name}
                      </TableCell>
                      <TableCell
                        className="border-b-[1px]"
                        style={{ textAlign: "center" }}
                      >
                        {row.mentor_1}
                      </TableCell>
                      <TableCell
                        className="border-b-[1px]"
                        style={{ textAlign: "center" }}
                      >
                        {row.mentor_2}
                      </TableCell>
                      <TableCell
                        className="border-b-[1px]"
                        style={{ textAlign: "center" }}
                      >
                        <div style={{ display: "grid", rowGap: "20px" }}>
                          {row.members.map((member) => (
                            <div key={member.nim}>{member.name}</div>
                          ))}
                        </div>
                      </TableCell>

                      <TableCell
                        className="border-b-[1px]"
                        style={{ textAlign: "center" }}
                      >
                        <div style={{ display: "grid", rowGap: "20px" }}>
                          {row.members.map((member) => (
                            <div key={member.nim}>{member.nim}</div>
                          ))}
                        </div>
                      </TableCell>

                      {Array.from({ length: 7 }, (_, stage) => (
                        <React.Fragment key={stage}>
                          <TableCell
                            className="border-b-[1px]"
                            style={{ textAlign: "center" }}
                          >
                            <div style={{ display: "grid", rowGap: "20px" }}>
                              {row.members.map((member) => (
                                <div key={member.nim}>
                                  {member.evaluation[stage]?.mentor1_score ||
                                    "-"}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell
                            className="border-b-[1px]"
                            style={{ textAlign: "center" }}
                          >
                            <div style={{ display: "grid", rowGap: "20px" }}>
                              {row.members.map((member) => (
                                <div key={member.nim}>
                                  {member.evaluation[stage]?.mentor2_score ||
                                    "-"}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </React.Fragment>
                      ))}
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        {Array.isArray(filteredData) && filteredData.length > 0 && (
          <TablePagination
            labelRowsPerPage="Show rows"
            rowsPerPageOptions={[10, 50, 100]}
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
