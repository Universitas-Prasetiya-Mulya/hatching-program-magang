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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import PopupEdit from "./popupedit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TablePenilaianDosen() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);

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
    }

    fetchListHatching();
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

  const handleUpdateData = (updatedData) => {
    const updatedDataArray = [...data];
    const indexToUpdate = updatedDataArray.findIndex(
      (item) => item.id_hatching === updatedData.id_hatching
    );
    if (indexToUpdate !== -1) {
      const memberToUpdate = updatedDataArray[indexToUpdate].members.findIndex(
        (member) => member.id_member === updatedData.id_member
      );
      if (memberToUpdate !== -1) {
        if (updatedData.mentor === "mentor1") {
          updatedDataArray[indexToUpdate].members[memberToUpdate].evaluation[
            updatedData.stage - 1
          ].mentor1_score = updatedData.mentor1_score;
        }
        if (updatedData.mentor === "mentor2") {
          console.log("Updating mentor2_score");
          updatedDataArray[indexToUpdate].members[memberToUpdate].evaluation[
            updatedData.stage - 1
          ].mentor2_score = updatedData.mentor2_score;
        }
      }
      setData(updatedDataArray);
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
  console.log(data);
  return (
    <div className="space-y-[20px]">
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
                <TableCell
                  className="border-t-[1px]"
                  rowSpan={3}
                  style={{
                    minWidth: 200,
                    textAlign: "center",
                    backgroundColor: "#082658",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
              <TableRow>
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
              {data &&
                data
                  .slice(startIndex, startIndex + rowsPerPage)
                  .map((row, index) => (
                    <React.Fragment key={row.id_hatching || index}>
                      {row.members.map((member, i) => (
                        <StyledTableRow key={row.id_hatching || index}>
                          <TableCell
                            className="border-b-[1px]"
                            style={{ textAlign: "center" }}
                          >
                            {i + 1} {row.id_hatching}
                          </TableCell>
                          <TableCell
                            className="border-b-[1px]"
                            style={{ textAlign: "center" }}
                          >
                            {member.name}
                          </TableCell>
                          <TableCell
                            className="border-b-[1px]"
                            style={{ textAlign: "center" }}
                          >
                            {member.nim}
                          </TableCell>
                          {Array.from({ length: 7 }, (_, stage) => (
                            <React.Fragment key={stage}>
                              <TableCell
                                className="border-b-[1px]"
                                style={{ textAlign: "center" }}
                              >
                                <div className="flex place-content-center gap-2">
                                  {member.evaluation[stage]?.mentor1_score}
                                  <PopupEdit
                                    data={{
                                      id_hatching: row.id_hatching,
                                      id_member: member?.id_member,
                                      stage: stage + 1,
                                      mentor1_score:
                                        member.evaluation[stage]?.mentor1_score,
                                    }}
                                    onUpdate={handleUpdateData}
                                  />
                                </div>
                              </TableCell>
                              <TableCell
                                className="border-b-[1px]"
                                style={{ textAlign: "center" }}
                              >
                                <div className="flex place-content-center gap-3">
                                  {member.evaluation[stage]?.mentor2_score}
                                  <PopupEdit
                                    data={{
                                      id_hatching: row.id_hatching,
                                      id_member: member?.id_member,
                                      stage: stage + 1,
                                      mentor2_score:
                                        member.evaluation[stage]?.mentor2_score,
                                    }}
                                    onUpdate={handleUpdateData}
                                  />
                                </div>
                              </TableCell>
                            </React.Fragment>
                          ))}

                          <TableCell
                            className="border-b-[1px]"
                            style={{ textAlign: "center" }}
                          >
                            <button className="bg-green-400 text-white rounded-xl py-2 px-10">
                              Lulus
                            </button>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </React.Fragment>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        {Array.isArray(data) && data.length > 0 && (
          <TablePagination
            labelRowsPerPage="Show rows"
            rowsPerPageOptions={[10, 50, 100]}
            component="div"
            count={data?.length}
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
