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
  Button,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";

const TablaMayor = ({ tipoMayor, datosMayor }) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 30);
  const formattedPastDate = pastDate.toISOString().split("T")[0];

  const [fecha, setFecha] = useState(formattedDate);
  const [tipoOperacion, setTipoOperacion] = useState("");
  const [filtradoDatos, setFiltradoDatos] = useState(datosMayor);
  const { usuarioAutenticado, deslogear, IP, tokenError } = useContext(Context);

  const handleFechaChange = (e) => setFecha(e.target.value);
  const handleTipoOperacionChange = (e) => setTipoOperacion(e.target.value);

  useEffect(() => {
    handleFiltrar();
  }, [fecha, tipoOperacion]);

  const handleFiltrar = () => {
    const datosFiltrados = datosMayor.filter((fila) => {
      const fechaFila = new Date(fila.fecha.split("/").reverse().join("-"));
      return (
        (fecha
          ? fechaFila.toDateString() === new Date(fecha).toDateString()
          : true) &&
        (tipoOperacion
          ? fila.operacion.toLowerCase().includes(tipoOperacion.toLowerCase())
          : true)
      );
    });
    setFiltradoDatos(datosFiltrados);
  };

  const handleLimpiar = () => {
    setFecha(formattedDate);
    setTipoOperacion("");
    handleFiltrar();
  };

  return (
    <>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#e6e2d5",
          borderRadius: 5,
          margin: "1.2rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            color: "#333",
            textAlign: "center",
          }}
        >
          Mayor de {tipoMayor}
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
            aria-label="tabla mayor"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                  Fecha
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                  Operación
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", fontSize: "1.4rem" }}
                >
                  Debe
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", fontSize: "1.4rem" }}
                >
                  Haber
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", fontSize: "1.4rem" }}
                >
                  Saldo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtradoDatos.map((fila, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: "1.1rem" }}>
                    {fila.fecha}
                  </TableCell>
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
                  {filtradoDatos.length > 0
                    ? filtradoDatos[filtradoDatos.length - 1].saldo.toFixed(2)
                    : "0.00"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TablaMayor;
