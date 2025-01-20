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
  MenuItem,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  Popover,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../../context/Context";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";

const FiltrarProveedor = () => {
  const { usuarioAutenticado, deslogear, IP, tokenError } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("UsuarioAutenticado"))) {
      deslogear();
      navigate("/login", { replace: true });
    }
  }, [usuarioAutenticado, navigate, deslogear]);

  const [rubros, setRubros] = useState([]);
  const [rubroSeleccionado, setRubroSeleccionado] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [paginas, setPaginas] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([
    "Nombre Proveedor",
    "Razón Social",
    "CUIT",
    "Teléfono",
    "Correo",
    "Rubro",
    "Ciudad",
  ]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchRubros = async () => {
      try {
        const rubrosMock = [
          "Tecnología",
          "Soporte",
          "Construcción",
          "Alimentos",
        ];
        setRubros(rubrosMock);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar los rubros",
          icon: "error",
        });
      }
    };
    fetchRubros();

    const fetchProveedores = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const response = await fetch(`${IP}/api/proveedores/listar/1?all=1`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.AuthErr) {
          tokenError(data.MENSAJE);
        } else if (data.ServErr) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.MENSAJE,
            color: "#fff",
            background: "#333",
            confirmButtonColor: "#3085d6",
          });
        } else if (data.ERROR) {
          Swal.fire({
            icon: "warning",
            title: "Atención",
            text: data.MENSAJE,
            color: "#fff",
            background: "#333",
            confirmButtonColor: "#3085d6",
          });
        } else {
          setProveedores(data.ListaProv); // Establecer los proveedores
          setPaginas(data.TotalPaginas); //Establecer las paginas que se van a mostrar
        }
      } catch (error) {
        Swal.fire({
          title: "Error en la carga de datos",
          icon: "error",
          text: "Hubo un problema al conectar con el servidor.",
          color: "#fff",
          background: "#333",
          confirmButtonColor: "#3085d6",
        });
      }
    };
    fetchProveedores();
  }, []);

  const handleAgregarProveedor = () => {
    navigate("/alta-proveedor");
  };

  const handleFiltrar = async () => {
    try {
      const proveedoresMock = [
        {
          nombreProveedor: "Proveedor A",
          razonSocial: "Proveedor A S.A.",
          cuit: "20-12345678-9",
          telefono: "123456789",
          correo: "contacto@proveedora.com",
          direccion: "Calle Falsa 123",
          ciudad: "Ciudad A",
          provincia: "Provincia A",
          codigoPostal: "1234",
          banco: "Banco Nación",
          numeroCuenta: "123456789",
          cbu: "0123456789012345678901",
          tipoProveedor: "Mayorista",
          rubro: "Tecnología",
          proveedorActivo: true,
          calificacion: "A",
          comentarios: "Proveedor confiable",
        },
      ];
      const filtrados = proveedoresMock.filter(
        (proveedor) => proveedor.rubro === rubroSeleccionado
      );
      //setProveedores(filtrados);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los proveedores",
        icon: "error",
      });
    }
  };

  const handleLimpiar = () => {
    setRubroSeleccionado("");
    setProveedores([]);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleColumnChange = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const columnToProperty = {
    "Nombre Proveedor": "nombre",
    "Razón Social": "razon_social",
    CUIT: "cuit",
    Teléfono: "telefono",
    Correo: "correo",
    Dirección: "direccion",
    Ciudad: "ciudad",
    Provincia: "provincia",
    "Código Postal": "codigo_postal",
    "Tipo de Proveedor": "tipo_proveedor",
    Rubro: "rubro",
    Activo: "activo",
  };

  console.log(proveedores);

  const renderTable = (columns, data) => (
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
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{
                  backgroundColor: "#ffeb3b",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  borderColor: "black",
                  textAlign: "center",
                }}
              >
                {column}
              </TableCell>
            ))}
            <TableCell
              sx={{
                backgroundColor: "#ffeb3b",
                fontWeight: "bold",
                fontSize: "1.2rem",
                borderColor: "black",
                textAlign: "center",
              }}
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{
                    backgroundColor: "#e0e0e0",
                    fontSize: "1.1rem",
                    borderColor: "black",
                    textAlign: "center",
                  }}
                >
                  {row[columnToProperty[column]]}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  textAlign: "center",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/editar-proveedor/${row.cuit}`)}
                >
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
        Listado de Proveedores
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Rubro"
          select
          value={rubroSeleccionado}
          onChange={(e) => setRubroSeleccionado(e.target.value)}
          sx={{
            marginRight: 2,
            backgroundColor: "#ffeb3b",
            borderRadius: 2,
            minWidth: 200,
          }}
        >
          {rubros.map((rubro, index) => (
            <MenuItem key={index} value={rubro}>
              {rubro}
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
          variant="contained"
          onClick={handleLimpiar}
          sx={{
            backgroundColor: "#ffeb3b",
            color: "black",
            marginRight: 5,
            borderRadius: "1.2rem",
          }}
        >
          Limpiar
        </Button>

        <IconButton
          variant="contained"
          onClick={handlePopoverOpen}
          sx={{
            backgroundColor: "#ffeb3b",
            "&:hover": { backgroundColor: "#fdd835" },
            color: "#333",
            borderRadius: "3rem",
            marginRight: 2,
          }}
        >
          <SettingsIcon />
        </IconButton>

        <IconButton
          variant="contained"
          onClick={handleAgregarProveedor}
          sx={{
            backgroundColor: "#ffeb3b",
            "&:hover": { backgroundColor: "#fdd835" },
            color: "#333",
            marginRight: 2,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column", // Asegura que las opciones se dispongan verticalmente
          }}
        >
          {Object.keys(columnToProperty).map((column) => (
            <FormControlLabel
              key={column}
              control={
                <Checkbox
                  checked={selectedColumns.includes(column)}
                  onChange={() => handleColumnChange(column)}
                />
              }
              label={column}
            />
          ))}
        </Box>
      </Popover>

      {renderTable(selectedColumns, proveedores)}
    </Box>
  );
};

export default FiltrarProveedor;
