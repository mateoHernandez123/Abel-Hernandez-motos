import { useState, useEffect, useContext } from "react";
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
import Swal from "sweetalert2";
import { Context } from "./context/Context";

const TablaDiario = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 30);
  const formattedPastDate = pastDate.toISOString().split("T")[0];
  const [fechaDesde, setFechaDesde] = useState(formattedPastDate);
  const [fechaHasta, setFechaHasta] = useState(formattedDate);
  const [filtradoDatos, setFiltradoDatos] = useState([]);
  const [datosLibros, setDatosLibros] = useState([]);
  const [paginas, setPaginas] = useState(0);
  const { usuarioAutenticado, deslogear, IP, tokenError } = useContext(Context);

  const handleFechaDesdeChange = (e) => setFechaDesde(e.target.value);
  const handleFechaHastaChange = (e) => setFechaHasta(e.target.value);

  useEffect(() => {
    //handleFiltrar();
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(`${IP}/api/librodiario`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        FecDesde: fechaDesde,
        FecHasta: fechaHasta,
        Pagina: 1,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.AuthErr) tokenError(result.MENSAJE);
        else if (result.ServErr || result.ERROR) {
          Swal.fire({
            title: result.ERROR ? "Atención" : "Error",
            icon: result.ERROR ? "warning" : "error",
            text: result.MENSAJE,
          });
        } else {
          setDatosLibros(result.Libro);
          setPaginas(result.TotalPaginas);
        }
      })
      .catch(() =>
        Swal.fire(
          "Error",
          "No se pudo enviar la información al servidor",
          "error"
        )
      );
  }, [fechaDesde, fechaHasta]);

  // const handleFiltrar = () => {
  //   const datosFiltrados = datosLibros.filter((fila) => {
  //     const fechaFila = new Date(fila.fecha.split("/").reverse().join("-"));
  //     const desde = fechaDesde ? new Date(fechaDesde) : null;
  //     const hasta = fechaHasta ? new Date(fechaHasta) : null;
  //     return (!desde || fechaFila >= desde) && (!hasta || fechaFila <= hasta);
  //   });
  //   setFiltradoDatos(datosFiltrados);
  // };
  const handleLimpiarFechas = () => {
    setFechaDesde(formattedPastDate);
    setFechaHasta(formattedDate);
    //handleFiltrar();
  };

  const totalDebe = datosLibros.reduce(
    (acc, libro) =>
      acc + libro.filas.reduce((accFila, fila) => accFila + fila.debe, 0),
    0
  );

  const totalHaber = datosLibros.reduce(
    (acc, libro) =>
      acc + libro.filas.reduce((accFila, fila) => accFila + fila.haber, 0),
    0
  );

  const formatearFecha = (fecha) => {
    const [year, month, day] = fecha.split("-"); // Suponiendo que la fecha está en formato "aaaa-mm-dd"
    return `${day}/${month}/${year}`; // Devuelve la fecha en formato "dd/mm/aaaa"
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#e6e2d5", borderRadius: 5 }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          color: "#333",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Lista de Libro Diario
      </Typography>

      <Box display="flex" justifyContent="center" mb={2} mt={4}>
        <TextField
          label="Fecha Desde"
          type="date"
          value={fechaDesde}
          onChange={handleFechaDesdeChange}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 2, backgroundColor: "#ffeb3b", borderRadius: 2 }}
        />

        <TextField
          label="Fecha Hasta"
          type="date"
          value={fechaHasta}
          onChange={handleFechaHastaChange}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 2, backgroundColor: "#ffeb3b", borderRadius: 2 }}
        />

        {/* <Button
          variant="contained"
          // onClick={handleFiltrar}
          sx={{
            backgroundColor: "#ffeb3b",
            color: "black",
            borderRadius: "1.2rem",
          }}
        >
          Filtrar
        </Button> */}

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
          aria-label="tabla libro diario"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                Fecha
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                Hora
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
            </TableRow>
          </TableHead>
          <TableBody>
            {datosLibros.map((libro, libroIndex) => {
              return libro.filas.map((fila, index) => (
                <TableRow key={`${libroIndex}-${index}`}>
                  {index === 0 && (
                    <TableCell
                      rowSpan={libro.filas.length}
                      sx={{ fontSize: "1.1rem" }}
                    >
                      {formatearFecha(libro.fecha)}
                    </TableCell>
                  )}
                  {index === 0 && (
                    <TableCell
                      rowSpan={libro.filas.length}
                      sx={{ fontSize: "1.1rem" }}
                    >
                      {new Date(`1970-01-01T${libro.hora}`).toLocaleTimeString(
                        "es-AR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </TableCell>
                  )}

                  <TableCell
                    sx={{
                      fontSize: "1.1rem",
                      paddingLeft: fila.haber ? "30px" : "0px",
                    }}
                  >
                    {fila.nombre}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                    {fila.debe !== 0 ? fila.debe.toFixed(2) : ""}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                    {fila.haber !== 0 ? fila.haber.toFixed(2) : ""}
                  </TableCell>
                </TableRow>
              ));
            })}
            <TableRow>
              <TableCell
                colSpan={3}
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TablaDiario;
