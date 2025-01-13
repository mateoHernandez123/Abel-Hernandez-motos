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

const FiltrarProductos = () => {
  const { usuarioAutenticado, deslogear } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("UsuarioAutenticado"))) {
      deslogear();
      navigate("/login", { replace: true });
    }
  }, [usuarioAutenticado, navigate, deslogear]);

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productos, setProductos] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null); // Estado del Popover
  const [selectedColumns, setSelectedColumns] = useState([
    "Código",
    "Nombre",
    "Categoría",
    "Precio de Venta",
  ]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasMock = ["Electrónica", "Hogar", "Deportes", "Ropa"];
        setCategorias(categoriasMock);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar las categorías",
          icon: "error",
        });
      }
    };
    fetchCategorias();
  }, []);

  const handleAgregarProducto = () => {
    navigate("/alta-producto");
  };

  const handleFiltrar = async () => {
    try {
      const productosMock = [
        {
          codigo: "P001",
          codigoBarras: "1234567890123",
          nombre: "Televisor",
          marca: "Samsung",
          modelo: "QLED",
          precioVenta: 1000,
          precioCompra: 800,
          stockActual: 10,
          stockMaximo: 20,
          stockMinimo: 5,
          puntoReposicion: 7,
          precioPromedio: 850,
          fechaAlta: "11/12/2023",
          categoria: "Electrónica",
          proveedor: "Proveedor A",
          almacen: "Almacén Central",
          imagen:
            "https://http2.mlstatic.com/D_NQ_NP_693649-MLU79054759999_092024-F.webp",
        },
      ];
      const filtrados = productosMock.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      );
      setProductos(filtrados);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los productos",
        icon: "error",
      });
    }
  };

  const handleLimpiar = () => {
    setCategoriaSeleccionada("");
    setProductos([]);
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

  // Mapeo de columnas a propiedades del producto
  const columnToProperty = {
    Código: "codigo",
    "Código de Barras": "codigoBarras",
    Nombre: "nombre",
    Marca: "marca",
    Categoría: "categoria",
    Modelo: "modelo",
    "Punto de Reposición": "puntoReposicion",
    Almacén: "almacen",
    Imagen: "imagen",
    "Precio de Venta": "precioVenta",
    "Precio de Compra": "precioCompra",
    "Precio Promedio": "precioPromedio",
    "Stock Actual": "stockActual",
    "Stock Máximo": "stockMaximo",
    "Stock Mínimo": "stockMinimo",
    "Fecha de Alta": "fechaAlta",
    Proveedor: "proveedor",
  };

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
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  borderColor: "black",
                  textAlign: "center",
                  backgroundColor: "#ffeb3b",
                }}
              >
                {column}
              </TableCell>
            ))}
            <TableCell
              sx={{
                backgroundColor: "#ffeb3b",
                fontWeight: "bold",
                fontSize: "1.4rem",
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
                    fontSize: "1.1rem",
                    borderColor: "black",
                    textAlign: "center",
                    backgroundColor: "#e0e0e0",
                  }}
                >
                  {column === "Imagen" ? (
                    <img
                      src={row[columnToProperty[column]]}
                      alt={row.nombre}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    row[columnToProperty[column]]
                  )}
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
                  onClick={() => navigate(`/editar-producto/${row.codigo}`)}
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
        Listado de Productos
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <TextField
            label="Categoría"
            select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            sx={{
              marginRight: 2,
              backgroundColor: "#ffeb3b",
              borderRadius: 2,
              minWidth: 200,
            }}
          >
            {categorias.map((categoria, index) => (
              <MenuItem key={index} value={categoria}>
                {categoria}
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
        </Box>

        <Box>
          <Button
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
          </Button>

          <IconButton
            variant="contained"
            onClick={handleAgregarProducto}
            sx={{
              backgroundColor: "#ffeb3b",
              "&:hover": { backgroundColor: "#fdd835" },
              color: "#333",
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
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

      {renderTable(selectedColumns, productos)}
    </Box>
  );
};

export default FiltrarProductos;
