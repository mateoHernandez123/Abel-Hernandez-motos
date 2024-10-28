import { useState, useEffect } from "react";
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
  TextField,
  Button,
} from "@mui/material";

const TablaDiario = ({ datosLibro }) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  // Calcular fecha 30 días atrás
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 30); // Restar 30 días
  const formattedPastDate = pastDate.toISOString().split("T")[0];
  const [fechaDesde, setFechaDesde] = useState(formattedPastDate);
  const [fechaHasta, setFechaHasta] = useState(formattedDate);
  const [filtradoDatos, setFiltradoDatos] = useState([]);

  const handleFechaDesdeChange = (e) => {
    setFechaDesde(e.target.value);
  };

  const handleFechaHastaChange = (e) => {
    setFechaHasta(e.target.value);
  };

  // Ejecutar el filtro automáticamente al cargar la página
  useEffect(() => {
    handleFiltrar();
  }, [datosLibro, fechaDesde, fechaHasta]); // Ejecuta cuando cambien las fechas o datosLibro

  const handleFiltrar = () => {
    const datosFiltrados = datosLibro.filter((fila) => {
      const fechaFila = new Date(fila.fecha.split("/").reverse().join("-"));
      const desde = fechaDesde ? new Date(fechaDesde) : null;
      const hasta = fechaHasta ? new Date(fechaHasta) : null;

      return (!desde || fechaFila >= desde) && (!hasta || fechaFila <= hasta);
    });
    setFiltradoDatos(datosFiltrados);
  };

  // Función para limpiar las fechas
  const handleLimpiarFechas = () => {
    setFechaDesde(formattedPastDate);
    setFechaHasta(formattedDate); // Resetea fechaHasta al valor actual
    handleFiltrar(); // Restablece los datos
  };

  // Agrupar operaciones por número, fecha y tipo
  const operacionesAgrupadas = {};

  filtradoDatos.forEach((fila) => {
    const clave = `${fila.numero}-${fila.fecha}-${fila.tipo}`;
    if (!operacionesAgrupadas[clave]) {
      operacionesAgrupadas[clave] = {
        numero: fila.numero,
        fecha: fila.fecha,
        tipo: fila.tipo,
        operaciones: [],
      };
    }
    operacionesAgrupadas[clave].operaciones.push(fila);
  });

  // Convertir el objeto a un array para su uso en el render
  const grupos = Object.values(operacionesAgrupadas);

  // Calcular la sumatoria de Debe y Haber
  const totalDebe = filtradoDatos.reduce((acc, fila) => acc + fila.debe, 0);
  const totalHaber = filtradoDatos.reduce((acc, fila) => acc + fila.haber, 0);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Lista de Libro Diario
      </Typography>

      {/* Inputs para Fecha Desde y Fecha Hasta */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Fecha Desde"
          type="date"
          value={fechaDesde}
          onChange={handleFechaDesdeChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: 2 }}
        />

        <TextField
          label="Fecha Hasta"
          type="date"
          value={fechaHasta}
          onChange={handleFechaHastaChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleFiltrar}
          sx={{
            backgroundColor: "#ffeb3b",
            color: "black",
            borderRadius: "1.2rem",
          }}
        >
          Filtrar
        </Button>

        {/* Botón para limpiar las fechas */}
        <Button
          variant="outlined"
          onClick={handleLimpiarFechas}
          sx={{
            backgroundColor: "#ffeb3b",
            color: "black",
            borderRadius: "1.2rem",
          }}
        >
          Limpiar
        </Button>
      </Box>

      {/* Tabla de Datos */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#ffeb3b", marginBottom: 4 }}
      >
        <Table
          sx={{ minWidth: 700, fontSize: "1.4rem" }}
          aria-label="tabla libro diario"
        >
          <TableHead>
            <TableRow>
              {/* <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                N°
              </TableCell> */}
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
              {/* <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Tipo
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {grupos.map((grupo, grupoIndex) => {
              return grupo.operaciones.map((fila, index) => (
                <TableRow key={`${grupoIndex}-${index}`}>
                  {/* {index === 0 && (
                    <TableCell
                      rowSpan={grupo.operaciones.length}
                      sx={{ fontSize: "1.1rem" }}
                    >
                      {grupo.numero}
                    </TableCell>
                  )} */}
                  {index === 0 && (
                    <TableCell
                      rowSpan={grupo.operaciones.length}
                      sx={{ fontSize: "1.1rem" }}
                    >
                      {grupo.fecha}
                    </TableCell>
                  )}
                  <TableCell
                    sx={{
                      fontSize: "1.1rem",
                      paddingLeft: fila.haber ? "30px" : "0px",
                    }}
                  >
                    {fila.operacion}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                    {fila.debe !== 0 ? fila.debe.toFixed(2) : ""}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                    {fila.haber !== 0 ? fila.haber.toFixed(2) : ""}
                  </TableCell>
                  {/* {index === 0 && (
                    <TableCell
                      rowSpan={grupo.operaciones.length}
                      sx={{ fontSize: "1.1rem" }}
                    >
                      {grupo.tipo}
                    </TableCell>
                  )} */}
                </TableRow>
              ));
            })}
            {/* Fila Total */}
            <TableRow>
              <TableCell
                colSpan={2}
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Total
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                {totalDebe.toFixed(2)}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                {totalHaber.toFixed(2)}
              </TableCell>
              <TableCell sx={{ fontSize: "1.1rem" }}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TablaDiario;
