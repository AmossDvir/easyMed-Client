import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";

const Suggestions = ({ data }) => {
  const renderedRows =
    data.length > 0 ? (
      data.map((row) => {
        return (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.min_till_doctor}</TableCell>
            <TableCell align="right">
              <AccessTimeFilledSharpIcon
                style={{
                  color: `${
                    row.min_till_doctor > 200
                      ? "red"
                      : row.min_till_doctor > 80
                      ? "orange"
                      : "green"
                  }`,
                }}
              ></AccessTimeFilledSharpIcon>
            </TableCell>
            <TableCell align="right">
              {(
                Math.sqrt(
                  Math.pow(row.north_loc - 31773465, 2) +
                    Math.pow(row.east_loc - 35196418, 2)
                ) / 10000
              ).toFixed(4)}
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <div>No Results</div>
    );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Emergency Room</TableCell>
              <TableCell align="right">Time to Doctor&nbsp;(min)</TableCell>
              <TableCell align="right">
                <AccessTimeFilledSharpIcon></AccessTimeFilledSharpIcon>
              </TableCell>
              <TableCell align="right">Distance&nbsp;(km)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderedRows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Suggestions;
