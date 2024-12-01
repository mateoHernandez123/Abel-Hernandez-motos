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
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../context/Context";
import AddIcon from "@mui/icons-material/Add";

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
      console.log(filtrados);
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
        backgroundColor: "#ffeb3b",
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
                }}
              >
                {column}
              </TableCell>
            ))}
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

      <Box
        display="flex"
        alignItems="center" // Alinea verticalmente los elementos
        justifyContent="space-between" // Distribuye los elementos: grupo a la izquierda, botón al final
        mb={2}
      >
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
              borderRadius: "1.2rem",
            }}
          >
            Limpiar
          </Button>
        </Box>

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

      {renderTable(
        [
          "Código",
          "Código de Barras",
          "Nombre",
          "Marca",
          "Categoría",
          "Modelo",
          "Punto de Reposición",
          "Almacén",
          "Imagen",
        ],
        productos
      )}

      {renderTable(
        [
          "Nombre",
          "Precio de Venta",
          "Precio de Compra",
          "Precio Promedio",
          "Stock Actual",
          "Stock Máximo",
          "Stock Mínimo",
          "Fecha de Alta",
          "Proveedor",
        ],
        productos
      )}
    </Box>
  );
};

export default FiltrarProductos;
