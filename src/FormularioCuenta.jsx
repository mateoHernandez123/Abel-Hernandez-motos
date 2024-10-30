import { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Context } from "./context/Context";
import Swal from "sweetalert2";

const FormularioCuenta = () => {
  const [cuentas, setCuentas] = useState([]); // Estado para las cuentas listadas
  const [cuentasRaices, setCuentasRaices] = useState([]); // Estado para las cuentas raíces
  const [loading, setLoading] = useState(false); // Estado de carga

  const { usuarioAutenticado, deslogear, IP, tokenError } = useContext(Context);
  const navigate = useNavigate();

  // Petición al cargar el componente para obtener las cuentas raíces
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
            color: "#fff",
            background: "#333",
            confirmButtonColor: "#3085d6",
          });
        } else if (data.ERROR) {
          Swal.fire({
            icon: "warning",
            title: "Atención",
            text: data.MENSAJE,
            color: "#fff",
            background: "#333",
            confirmButtonColor: "#3085d6",
          });
        } else {
          setCuentasRaices(data.Raices || []); // Establecer las cuentas raíces
        }
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

    fetchCuentasRaices();
  }, [IP, tokenError]);

  // Función para listar cuentas hijas según la categoría
  const handleListarCategoria = async (codigoCuenta) => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const response = await fetch(`${IP}/api/cuentas/obtenertodoshijos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo: codigoCuenta, // Enviar el codigo de la cuenta raíz
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
        setCuentas(data.Hijos || []); // Establecer las cuentas hijas
      }
    } catch (error) {
      Swal.fire({
        title: "Error en la carga de datos",
        icon: "error",
        text: "Hubo un problema al conectar con el servidor.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarCuenta = () => {
    navigate("/alta-cuentas");
  };

  const handleEditClick = (cuenta) => {
    navigate("/editar-cuenta", { state: { cuenta } });
  };

  return (
    <Box
      sx={{
        p: 5,
        padding: 4,
        backgroundColor: "#ffeb3b",
        color: "#3b3a31",
        borderRadius: 5,
        width: "900px",
        maxWidth: "100%",
        margin: "auto",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Título y botón "+" */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ color: "#333" }}>
          Gestión de Cuentas
        </Typography>
        <IconButton
          onClick={handleAgregarCuenta}
          sx={{
            backgroundColor: "#ffeb3b",
            "&:hover": { backgroundColor: "#fdd835" },
            color: "#333",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Generar botones dinámicamente a partir de cuentasRaices */}
      {cuentasRaices.length > 0 ? (
        cuentasRaices.map((cuentaRaiz) => (
          <Button
            key={cuentaRaiz.codigo}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#333",
              color: "#ffff",
              mb: 2,
              "&:hover": { backgroundColor: "#555" },
            }}
            onClick={() => handleListarCategoria(cuentaRaiz.codigo)} // Se envía el nombre de la cuenta raíz
          >
            {`Listar ${cuentaRaiz.nombre}`}
          </Button>
        ))
      ) : (
        <Typography>No hay cuentas raíces disponibles.</Typography>
      )}

      {/* Mostrar el listado de cuentas hijas */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Listado de Cuentas
      </Typography>
      {loading ? (
        <Typography>Cargando cuentas...</Typography>
      ) : (
        <List>
          {cuentas.length > 0 ? (
            cuentas.map((cuenta) => (
              <ListItem
                key={cuenta.codigo}
                sx={{ backgroundColor: "#fff", mb: 1, borderRadius: 1 }}
              >
                <ListItemText
                  primary={`${cuenta.codigo} - ${cuenta.nombre}`}
                  secondary={cuenta.descripcion}
                />
                <IconButton
                  onClick={() => handleEditClick(cuenta)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography>No hay cuentas disponibles.</Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default FormularioCuenta;
