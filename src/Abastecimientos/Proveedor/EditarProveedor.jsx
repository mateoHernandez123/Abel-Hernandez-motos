import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditarProveedor = () => {
  const { cuit } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Simula la obtención de datos del proveedor
    const fetchProveedor = async () => {
      try {
        const proveedorMock = {
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
        };
        setFormData(proveedorMock);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el proveedor", "error");
      }
    };
    fetchProveedor();
  }, [cuit]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    Swal.fire("Éxito", "Proveedor actualizado correctamente", "success");
    navigate("/proveedores");
  };

  const handleDisable = () => {
    Swal.fire("Éxito", "Proveedor deshabilitado", "success");
    navigate("/proveedores");
  };

  const handleDelete = () => {
    Swal.fire("Éxito", "Proveedor eliminado", "success");
    navigate("/proveedores");
  };

  if (!formData) {
    return <Typography>Cargando...</Typography>;
  }

  const tiposProveedores = ["Minorista", "Mayorista", "Exportador", "Otro"];
  const rubros = ["Tecnología", "Soporte"];

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
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Editar Proveedor
      </Typography>
      <Box mb={2}>
        <Typography variant="h6">Datos Principales</Typography>
        <TextField
          label="Nombre del Proveedor"
          name="nombreProveedor"
          value={formData.nombreProveedor}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Razón Social"
          name="razonSocial"
          value={formData.razonSocial}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="CUIT"
          name="cuit"
          value={formData.cuit}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correo Electrónico"
          name="correo"
          value={formData.correo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ciudad"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Provincia"
          name="provincia"
          value={formData.provincia}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Código Postal"
          name="codigoPostal"
          value={formData.codigoPostal}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Box>

      <Box mb={2}>
        <Typography variant="h6">Datos Bancarios</Typography>
        <TextField
          label="Banco"
          name="banco"
          value={formData.banco}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Número de Cuenta"
          name="numeroCuenta"
          value={formData.numeroCuenta}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="CBU"
          name="cbu"
          value={formData.cbu}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Box>

      <Box mb={2}>
        <Typography variant="h6">Tipo y Rubro</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Proveedor</InputLabel>
          <Select
            name="tipoProveedor"
            value={formData.tipoProveedor}
            onChange={handleInputChange}
          >
            {tiposProveedores.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Rubro</InputLabel>
          <Select
            name="rubro"
            value={formData.rubro}
            onChange={handleInputChange}
          >
            {rubros.map((rubro) => (
              <MenuItem key={rubro} value={rubro}>
                {rubro}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mb={2}>
        <Typography variant="h6">Otros Atributos</Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="proveedorActivo"
              checked={formData.proveedorActivo}
              onChange={handleInputChange}
            />
          }
          label="Proveedor Activo"
        />
        <TextField
          label="Calificación"
          name="calificacion"
          value={formData.calificacion}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comentarios"
          name="comentarios"
          value={formData.comentarios}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar Cambios
        </Button>
        <Button variant="contained" color="warning" onClick={handleDisable}>
          Deshabilitar Proveedor
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Eliminar Proveedor
        </Button>
      </Box>
    </Box>
  );
};

export default EditarProveedor;
