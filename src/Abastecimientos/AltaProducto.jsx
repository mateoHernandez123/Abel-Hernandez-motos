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
} from "@mui/material";
import Swal from "sweetalert2";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const AltaProducto = () => {
  const { usuarioAutenticado, deslogear } = useContext(Context);
  const navigate = useNavigate();

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
    stockActual: "",
    stockMaximo: "",
    stockMinimo: "",
    puntoReposicion: "",
    precioPromedioPonderado: "",
    fechaAlta: "",
    categoria: "",
    proveedor: "",
    almacen: "",
    imagen: null, // Nuevo campo para la imagen
  });

  const categorias = ["Electrónica", "Hogar", "Ropa", "Alimentos"];
  const proveedores = ["Proveedor A", "Proveedor B", "Proveedor C"];
  const almacenes = ["Almacén 1", "Almacén 2", "Almacén 3"];

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

    // Manejar cambios en el formulario
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
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
    } = formData;

    if (
      !codigo ||
      !codigoBarras ||
      !nombre ||
      !marca ||
      !modelo ||
      !precioVenta ||
      !precioCompra
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor complete todos los campos obligatorios.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Producto Agregado",
      text: "El producto ha sido registrado con éxito.",
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
      <Typography
        variant="h4"
        sx={{ marginBottom: 2, color: "#333", textAlign: "center" }}
      >
        Alta de Producto
      </Typography>

      <Box mb={3}>
        <TextField
          fullWidth
          label="Código"
          name="codigo"
          value={formData.codigo}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Código de Barras"
          name="codigoBarras"
          value={formData.codigoBarras}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Marca"
          name="marca"
          value={formData.marca}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Precio de Venta"
          name="precioVenta"
          type="number"
          inputProps={{ min: 0 }}
          value={formData.precioVenta}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Precio de Compra"
          name="precioCompra"
          type="number"
          inputProps={{ min: 0 }}
          value={formData.precioCompra}
          onChange={handleInputChange}
          margin="normal"
          required
        />
      </Box>

      <Typography variant="h6">Stock</Typography>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Stock Actual"
          name="stockActual"
          type="number"
          inputProps={{ min: 0 }}
          value={formData.stockActual}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Stock Máximo"
          name="stockMaximo"
          type="number"
          inputProps={{ min: 0 }}
          value={formData.stockMaximo}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Stock Mínimo"
          name="stockMinimo"
          type="number"
          inputProps={{ min: 0 }}
          value={formData.stockMinimo}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Punto de Reposición"
          name="puntoReposicion"
          type="number"
          inputProps={{ min: 0 }}
          value={formData.puntoReposicion}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Precio Promedio Ponderado"
          name="precioPromedioPonderado"
          type="number"
          inputProps={{ min: 0 }}
          value={formData.precioPromedioPonderado}
          onChange={handleInputChange}
          margin="normal"
        />
      </Box>

      <Typography variant="h6">Otros</Typography>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Fecha de Alta"
          name="fechaAlta"
          type="date"
          value={formData.fechaAlta}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Categoría</InputLabel>
          <Select
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Proveedor</InputLabel>
          <Select
            name="proveedor"
            value={formData.proveedor}
            onChange={handleInputChange}
          >
            {proveedores.map((proveedor) => (
              <MenuItem key={proveedor} value={proveedor}>
                {proveedor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Almacén</InputLabel>
          <Select
            name="almacen"
            value={formData.almacen}
            onChange={handleInputChange}
          >
            {almacenes.map((almacen) => (
              <MenuItem key={almacen} value={almacen}>
                {almacen}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={3}>
          <Typography variant="body1" gutterBottom>
            Imagen del Producto:
          </Typography>
          <TextField
            type="file"
            name="Imagen del Producto"
            fullWidth
            margin="normal"
            inputProps={{ accept: "image/*" }}
            onChange={handleInputChange}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        onClick={handleSubmit}
        sx={{ backgroundColor: "#3b3a31", color: "#ffff", marginTop: 2 }}
      >
        Registrar Producto
      </Button>
    </Box>
  );
};

export default AltaProducto;
