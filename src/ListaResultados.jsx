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
import PatrimonioNeto from "./PatrimonioNeto"; // Asegúrate de que la ruta sea correcta

const ListaResultados = () => {
  // Datos de Patrimonio Neto
  const datosPNInicio = [
    { activos: 2000, pasivos: 3750, patrimonioNeto: 2650 },
    { activos: 3700, pasivos: 1200, patrimonioNeto: 4900 },
    { activos: 0, pasivos: 0, patrimonioNeto: 9800 }, // Línea en blanco para completar
  ];

  const datosPNCierre = [
    { activos: 5850, pasivos: 4200, patrimonioNeto: 6900 },
    { activos: 3950, pasivos: 850, patrimonioNeto: 6800 },
    { activos: 0, pasivos: 0, patrimonioNeto: 11000 }, // Línea en blanco para completar
  ];

  // Datos del Estado de Resultados
  const estadoResultados = [
    { descripcion: "Ventas", cantidad: 4300 },
    { descripcion: "CMV", cantidad: -2900 },
    { descripcion: "Utilidad bruta", cantidad: 1400 },
    { descripcion: "Gastos por publicidad", cantidad: -300 },
    { descripcion: "Intereses por mora", cantidad: -250 },
    { descripcion: "Descuento obtenido", cantidad: 350 },
    { descripcion: "Resultado", cantidad: 1200 },
  ];

  return (
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
          marginBottom: 2,
          color: "#333",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Lista de Resultados
      </Typography>

      {/* Tabla de Patrimonio Neto al Inicio */}
      <PatrimonioNeto
        datos={datosPNInicio}
        titulo="Patrimonio Neto al Inicio"
      />

      {/* Tabla de Patrimonio Neto al Cierre */}
      <PatrimonioNeto
        datos={datosPNCierre}
        titulo="Patrimonio Neto al Cierre"
      />

      {/* Estado de Resultados */}
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}
      >
        Estado de Resultados
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#ffeb3b" }}>
        <Table sx={{ width: "750px" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              >
                Descripción
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  textAlign: "center",
                }}
              >
                Cantidad
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estadoResultados.map((fila, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {fila.descripcion}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {fila.cantidad}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaResultados;
