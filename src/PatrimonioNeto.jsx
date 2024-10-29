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
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {titulo}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#ffeb3b", marginBottom: 4, borderRadius: 5 }}
      >
        <Table
          sx={{
            minWidth: 700,
            fontSize: "1.5rem",
            width: "800px",
            "& .MuiTableCell-root": {
              borderColor: "black", // Aplica color negro a las líneas de celda
              borderWidth: "1px", // Ajusta el grosor de las líneas
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  textAlign: "center",
                }}
              >
                Activos
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  textAlign: "center",
                }}
              >
                Pasivos
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  textAlign: "center",
                }}
              >
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
