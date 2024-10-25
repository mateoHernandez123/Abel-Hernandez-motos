import { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "./context/Context";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FormularioCuenta = () => {
  const [cuentas, setCuentas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    grupo: "",
    descripcion: "",
    recibeSaldo: false, // Nuevo campo para el checkbox
  });
  const [grupos, setGrupos] = useState([]); // Opciones de grupos (hijas) dinámicas
  const [tipos, setTipos] = useState([]); // Opciones de tipos (cuentas raíces)
  const [loadingGrupos, setLoadingGrupos] = useState(false); // Estado de carga para grupos
  const [loadingTipos, setLoadingTipos] = useState(true); // Estado de carga para tipos
  //const [mostrarRecibeSaldo, setMostrarRecibeSaldo] = useState(false); // Estado para mostrar el checkbox

  const { IP, tokenError } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuentasRaices = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const response = await fetch(`${IP}/api/cuentas/obtenerraices`, {
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
          });
        } else {
          setTipos(data.Raices || []); // Poblar el campo "Tipo" con las cuentas raíces
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error al cargar las cuentas raíces",
        });
      } finally {
        setLoadingTipos(false);
      }
    };

    fetchCuentasRaices();
  }, [IP, tokenError]);

  const handleAgregarCuenta = () => {
    navigate("/cuentas");
  };
  // Función para manejar los cambios en los campos
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Si se selecciona un "Tipo" (cuenta raíz), obtener los "Grupos" (cuentas hijas)
    if (name === "tipo") {
      setLoadingGrupos(true);
      setGrupos([]); // Limpiar los grupos anteriores
      //setMostrarRecibeSaldo(false); // Ocultar "Recibe Saldo" por defecto

      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const response = await fetch(`${IP}/api/cuentas/obtenerhijos`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: value, // Nombre de la cuenta raíz seleccionada
          }),
        });

        const data = await response.json();
        if (data.AuthErr) {
          tokenError(data.MENSAJE);
        } else if (data.ServErr) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.MENSAJE,
          });
        } else {
          //if (data.Hijos.length > 0) {
          //  setGrupos(data.Hijos || []); // Poblar el campo "Grupo" con las cuentas hijas
          //} else {
          //setMostrarRecibeSaldo(true); // Mostrar checkbox si no hay hijos

          const hijos = data.Hijos || [];
          // Encontramos el tipo raíz (el valor seleccionado en `tipo`)
          const tipoRaiz = tipos.find((tipo) => tipo.nombre === value);

          // Si el tipo raíz existe, lo añadimos como opción junto con los hijos
          if (tipoRaiz) {
            setGrupos([tipoRaiz, ...hijos]);
          } else {
            setGrupos(hijos);
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error al cargar los grupos",
        });
      } finally {
        setLoadingGrupos(false);
      }
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el padre de la cuenta, que puede ser la cuenta seleccionada en "tipo" o en "grupo"
    const padre =
      grupos.length > 0 && formData.grupo !== ""
        ? grupos.find((grupo) => grupo.nombre === formData.grupo)?.idcuentas
        : tipos.find((tipo) => tipo.nombre === formData.tipo)?.idcuentas;

    const Nodo = {
      nombre: formData.nombre,
      tipo: tipos.find((tipo) => tipo.nombre === formData.tipo)?.tipo, // A, P, PN, R+, R-
      recibeSaldo: formData.recibeSaldo,
      descripcion: formData.descripcion,
      padre: padre || null, // ID del padre
    };

    console.log(Nodo);

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await fetch(`${IP}/api/cuentas/abmcuentas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Nodo }),
      });

      const data = await response.json();
      if (data.AuthErr) {
        tokenError(data.MENSAJE);
      } else if (data.ServErr) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: data.MENSAJE,
        });
      } else {
        Swal.fire({
          title: "Cuenta agregada",
          icon: "success",
          text: `Cuenta ${formData.nombre} agregada correctamente`,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al agregar cuenta",
        icon: "error",
        text: "Hubo un problema al agregar la cuenta.",
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffeb3b",
        color: "black",
        padding: 4,
        borderRadius: 2,
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <IconButton
        onClick={handleAgregarCuenta}
        sx={{
          backgroundColor: "#ffeb3b",
          "&:hover": { backgroundColor: "#fdd835" },
          color: "#333",
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Alta de Cuenta Contable
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
          required
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Tipo</InputLabel>
          <Select
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            required
            disabled={loadingTipos} // Deshabilitar mientras se cargan los tipos
          >
            {loadingTipos ? (
              <MenuItem>Cargando tipos...</MenuItem>
            ) : (
              tipos.map((tipo) => (
                <MenuItem key={tipo.codigo} value={tipo.nombre}>
                  {tipo.nombre}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Mostrar el campo "Grupo" solo si hay hijos */}
        {grupos.length > 0 && (
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Grupo</InputLabel>
            <Select
              name="grupo"
              value={formData.grupo}
              onChange={handleInputChange}
              required
              disabled={loadingGrupos} // Deshabilitar mientras se cargan los grupos
            >
              {loadingGrupos ? (
                <MenuItem>Cargando grupos...</MenuItem>
              ) : (
                grupos.map((grupo) => (
                  <MenuItem key={grupo.codigo} value={grupo.nombre}>
                    {grupo.nombre}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        )}

        <TextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.recibeSaldo}
              onChange={(e) =>
                setFormData({ ...formData, recibeSaldo: e.target.checked })
              }
              name="recibeSaldo"
              color="primary"
            />
          }
          label="Recibe Saldo"
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ backgroundColor: "#3b3a31", color: "white", marginTop: 2 }}
        >
          Agregar Cuenta
        </Button>
      </form>
    </Box>
  );
};

export default FormularioCuenta;
