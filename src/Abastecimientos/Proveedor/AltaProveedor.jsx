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
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar esto
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios"; // Importar axios para llamadas HTTP

const AltaProveedor = () => {
  const { usuarioAutenticado, deslogear } = useContext(Context); // Mueve el useContext aquí
  const navigate = useNavigate(); // Mueve el useNavigate aquí

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("UsuarioAutenticado"))) {
      deslogear();
      navigate("/login", { replace: true });
    }
  }, [usuarioAutenticado, navigate, deslogear]); // Asegúrate de incluir `deslogear` como dependencia

  const handleListarProveedores = () => {
    navigate("/proveedores");
  };

  const [formData, setFormData] = useState({
    nombreProveedor: "",
    razonSocial: "",
    cuit: "",
    telefono: "",
    correo: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    banco: "",
    numeroCuenta: "",
    cbu: "",
    tipoProveedor: "",
    rubro: "",
    proveedorActivo: false,
    calificacion: "",
    comentarios: "",
  });

  const tiposProveedores = ["Minorista", "Mayorista", "Exportador", "Otro"];
  const rubros = ["Tecnología", "Soporte"];
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  // Obtener provincias al montar el componente
  useEffect(() => {
    axios
      .get("https://apis.datos.gob.ar/georef/api/provincias")
      .then((response) => {
        setProvincias(response.data.provincias);
      })
      .catch((error) => {
        console.error("Error al obtener provincias:", error);
      });
  }, []);

  // Manejar cambio de provincia
  const handleProvinciaChange = (e) => {
    const provinciaId = e.target.value;
    setFormData({
      ...formData,
      provincia: provinciaId,
      ciudad: "",
      codigoPostal: "",
    });
    console.log(provinciaId);
    // Obtener ciudades de la provincia seleccionada
    axios
      .get(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaId}&campos=nombre&max=1000`
      )
      .then((response) => {
        setCiudades(response.data.municipios); // Corrige a 'municipios'
      })
      .catch((error) => {
        console.error("Error al obtener ciudades:", error);
      });
  };

  // Manejar cambio de ciudad
  const handleCiudadChange = (e) => {
    const ciudadSeleccionada = ciudades.find(
      (ciudad) => ciudad.nombre === e.target.value
    );
    setFormData({
      ...formData,
      ciudad: ciudadSeleccionada?.nombre || "",
      codigoPostal: ciudadSeleccionada?.codigo_postal || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    const {
      nombreProveedor,
      razonSocial,
      cuit,
      telefono,
      correo,
      direccion,
      ciudad,
      provincia,
      codigoPostal,
    } = formData;

    if (
      !nombreProveedor ||
      !razonSocial ||
      !cuit ||
      !telefono ||
      !correo ||
      !direccion ||
      !ciudad ||
      !provincia ||
      !codigoPostal
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor complete todos los campos obligatorios.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Proveedor Agregado",
      text: "El proveedor ha sido registrado con éxito.",
      icon: "success",
    });

    console.log("Datos del proveedor:", formData);
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
        onClick={handleListarProveedores}
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
        sx={{ marginBottom: 2, color: "#333", textAlign: "center" }}
      >
        Alta de Proveedor
      </Typography>

      <Typography variant="h6">Datos Principales</Typography>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Nombre del Proveedor"
          name="nombreProveedor"
          value={formData.nombreProveedor}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Razón Social"
          name="razonSocial"
          value={formData.razonSocial}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="CUIT"
          name="cuit"
          value={formData.cuit}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Correo Electrónico"
          name="correo"
          value={formData.correo}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          margin="normal"
        />
        <Typography variant="h6">Ubicación</Typography>
        <Box mb={3}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Provincia</InputLabel>
            <Select
              name="provincia"
              value={formData.provincia}
              onChange={handleProvinciaChange}
            >
              {provincias.map((provincia) => (
                <MenuItem key={provincia.id} value={provincia.id}>
                  {provincia.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" disabled={!formData.provincia}>
            <InputLabel>Ciudad</InputLabel>
            <Select
              name="ciudad"
              value={formData.ciudad}
              onChange={handleCiudadChange}
            >
              {ciudades?.length > 0 &&
                ciudades.map((ciudad) => (
                  <MenuItem key={ciudad.id} value={ciudad.nombre}>
                    {ciudad.nombre}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Código Postal"
            name="codigoPostal"
            value={formData.codigoPostal}
            margin="normal"
          />
        </Box>
      </Box>

      <Typography variant="h6">Datos Bancarios</Typography>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Banco"
          name="banco"
          value={formData.banco}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Número de Cuenta"
          name="numeroCuenta"
          value={formData.numeroCuenta}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="CBU"
          name="cbu"
          value={formData.cbu}
          onChange={handleInputChange}
          margin="normal"
          required
        />
      </Box>

      <Typography variant="h6">Tipo y Artículos Asociados</Typography>
      <Box mb={3}>
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

      <Typography variant="h6">Otros Atributos</Typography>
      <Box mb={3}>
        <FormControlLabel
          control={
            <Checkbox
              name="proveedorActivo"
              checked={formData.proveedorActivo}
              onChange={handleInputChange}
            />
          }
          label="Proveedor Activo"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#333",
            justifyContent: "center",
          }}
        />
        <TextField
          fullWidth
          label="Calificación"
          name="calificacion"
          value={formData.calificacion}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Comentarios"
          name="comentarios"
          value={formData.comentarios}
          onChange={handleInputChange}
          margin="normal"
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        onClick={handleSubmit}
        sx={{ backgroundColor: "#3b3a31", color: "#ffff", marginTop: 2 }}
      >
        Agregar Proveedor
      </Button>
    </Box>
  );
};

export default AltaProveedor;
