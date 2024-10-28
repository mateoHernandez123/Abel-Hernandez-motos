import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

// Componente PatrimonioNeto
const PatrimonioNeto = ({ datos, titulo }) => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginTop: 3,
        }}
      >
        {titulo}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#ffeb3b", marginBottom: 4 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Activos
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Pasivos
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Patrimonio Neto
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((fila, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {fila.activos}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {fila.pasivos}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {fila.patrimonioNeto}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PatrimonioNeto;
