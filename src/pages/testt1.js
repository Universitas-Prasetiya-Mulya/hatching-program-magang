// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TextField,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useSession } from "next-auth/react";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export default function TablePenilaianDosen() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [stage, setStage] = useState("");
//   const { data: session } = useSession();
//   const [data, setData] = useState([]); // Initialize data as an empty array

//   useEffect(() => {
//     async function fetchListHatching() {
//       const params = new URLSearchParams({
//         stage: "",
//         mentor1_nik: "",
//         mentor2_nik: "",
//       });
//       const response = await fetch(`${API_URL}/hatching/detail?${params}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session?.accessToken}`,
//         },
//       });

//       const result = await response.json();
//       setData(result); // Update the data state with the fetched data
//     }

//     fetchListHatching();
//   }, [stage, session]);

//   const handleChange = (event) => {
//     setStage(event.target.value);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchQueryChange = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);
//     const filtered = data.filter(
//       (row) =>
//         row.name.toLowerCase().includes(query.toLowerCase()) ||
//         row.nim.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredData(filtered);
//     setPage(0);
//   };

//   const dataToRender = searchQuery ? filteredData : data;

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(even)": {
//       backgroundColor: theme.palette.grey[200],
//     },
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));

//   return (
//     <div className="space-y-[20px]">
//       <TextField
//         label="Search"
//         variant="outlined"
//         value={searchQuery}
//         onChange={handleSearchQueryChange}
//         fullWidth
//       />
//       <div className="items-center text-base font-semibold flex gap-4">
//         Show :
//         <Select
//           value={stage}
//           onChange={handleChange}
//           displayEmpty
//           variant="outlined"
//           style={{
//             width: 150,
//           }}
//         >
//           <MenuItem value="">Semua</MenuItem>
//           <MenuItem value="Sudah Dinilai">Sudah Dinilai</MenuItem>
//           <MenuItem value="Belum Dinilai">Belum Dinilai</MenuItem>
//         </Select>
//       </div>
//       <TableContainer style={{ width: "100%" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell
//                 className="border-t-[1px] border-l-[1px]"
//                 rowSpan={3}
//                 style={{
//                   minWidth: 50,
//                   textAlign: "center",
//                   backgroundColor: "#082658",
//                   verticalAlign: "middle",
//                   color: "white",
//                 }}
//               >
//                 No
//               </TableCell>

//               <TableCell
//                 className="border-t-[1px]"
//                 rowSpan={3}
//                 style={{
//                   minWidth: 250,
//                   textAlign: "center",
//                   backgroundColor: "#082658",
//                   verticalAlign: "middle",
//                   color: "white",
//                 }}
//               >
//                 Nama Mahasiswa
//               </TableCell>
//               <TableCell
//                 className="border-t-[1px]"
//                 rowSpan={3}
//                 style={{
//                   minWidth: 250,
//                   textAlign: "center",
//                   backgroundColor: "#082658",
//                   verticalAlign: "middle",
//                   color: "white",
//                 }}
//               >
//                 NIM
//               </TableCell>

//               <TableCell
//                 className="border-t-[1px] border-r-[1px]"
//                 colSpan={14}
//                 style={{
//                   height: 50,
//                   minWidth: 2400,
//                   textAlign: "center",
//                   backgroundColor: "#082658",
//                   verticalAlign: "middle",
//                   color: "white",
//                 }}
//               >
//                 Nilai
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell
//                 className="border-l-[1px]"
//                 colSpan={2}
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Stage 1
//               </TableCell>
//               <TableCell
//                 colSpan={2}
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Stage 2
//               </TableCell>
//               <TableCell
//                 colSpan={2}
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Stage 3
//               </TableCell>
//               <TableCell
//                 colSpan={2}
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Stage 4
//               </TableCell>
//               <TableCell
//                 colSpan={2}
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Stage 5
//               </TableCell>
//               <TableCell
//                 colSpan={2}
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Stage 6
//               </TableCell>
//               <TableCell
//                 colSpan={2}
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Stage 7
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Dosen Pembimbing 1
//               </TableCell>
//               <TableCell
//                 style={{
//                   height: 50,
//                   textAlign: "center",
//                   backgroundColor: "#EEF5FF",
//                   verticalAlign: "middle",
//                   color: "black",
//                 }}
//               >
//                 Dosen Pembimbing 2
//               </TableCell>
//               {/* Repeat these cells for each stage and mentor */}
//               {Array.from({ length: 7 }).map((_, stageIndex) => (
//                 <React.Fragment key={stageIndex}>
//                   <TableCell
//                     style={{
//                       textAlign: "center",
//                       backgroundColor: "#EEF5FF",
//                       verticalAlign: "middle",
//                       color: "black",
//                     }}
//                   >
//                     Dosen Pembimbing 1
//                   </TableCell>
//                   <TableCell
//                     style={{
//                       textAlign: "center",
//                       backgroundColor: "#EEF5FF",
//                       verticalAlign: "middle",
//                       color: "black",
//                     }}
//                   >
//                     Dosen Pembimbing 2
//                   </TableCell>
//                 </React.Fragment>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {dataToRender?.length > 0 &&
//               dataToRender
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => (
//                   <StyledTableRow key={row.id_hatching}>
//                     <TableCell
//                       className="border-b-[1px]"
//                       style={{ textAlign: "center" }}
//                     >
//                       {index + 1}
//                     </TableCell>
//                     <TableCell
//                       className="border-b-[1px]"
//                       style={{ textAlign: "center" }}
//                     >
//                       {row.name}
//                     </TableCell>
//                     <TableCell
//                       className="border-b-[1px]"
//                       style={{ textAlign: "center" }}
//                     >
//                       {row.nim}
//                     </TableCell>
//                     {/* Map through the evaluation data for each stage and mentor */}
//                     {Array.from({ length: 7 }).map((_, stageIndex) => (
//                       <React.Fragment key={stageIndex}>
//                         {row.evaluation[stageIndex] ? (
//                           <>
//                             <TableCell
//                               className="border-b-[1px]"
//                               style={{ textAlign: "center" }}
//                             >
//                               {row.evaluation[stageIndex].mentor1_score || "-"}
//                             </TableCell>
//                             <TableCell
//                               className="border-b-[1px]"
//                               style={{ textAlign: "center" }}
//                             >
//                               {row.evaluation[stageIndex].mentor2_score || "-"}
//                             </TableCell>
//                           </>
//                         ) : (
//                           <>
//                             <TableCell
//                               className="border-b-[1px]"
//                               style={{ textAlign: "center" }}
//                             >
//                               -
//                             </TableCell>
//                             <TableCell
//                               className="border-b-[1px]"
//                               style={{ textAlign: "center" }}
//                             >
//                               -
//                             </TableCell>
//                           </>
//                         )}
//                       </React.Fragment>
//                     ))}
//                     {/* Add cells for actions here */}
//                     <TableCell
//                       className="border-b-[1px]"
//                       style={{ textAlign: "center" }}
//                     >
//                       {/* Add action components here */}
//                     </TableCell>
//                   </StyledTableRow>
//                 ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         labelRowsPerPage="Show rows"
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={data && data.length > 0 ? data.length : 0} // Ensure data is defined and not empty
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         style={{
//           backgroundColor: "#082658",
//           color: "white",
//           marginTop: 0,
//         }}
//       />
//     </div>
//   );
// }
