import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TablaMayor = ({ tipoMayor, datosMayor }) => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Título del mayor */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Mayor de {tipoMayor}
      </Typography>

      {/* Tabla del mayor */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#ffeb3b", marginBottom: 4 }}
      >
        <Table
          sx={{ minWidth: 700, fontSize: "1.4rem" }}
          aria-label="tabla mayor"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Fecha
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Operación
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Debe
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Haber
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Saldo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosMayor.map((fila, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "1.1rem" }}>{fila.fecha}</TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {fila.operacion}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                  {fila.debe !== 0 ? fila.debe.toFixed(2) : ""}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                  {fila.haber !== 0 ? fila.haber.toFixed(2) : ""}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                  {fila.saldo.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {/* Fila de saldo final */}
            <TableRow>
              <TableCell
                colSpan={4}
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Saldo final
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                {datosMayor[datosMayor.length - 1].saldo.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TablaMayor;
