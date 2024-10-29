import TablaMayor from "./TablaMayor";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";
import Swal from "sweetalert2";

const ListaMayores = () => {
  const { usuarioAutenticado, deslogear, IP, tokenError } = useContext(Context);

  // Fechas iniciales
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 30);
  const formattedPastDate = pastDate.toISOString().split("T")[0];

  // Estados
  const [fechaDesde, setFechaDesde] = useState(formattedPastDate);
  const [fechaHasta, setFechaHasta] = useState(formattedDate);
  const [tipoOperacion, setTipoOperacion] = useState("");
  const [filtradoDatos, setFiltradoDatos] = useState([]);
  const [paginas, setPaginas] = useState(0);
  const [cuenta, setCuenta] = useState("");
  const [filaInicial, setFilaInicial] = useState(0);

  // Función para manejar el cambio de fecha
  const handleFechaChange = (e) => setFechaDesde(e.target.value);

  // Función para manejar el cambio de tipo de operación
  const handleTipoOperacionChange = (e) => setTipoOperacion(e.target.value);

  // Función para limpiar filtros
  const handleLimpiar = () => {
    setFechaDesde(formattedPastDate);
    setFechaHasta(formattedDate);
    setTipoOperacion("");
    handleFiltrar();
  };

  // // Función para filtrar datos
  // const handleFiltrar = () => {
  //   const datosFiltrados = datosMayorCaja.filter((fila) => {
  //     const fechaFila = new Date(fila.fecha.split("/").reverse().join("-"));
  //     return (
  //       (fechaDesde
  //         ? fechaFila.toDateString() === new Date(fechaDesde).toDateString()
  //         : true) &&
  //       (tipoOperacion
  //         ? fila.operacion.toLowerCase().includes(tipoOperacion.toLowerCase())
  //         : true)
  //     );
  //   });
  //   setFiltradoDatos(datosFiltrados);
  // };

  // Simular la petición para obtener datos del libro mayor
  useEffect(() => {
    const fetchData = async () => {
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
            fechaHasta: fechaHasta,
            Pagina: 1,
            Codigo: cuenta,
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
          setFiltradoDatos(data.Libro);
          setPaginas(data.TotalPaginas);
          setFilaInicial(data.Inicial);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error al cargar las cuentas raíces",
        });
      }
    };

    fetchData();
  }, [fechaDesde, fechaHasta, cuenta]); // Dependencias de efecto

  // Renderizar el componente
  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
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
          onChange={handleFechaChange}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 2, backgroundColor: "#ffeb3b", borderRadius: 2 }}
        />
        <TextField
          label="Fecha Hasta"
          type="date"
          value={fechaHasta}
          onChange={handleFechaChange}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 2, backgroundColor: "#ffeb3b", borderRadius: 2 }}
        />
        <TextField
          label="Tipo de Operación"
          value={tipoOperacion}
          onChange={handleTipoOperacionChange}
          sx={{ marginRight: 2, backgroundColor: "#ffeb3b", borderRadius: 2 }}
        />
        <Button
          variant="contained"
          //onClick={handleFiltrar}
          sx={{
            backgroundColor: "#ffeb3b",
            color: "black",
            borderRadius: "1.2rem",
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
          }}
        >
          Limpiar
        </Button>
      </Box>
      <TablaMayor tipoMayor={tipoOperacion} datosMayor={filtradoDatos} />
    </div>
  );
};

export default ListaMayores;
