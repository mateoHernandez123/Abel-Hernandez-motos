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
    Checkbox,
    FormControlLabel,
    MenuItem,
    IconButton,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom"; // Asegurate de importar esto
  import AddIcon from "@mui/icons-material/Add";
  import VisibilityIcon from "@mui/icons-material/Visibility";

  
  const ListadoSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [filtroAbiertas, setFiltroAbiertas] = useState(true);
    const [criterioBusqueda, setCriterioBusqueda] = useState("producto");
    const [valorBusqueda, setValorBusqueda] = useState("");
  
    const navigate = useNavigate(); // Inicializá acá el hook useNavigate
  
    useEffect(() => {
      // Simulación de datos
      const solicitudesMock = [
        { nro: 1, producto: "Televisor", proveedor: "Proveedor A", estado: "Abierta" },
        { nro: 2, producto: "Laptop", proveedor: "Proveedor B", estado: "Cerrada" },
        { nro: 3, producto: "Celular", proveedor: "Proveedor A", estado: "Abierta" },
        { nro: 4, producto: "Mouse", proveedor: "Proveedor C", estado: "Cerrada" },
      ];
      setSolicitudes(solicitudesMock);
    }, []);
  
    const handleFiltroCambio = () => {
      setFiltroAbiertas(!filtroAbiertas);
    };
  
    const solicitudesFiltradas = solicitudes.filter((solicitud) => {
      const coincideEstado = filtroAbiertas
        ? solicitud.estado === "Abierta"
        : solicitud.estado === "Cerrada";
      const coincideBusqueda = valorBusqueda
        ? solicitud[criterioBusqueda]
            .toString()
            .toLowerCase()
            .includes(valorBusqueda.toLowerCase())
        : true;
      return coincideEstado && coincideBusqueda;
    });
  
    const handleAgregarSolicitud = () => {
      navigate("/alta-solicitud-compra"); // Redirigí al formulario
    };
  
    return (
      <Box sx={{ padding: 4, backgroundColor: "#e6e2d5", borderRadius: 5 }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: 4,
            color: "#333",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Listado de Solicitudes de Compras
        </Typography>
  
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" sx={{ marginRight: 2 }}>
            <TextField
              label="Buscar por"
              select
              value={criterioBusqueda}
              onChange={(e) => setCriterioBusqueda(e.target.value)}
              sx={{
                marginRight: 2,
                backgroundColor: "#ffeb3b",
                borderRadius: 2,
                minWidth: 150,
              }}
            >
              <MenuItem value="producto">Producto</MenuItem>
              <MenuItem value="nro">N° Solicitud</MenuItem>
              <MenuItem value="proveedor">Proveedor</MenuItem>
            </TextField>
  
            <TextField
              label="Buscar"
              variant="outlined"
              value={valorBusqueda}
              onChange={(e) => setValorBusqueda(e.target.value)}
              placeholder="Ingrese valor"
              sx={{
                backgroundColor: "#ffeb3b",
                borderRadius: 2,
                minWidth: 200,
              }}
            />
          </Box>
  
          <FormControlLabel
            control={<Checkbox checked={filtroAbiertas} onChange={handleFiltroCambio} />}
            label="Mostrar solo abiertas"
            sx={{ marginLeft: 2 }}
          />
  
          <IconButton
            onClick={handleAgregarSolicitud}
            sx={{
              backgroundColor: "#ffeb3b",
              marginLeft: 2,
              "&:hover": { backgroundColor: "#fdd835" },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
  
        <TableContainer
          component={Paper}
          sx={{
            marginBottom: 4,
            borderRadius: 5,
          }}
        >
          <Table
            sx={{
              fontSize: "1.5rem",
              width: "800px",
              "& .MuiTableCell-root": {
                borderColor: "black",
                borderWidth: "1px",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    borderColor: "black",
                    textAlign: "center",
                    backgroundColor: "#ffeb3b",
                  }}
                >
                  N° Solicitud
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    borderColor: "black",
                    textAlign: "center",
                    backgroundColor: "#ffeb3b",
                  }}
                >
                  Producto
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    borderColor: "black",
                    textAlign: "center",
                    backgroundColor: "#ffeb3b",
                  }}
                >
                  Proveedor
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    borderColor: "black",
                    textAlign: "center",
                    backgroundColor: "#ffeb3b",
                  }}
                >
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {solicitudesFiltradas.map((solicitud) => (
    <TableRow key={solicitud.nro}>
      <TableCell
        sx={{
          fontSize: "1.1rem",
          borderColor: "black",
          textAlign: "center",
          backgroundColor: "#e0e0e0",
        }}
      >
        {solicitud.nro}
      </TableCell>
      <TableCell
        sx={{
          fontSize: "1.1rem",
          borderColor: "black",
          textAlign: "center",
          backgroundColor: "#e0e0e0",
        }}
      >
        {solicitud.producto}
      </TableCell>
      <TableCell
        sx={{
          fontSize: "1.1rem",
          borderColor: "black",
          textAlign: "center",
          backgroundColor: "#e0e0e0",
        }}
      >
        {solicitud.proveedor}
      </TableCell>
      <TableCell
        sx={{
          fontSize: "1.1rem",
          borderColor: "black",
          textAlign: "center",
          backgroundColor: "#e0e0e0",
        }}
      >
        {solicitud.estado}
      </TableCell>
      <TableCell
        sx={{
          fontSize: "1.1rem",
          borderColor: "black",
          textAlign: "center",
          backgroundColor: "#e0e0e0",
        }}
      >
        <IconButton
          onClick={() => navigate(`/detalle-solicitud/${solicitud.nro}`)}
          sx={{
            backgroundColor: "#ffeb3b",
            "&:hover": { backgroundColor: "#fdd835" },
          }}
        >
          <VisibilityIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
          </Table>
        </TableContainer>
  
        {solicitudesFiltradas.length === 0 && (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: 2,
              color: "#333",
            }}
          >
            No se encontraron resultados.
          </Typography>
        )}
      </Box>
    );
  };
  
  export default ListadoSolicitudes;
  