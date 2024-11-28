import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const EditarCuenta = () => {
  const { state } = useLocation();
  const { cuenta } = state || {}; // Datos de la cuenta seleccionada
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: cuenta?.nombre || "",
    descripcion: cuenta?.descripcion || "",
    activa: cuenta?.activa || false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, activa: e.target.checked });
  };

  const handleSaveChanges = async () => {
    // Lógica para guardar los cambios realizados
    Swal.fire({
      title: "Cuenta actualizada",
      text: "La cuenta fue editada con éxito.",
      icon: "success",
      color: "#fff",
      background: "#333",
      confirmButtonColor: "#3085d6",
    });
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la cuenta de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      background: "#333",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar la cuenta
        Swal.fire({
          title: "Eliminada",
          text: "La cuenta ha sido eliminada.",
          icon: "success",
          color: "#fff",
          background: "#333",
          confirmButtonColor: "#3085d6",
        });
        navigate(-1); // Regresar a la vista anterior
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
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
        onClick={handleBack}
        sx={{
          backgroundColor: "#ffeb3b",
          "&:hover": { backgroundColor: "#fdd835" },
          color: "#333",
          mb: 2,
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography
        variant="h4"
        sx={{ marginBottom: 2, color: "#333", textAlign: "center" }}
      >
        Editar Cuenta
      </Typography>

      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: 2 }}
        required
      />

      <TextField
        label="Descripción"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={formData.activa}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          label="Cuenta Activa"
        />

        <IconButton
          onClick={handleDeleteAccount}
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        onClick={handleSaveChanges}
        fullWidth
        sx={{ backgroundColor: "#3b3a31", color: "white", marginTop: 2 }}
      >
        Guardar Cambios
      </Button>
    </Box>
  );
};

export default EditarCuenta;
