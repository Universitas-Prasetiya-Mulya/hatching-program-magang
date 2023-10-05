// Import statements yang diperlukan
import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TableMember() {
  const [startIndex, setStartIndex] = useState(0);
  const { data: session } = useSession();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const router = useRouter();
  const { id_hatching } = router.query;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMemberData = async () => {
      const response = await fetch(
        `${API_URL}/hatching/detail/${id_hatching}`,
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
      const data = await response.json();
      console.log(data);
      setMembers(data?.data?.hatching?.members);
    };

    fetchMemberData();
  }, [id_hatching, session]);

  useEffect(() => {
    console.log("Members:", members); // Tambahkan ini
  }, [members]);

  const columns = [
    { id: "no", label: "No", minWidth: 70, align: "center" },
    { id: "name", label: "Nama", minWidth: 250, align: "center" },
    {
      id: "prodi",
      label: "Prodi",
      minWidth: 300,
      align: "center",
    },
    {
      id: "faculty",
      label: "Fakultas",
      minWidth: 250,
      align: "center",
    },
  ];

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
    <div>
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
              {Array.isArray(members) &&
                members
                  .slice(startIndex, startIndex + rowsPerPage)
                  .map((member, index) => {
                    return (
                      <StyledTableRow key={member.id_member || index}>
                        <TableCell style={{ textAlign: "center" }}>
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {member.name}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {member.prodi}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {member.faculty}
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        {Array.isArray(members) && members.length > 0 && (
          <TablePagination
            labelRowsPerPage="Show rows"
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={members.length}
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
