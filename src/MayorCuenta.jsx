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
  MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";
import Swal from "sweetalert2";

const MayorCuenta = () => {
  const { usuarioAutenticado, deslogear, IP, tokenError } = useContext(Context);

  // Fechas iniciales
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 30);
  const formattedPastDate = pastDate.toISOString().split("T")[0];
  const formatFecha = (fechaString) => {
    const [year, month, day] = fechaString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Estados
  const [fechaDesde, setFechaDesde] = useState(formattedPastDate);
  const [fechaHasta, setFechaHasta] = useState(formattedDate);
  const [tipoOperacion, setTipoOperacion] = useState("");
  const [filtradoDatos, setFiltradoDatos] = useState([]);
  const [cuentasHojas, setCuentasHojas] = useState([]); // Almacena las cuentas disponibles

  // Obtener la lista de todas las cuentas hojas al cargar el componente
  useEffect(() => {
    const fetchCuentasHojas = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const response = await fetch(`${IP}/api/cuentas/obtenerhojas`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resultado = await response.json();

        if (resultado.AuthErr) {
          tokenError(resultado.MENSAJE);
        } else if (resultado.ServErr) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: resultado.MENSAJE,
          });
        } else {
          setCuentasHojas(resultado.Hojas || []);
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Error en la carga de datos. Recargar la página",
          icon: "warning",
        });
      }
    };

    fetchCuentasHojas();
  }, [IP, tokenError]);

  // Función para ejecutar la petición al hacer clic en "Filtrar"
  const handleFiltrar = async () => {
    if (fechaDesde && fechaHasta && tipoOperacion) {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const response = await fetch(`${IP}/api/libromayor`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FecDesde: fechaDesde,
            FecHasta: fechaHasta,
            Codigo: tipoOperacion,
          }),
        });

        const data = await response.json();

        if (data.AuthErr) {
          tokenError(data.MENSAJE);
        } else if (data.ServErr) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.MENSAJE,
          });
        } else {
          setFiltradoDatos(data.Libro || []);
          console.log(filtradoDatos);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error al cargar las cuentas raíces",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        icon: "warning",
        text: "Por favor, seleccione fechas y una cuenta antes de filtrar.",
      });
    }
  };

  // Función para limpiar los filtros
  const handleLimpiar = () => {
    setFechaDesde(formattedPastDate);
    setFechaHasta(formattedDate);
    setTipoOperacion("");
    setFiltradoDatos([]);
  };

  // Función para obtener el nombre de la cuenta según el código seleccionado
  const getNombreCuenta = () => {
    const cuentaSeleccionada = cuentasHojas.find(
      (cuenta) => cuenta.codigo === tipoOperacion
    );
    return cuentaSeleccionada ? cuentaSeleccionada.nombre : "";
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          color: "#333",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Lista de Libro Mayor
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Fecha Desde"
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 2, backgroundColor: "#ffeb3b", borderRadius: 2 }}
        />
        <TextField
          label="Fecha Hasta"
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 2, backgroundColor: "#ffeb3b", borderRadius: 2 }}
        />
        <TextField
          label="Tipo de Operación"
          select
          value={tipoOperacion}
          onChange={(e) => setTipoOperacion(e.target.value)}
          sx={{
            marginRight: 2,
            backgroundColor: "#ffeb3b",
            borderRadius: 2,
            minWidth: 200,
          }}
        >
          {cuentasHojas.map((cuenta) => (
            <MenuItem key={cuenta.id} value={cuenta.codigo}>
              {`${cuenta.codigo} - ${cuenta.nombre}`}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          onClick={handleFiltrar}
          sx={{
            backgroundColor: "#ffeb3b",
            color: "black",
            borderRadius: "1.2rem",
            marginRight: 2,
          }}
        >
          Filtrar
        </Button>
        <Button
          variant="outlined"
          onClick={handleLimpiar}
          sx={{
            backgroundColor: "#ffeb3b",
            color: "black",
            borderRadius: "1.2rem",
            marginRight: 2,
          }}
        >
          Limpiar
        </Button>
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          marginTop: 5,
          color: "#333",
          textAlign: "center",
        }}
      >
        Mayor de {getNombreCuenta()}
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
            borderColor: "black", // Borde de la tabla en negro
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          aria-label="tabla mayor cuentas"
        >
          <TableHead>
            <TableRow
              sx={{
                borderColor: "black",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  borderColor: "black",
                }}
              >
                Fecha
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  borderColor: "black",
                }}
              >
                Hora
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  borderColor: "black",
                }}
              >
                Operación
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  borderColor: "black",
                }}
              >
                Debe
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  borderColor: "black",
                }}
              >
                Haber
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  borderColor: "black",
                }}
              >
                Saldo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtradoDatos.map((libro, libroIndex) => {
              return libro.filas.map((fila, index) => (
                <TableRow
                  key={`${libroIndex}-${index}`}
                  sx={{
                    borderColor: "black",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  {index === 0 && (
                    <TableCell
                      rowSpan={libro.filas.length}
                      sx={{ fontSize: "1.1rem", borderColor: "black" }}
                    >
                      {new Date(libro.fecha).toLocaleDateString("es-AR")}
                    </TableCell>
                  )}
                  {index === 0 && (
                    <TableCell
                      rowSpan={libro.filas.length}
                      sx={{ fontSize: "1.1rem", borderColor: "black" }}
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
                      borderColor: "black",
                    }}
                  >
                    {fila.nombre}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: "1.1rem", borderColor: "black" }}
                  >
                    {fila.debe !== 0 ? fila.debe.toFixed(2) : ""}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: "1.1rem", borderColor: "black" }}
                  >
                    {fila.haber !== 0 ? fila.haber.toFixed(2) : ""}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: "1.1rem", borderColor: "black" }}
                  >
                    {fila.saldo.toFixed(2)}
                  </TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MayorCuenta;
