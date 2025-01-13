import { useState, useContext, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import { Context } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditarProducto = () => {
  const { usuarioAutenticado, deslogear } = useContext(Context);
  const navigate = useNavigate();
  const { codigo } = useParams(); // Obtiene el código del producto desde la URL

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("UsuarioAutenticado"))) {
      deslogear();
      navigate("/login", { replace: true });
    }
  }, [usuarioAutenticado, navigate, deslogear]);

  const [formData, setFormData] = useState({
    codigo: "",
    codigoBarras: "",
    nombre: "",
    marca: "",
    modelo: "",
    precioVenta: "",
    precioCompra: "",
    iva: "",
    stockActual: "",
    stockMaximo: "",
    stockMinimo: "",
    puntoReposicion: "",
    fechaAlta: "",
    categoria: "",
    proveedor: "",
    almacen: "",
    imagen: null,
  });

  // Datos de ejemplo para las categorías, proveedores y almacenes
  const categorias = ["Electrónica", "Hogar", "Ropa", "Alimentos"];
  const proveedores = ["Proveedor A", "Proveedor B", "Proveedor C"];
  const almacenes = ["Almacén 1", "Almacén 2", "Almacén 3"];

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        // Aquí puedes hacer la solicitud para obtener los datos del producto con el código
        const producto = {
          codigo: "P001",
          codigoBarras: "1234567890123",
          nombre: "Televisor",
          marca: "Samsung",
          modelo: "QLED",
          precioVenta: 1000,
          precioCompra: 800,
          iva: 21,
          stockActual: 10,
          stockMaximo: 20,
          stockMinimo: 5,
          puntoReposicion: 7,
          fechaAlta: "11/12/2023",
          categoria: "Electrónica",
          proveedor: "Proveedor A",
          almacen: "Almacén Central",
          imagen:
            "https://http2.mlstatic.com/D_NQ_NP_693649-MLU79054759999_092024-F.webp",
        };
        setFormData(producto);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar la información del producto.",
          icon: "error",
        });
      }
    };

    fetchProducto();
  }, [codigo]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Validar que los valores numéricos sean positivos
    if (type === "number" && value < 0) {
      Swal.fire({
        title: "Error",
        text: "Los valores numéricos deben ser positivos.",
        icon: "error",
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const handleListarProductos = () => {
    navigate("/productos");
  };

  const handleSave = () => {
    Swal.fire("Éxito", "Producto actualizado correctamente", "success");
    navigate("/productos");
  };

  const handleSubmit = () => {
    const {
      codigo,
      codigoBarras,
      nombre,
      marca,
      modelo,
      precioVenta,
      precioCompra,
      iva,
    } = formData;

    if (
      !codigo ||
      !codigoBarras ||
      !nombre ||
      !marca ||
      !modelo ||
      !precioVenta ||
      !precioCompra ||
      !iva
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor complete todos los campos obligatorios.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Producto Actualizado",
      text: "El producto ha sido actualizado con éxito.",
      icon: "success",
    });

    console.log("Datos del producto:", formData);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffeb3b",
        color: "black",
        padding: 4,
        borderRadius: 5,
        width: "900px",
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      <IconButton
        color="primary"
        onClick={handleListarProductos}
        sx={{
          backgroundColor: "#ffeb3b",
          "&:hover": { backgroundColor: "#fdd835" },
          color: "#333",
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography
        variant="h4"
        sx={{ marginBottom: 4, textAlign: "center", fontWeight: "bold" }}
      >
        Editar Producto
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          label="Código"
          name="codigo"
          value={formData.codigo}
          onChange={handleInputChange}
          disabled
        />

        <TextField
          label="Código de Barras"
          name="codigoBarras"
          value={formData.codigoBarras}
          onChange={handleInputChange}
        />

        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />

        <TextField
          label="Marca"
          name="marca"
          value={formData.marca}
          onChange={handleInputChange}
        />

        <TextField
          label="Modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleInputChange}
        />

        <TextField
          label="Precio de Venta"
          name="precioVenta"
          type="number"
          value={formData.precioVenta}
          onChange={handleInputChange}
        />

        <TextField
          label="Precio de Compra"
          name="precioCompra"
          type="number"
          value={formData.precioCompra}
          onChange={handleInputChange}
        />

        <TextField
          label="IVA"
          name="iva"
          type="number"
          value={formData.iva}
          onChange={handleInputChange}
        />

        <TextField
          label="Stock Actual"
          name="stockActual"
          type="number"
          value={formData.stockActual}
          onChange={handleInputChange}
        />

        <TextField
          label="Stock Máximo"
          name="stockMaximo"
          type="number"
          value={formData.stockMaximo}
          onChange={handleInputChange}
        />

        <TextField
          label="Stock Mínimo"
          name="stockMinimo"
          type="number"
          value={formData.stockMinimo}
          onChange={handleInputChange}
        />

        <TextField
          label="Punto de Reposición"
          name="puntoReposicion"
          type="number"
          value={formData.puntoReposicion}
          onChange={handleInputChange}
        />

        <FormControl>
          <InputLabel>Categoría</InputLabel>
          <Select
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
          >
            {categorias.map((categoria, index) => (
              <MenuItem key={index} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Proveedor</InputLabel>
          <Select
            name="proveedor"
            value={formData.proveedor}
            onChange={handleInputChange}
          >
            {proveedores.map((proveedor, index) => (
              <MenuItem key={index} value={proveedor}>
                {proveedor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Almacén</InputLabel>
          <Select
            name="almacen"
            value={formData.almacen}
            onChange={handleInputChange}
          >
            {almacenes.map((almacen, index) => (
              <MenuItem key={index} value={almacen}>
                {almacen}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSave}
          sx={{ backgroundColor: "#3b3a31", color: "#ffff", marginTop: 2 }}
        >
          Actualizar Producto
        </Button>
      </Box>
    </Box>
  );
};

export default EditarProducto;
