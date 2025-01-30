import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";

// Pasos de la solicitud
const steps = ["Inicio", "Presupuestada", "Comprometida", "Ingresada", "Finalizada"];

// Estilo personalizado del conector
const CustomConnector = styled(StepConnector)({
  "& .MuiStepConnector-line": {
    borderColor: "#1976d2", // Azul fijo
    borderWidth: 2,
  },
});

const DetalleSolicitud = () => {
  const { id } = useParams(); // Obtener el ID de la solicitud desde la URL
  const [activeStep, setActiveStep] = useState(0); // Paso activo
  const [loading, setLoading] = useState(true); // Estado de carga
  const [solicitud, setSolicitud] = useState(null); // Datos de la solicitud

  useEffect(() => {
    const fetchSolicitud = async () => {
      setLoading(true);

      // Mock de datos de las solicitudes
      const solicitudesMock = {
        1: {
          nro: 1,
          producto: "Televisor",
          proveedor: "Proveedor A",
          fecha: "2025-01-20",
          estado: "Presupuestada",
          progreso: 1,
        },
        2: {
          nro: 2,
          producto: "Laptop",
          proveedor: "Proveedor B",
          fecha: "2025-01-18",
          estado: "Comprometida",
          progreso: 2,
        },
        3: {
          nro: 3,
          producto: "Celular",
          proveedor: "Proveedor C",
          fecha: "2025-01-15",
          estado: "Finalizada",
          progreso: 4,
        },
      };

      // Obtener la solicitud correspondiente
      const solicitudData = solicitudesMock[id];
      if (solicitudData) {
        setSolicitud(solicitudData);
        setActiveStep(solicitudData.progreso);
      }
      setLoading(false);
    };

    fetchSolicitud();
  }, [id]);

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Cargando detalles de la solicitud...
      </Typography>
    );
  }

  if (!solicitud) {
    return (
      <Typography variant="h6" align="center" color="error">
        Solicitud no encontrada.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Detalle de la Solicitud de Compra
      </Typography>

      {/* Progreso de la solicitud */}
      <Box sx={{ margin: "2rem 0" }}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<CustomConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    "&.Mui-active": {
                      color: "#1976d2", // Color azul para el paso activo
                    },
                    "&.Mui-completed": {
                      color: "#388e3c", // Color verde para pasos completados
                    },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Detalles de la solicitud */}
      <Paper elevation={3} sx={{ padding: "1.5rem", marginTop: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Información de la Solicitud
        </Typography>
        <Typography>
          <strong>N° Solicitud:</strong> {solicitud.nro}
        </Typography>
        <Typography>
          <strong>Producto:</strong> {solicitud.producto}
        </Typography>
        <Typography>
          <strong>Proveedor:</strong> {solicitud.proveedor}
        </Typography>
        <Typography>
          <strong>Fecha:</strong> {solicitud.fecha}
        </Typography>
        <Typography>
          <strong>Estado:</strong> {solicitud.estado}
        </Typography>
      </Paper>
    </Box>
  );
};

export default DetalleSolicitud;
