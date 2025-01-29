import { useState, useEffect, useContext } from "react";
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
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Context } from "../../context/Context";

const EditarProveedor = () => {
  const { usuarioAutenticado, deslogear, IP, tokenError } = useContext(Context); // Mueve el useContext aquí
  const navigate = useNavigate(); // Mueve el useNavigate aquí

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("UsuarioAutenticado"))) {
      deslogear();
      navigate("/login", { replace: true });
    }
  }, [usuarioAutenticado, navigate, deslogear]); // Asegúrate de incluir `deslogear` como dependencia
  const { cuit } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        // Simulación de datos
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

  const handleSave = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const Cuit = {
        cuit: formData.cuit,
      };
      // Verificar si se debe activar o desactivar el proveedor
      const activationResponse = formData.proveedorActivo
        ? await fetch(`${IP}/api/proveedores/activar`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Cuit }),
          })
        : await fetch(`${IP}/api/proveedores/desactivar`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Cuit }),
          });
      console.log({ Cuit });
      const activationData = await activationResponse.json();

      if (activationData.AuthErr) {
        return tokenError(activationData.MENSAJE);
      } else if (activationData.ServErr) {
        return Swal.fire({
          title: "Error del Servidor",
          icon: "error",
          text: activationData.MENSAJE,
          color: "#fff",
          background: "#333",
          confirmButtonColor: "#3085d6",
        });
      } else if (activationData.ERROR) {
        return Swal.fire({
          icon: "warning",
          title: "Atención",
          text: activationData.MENSAJE,
          color: "#fff",
          background: "#333",
          confirmButtonColor: "#3085d6",
        });
      }

      // // Enviar los datos del formulario al backend para la actualización
      // const updateResponse = await fetch(
      //   `${IP}/api/proveedores/${formData.cuit}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   }
      // );

      // const updateData = await updateResponse.json();

      // if (updateData.AuthErr) {
      //   return tokenError(updateData.MENSAJE);
      // } else if (updateData.ServErr) {
      //   return Swal.fire({
      //     title: "Error del Servidor",
      //     icon: "error",
      //     text: updateData.MENSAJE,
      //     color: "#fff",
      //     background: "#333",
      //     confirmButtonColor: "#3085d6",
      //   });
      // } else if (updateData.ERROR) {
      //   return Swal.fire({
      //     icon: "warning",
      //     title: "Atención",
      //     text: updateData.MENSAJE,
      //     color: "#fff",
      //     background: "#333",
      //     confirmButtonColor: "#3085d6",
      //   });
      // }

      // Éxito: Activación/Desactivación y Actualización Completadas
      Swal.fire({
        title: "Proveedor Actualizado",
        text: `Proveedor ${formData.nombreProveedor} actualizado correctamente`,
        icon: "success",
      });

      navigate("/proveedores");
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
      <IconButton
        color="primary"
        onClick={() => navigate("/proveedores")}
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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSave}
          sx={{ backgroundColor: "#3b3a31", color: "#ffff", marginTop: 2 }}
        >
          Actualizar Proveedor
        </Button>
      </Box>
    </Box>
  );
};

export default EditarProveedor;
