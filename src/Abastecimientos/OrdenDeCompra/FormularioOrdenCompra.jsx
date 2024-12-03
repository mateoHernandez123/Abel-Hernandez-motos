import { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const FormularioOrdenCompra = () => {
  const { usuarioAutenticado, deslogear } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("UsuarioAutenticado"))) {
      deslogear();
      navigate("/login", { replace: true });
    }
  }, [usuarioAutenticado, navigate, deslogear]);

  const today = new Date().toISOString().split("T")[0];
  const [numeroOrden, setNumeroOrden] = useState("OC-2024-001");
  const [fechaOrden, setFechaOrden] = useState(today);
  const [proveedor, setProveedor] = useState("");
  const [cuit, setCuit] = useState("");
  const [direccionProveedor, setDireccionProveedor] = useState("");
  const [telefonoProveedor, setTelefonoProveedor] = useState("");
  const [correoProveedor, setCorreoProveedor] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [productos, setProductos] = useState([
    { producto: "", descripcion: "", cantidad: 0, precio: 0, total: 0 },
  ]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  const [formaPago, setFormaPago] = useState("");
  const [plazoPago, setPlazoPago] = useState("");
  const [envio, setEnvio] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [lugarEntrega, setLugarEntrega] = useState("");

  const proveedoresList = [
    "Papelería Universal S.A.",
    "Oficina Fácil",
    "Almacenes del Norte",
  ];

  const departamentosList = ["Almacén", "Ventas", "Administración"];

  const agregarProducto = () => {
    setProductos([
      ...productos,
      { producto: "", descripcion: "", cantidad: 0, precio: 0, total: 0 },
    ]);
  };

  const eliminarProducto = (index) => {
    if (productos.length > 1) {
      const nuevosProductos = productos.filter((_, i) => i !== index);
      setProductos(nuevosProductos);
    } else {
      Swal.fire(
        "Error",
        "Debe haber al menos un producto en la lista.",
        "error"
      );
    }
  };

  const handleProductoChange = (index, name, value) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][name] = value;
    if (name === "cantidad" || name === "precio") {
      nuevosProductos[index].total =
        nuevosProductos[index].cantidad * nuevosProductos[index].precio;
    }
    setProductos(nuevosProductos);

    // Recalcular el total
    const updatedSubtotal = nuevosProductos.reduce(
      (acc, producto) => acc + producto.total,
      0
    );
    const updatedIva = updatedSubtotal * 0.21;
    setSubtotal(updatedSubtotal);
    setIva(updatedIva);
    setTotal(updatedSubtotal + updatedIva);
  };

  const enviarOrdenCompra = () => {
    Swal.fire({
      icon: "success",
      title: "Orden de Compra Creada",
      text: "La orden de compra se ha generado correctamente.",
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffeb3b",
        color: "#3b3a31",
        padding: 4,
        borderRadius: 5,
        width: "900px",
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Orden de Compra
      </Typography>

      {/* Información del proveedor */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Información del Proveedor
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Proveedor</InputLabel>
            <Select
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
            >
              {proveedoresList.map((proveedor, index) => (
                <MenuItem key={index} value={proveedor}>
                  {proveedor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CUIT"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dirección"
            value={direccionProveedor}
            onChange={(e) => setDireccionProveedor(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Teléfono"
            value={telefonoProveedor}
            onChange={(e) => setTelefonoProveedor(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Correo Electrónico"
            value={correoProveedor}
            onChange={(e) => setCorreoProveedor(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Información del solicitante */}
      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
        Información del Solicitante
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre"
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Departamento</InputLabel>
            <Select
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            >
              {departamentosList.map((departamento, index) => (
                <MenuItem key={index} value={departamento}>
                  {departamento}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Detalle del pedido */}
      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
        Detalle del Pedido
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#ffeb3b", marginBottom: 4, borderRadius: 5 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Producto</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Precio Unitario</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={producto.producto}
                    onChange={(e) =>
                      handleProductoChange(index, "producto", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={producto.descripcion}
                    onChange={(e) =>
                      handleProductoChange(index, "descripcion", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) =>
                      handleProductoChange(index, "cantidad", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={producto.precio}
                    onChange={(e) =>
                      handleProductoChange(index, "precio", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>{producto.total}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => eliminarProducto(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={agregarProducto}
          fullWidth
          sx={{
            color: "#3b3a31",
            borderColor: "#3b3a31",
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <AddIcon /> Agregar Producto
        </Button>
      </Box>

      {/* Resumen de la Orden */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Subtotal" value={subtotal} fullWidth readOnly />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="IVA (21%)" value={iva} fullWidth readOnly />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Total" value={total} fullWidth readOnly />
        </Grid>
      </Grid>

      {/* Condiciones de la Orden */}
      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
        Condiciones de la Orden
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Forma de Pago"
            value={formaPago}
            onChange={(e) => setFormaPago(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Plazo de Pago"
            value={plazoPago}
            onChange={(e) => setPlazoPago(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Envío"
            value={envio}
            onChange={(e) => setEnvio(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha de Entrega"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Lugar de Entrega"
            value={lugarEntrega}
            onChange={(e) => setLugarEntrega(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="success"
          onClick={enviarOrdenCompra}
          fullWidth
          sx={{ backgroundColor: "#3b3a31", color: "#ffff", marginTop: 2 }}
        >
          Generar Orden de Compra
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioOrdenCompra;
