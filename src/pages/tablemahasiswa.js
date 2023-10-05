import * as React from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";

import Sheet from "@mui/joy/Sheet";

function createData(
  name,
  nim,
  stage11,
  stage12,
  stage21,
  stage22,
  stage31,
  stage32,
  stage41,
  stage42,
  stage51,
  stage52,
  stage61,
  stage62,
  stage71,
  stage72
) {
  return {
    name,
    nim,
    stage11,
    stage12,
    stage21,
    stage22,
    stage31,
    stage32,
    stage41,
    stage42,
    stage51,
    stage52,
    stage61,
    stage62,
    stage71,
    stage72,
  };
}

const rows = [
  createData(
    "Melvin Yusuf Adrea",
    "F2300801",
    "A",
    "B",
    "A",
    "B",
    "A",
    "B",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"
  ),
];

export default function TableMahasiswa() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  return (
    <Box sx={{ width: "100%" }}>
      <Sheet
        sx={{
          "--TableCell-height": "40px",
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          height: 220,
          overflow: "auto",
          backgroundSize:
            "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
          backgroundColor: "background.surface",
        }}
      >
        <Table stickyHeader borderAxis="bothBetween">
          <thead>
            <tr>
              <th
                className="border-t-[1px]"
                rowSpan={3}
                style={{
                  width: 250,
                  textAlign: "center",
                  backgroundColor: "#082658",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Nama Mahasiswa
              </th>
              <th
                className="border-t-[1px]"
                rowSpan={3}
                style={{
                  width: 150,
                  textAlign: "center",
                  left: 10,
                  backgroundColor: "#082658",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                NIM
              </th>
              <th
                className="border-t-[1px]"
                colSpan={14}
                style={{
                  width: 2400,
                  textAlign: "center",
                  backgroundColor: "#082658",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Nilai
              </th>
            </tr>
            <tr>
              <th
                className="border-l-[1px]"
                colSpan={2}
                style={{
                  textAlign: "center",
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Stage 1
              </th>
              <th
                colSpan={2}
                style={{
                  textAlign: "center",
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Stage 2
              </th>
              <th
                colSpan={2}
                style={{
                  textAlign: "center",
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Stage 3
              </th>
              <th
                colSpan={2}
                style={{
                  textAlign: "center",
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Stage 4
              </th>
              <th
                colSpan={2}
                style={{
                  textAlign: "center",
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Stage 5
              </th>
              <th
                colSpan={2}
                style={{
                  textAlign: "center",
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Stage 6
              </th>
              <th
                className="border-r-[1px]"
                colSpan={2}
                style={{
                  textAlign: "center",
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Stage 7
              </th>
            </tr>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 1
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 2
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 1
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 2
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 1
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 2
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 1
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 2
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 1
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 2
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 1
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 2
              </th>
              <th
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 1
              </th>
              <th
                className="border-r-[1px]"
                style={{
                  textAlign: "center",
                  top: 80,
                  backgroundColor: "#EEF5FF",
                  color: "black",
                }}
              >
                Dosen Pembimbing 2
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td className="border-l-[1px] border-b-[1px]" style={{ textAlign: "center", height: "80px"}}>{row.name}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.nim}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage11}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage12}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage21}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage22}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage31}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center", alignItems: "center" }}>
                  {row.stage32}
                </td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage41}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage42}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage51}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage52}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage61}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage62}</td>
                <td className="border-b-[1px]" style={{ textAlign: "center" }}>{row.stage71}</td>
                <td className="border-b-[1px] border-r-[1px]" style={{ textAlign: "center" }}>{row.stage72}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}
