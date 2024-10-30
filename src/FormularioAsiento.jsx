import { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "./context/Context";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const FormularioAsiento = () => {
  const [filas, setFilas] = useState([
    { cuenta: "", debe: "", haber: "" }, // Dos filas iniciales
    { cuenta: "", debe: "", haber: "" },
  ]);

  // Establecer la fecha actual en el estado
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  const formattedTime = today.toTimeString().split(" ")[0].slice(0, 5); // HH:MM

  // Estados iniciales
  const [fecha, setFecha] = useState(formattedDate);
  const [hora, setHora] = useState(formattedTime);
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(""); // Estado para manejar el error de sumatoria
  const [fechaUltimoAsiento, setFechaUltimoAsiento] = useState("");
  const [horaUltimoAsiento, setHoraUltimoAsiento] = useState("");
  const [cuentasHojas, setCuentasHojas] = useState([]);

  // Actualizar la hora actual cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setHora(currentTime.toTimeString().split(" ")[0].slice(0, 5)); // Actualizar a HH:MM
    }, 60000); // Actualiza cada minuto

    return () => clearInterval(timer); // Limpiar intervalo al desmontar el componente
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(`${IP}/api/asientos/ultimoasiento`, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.AuthErr) tokenError(result.MENSAJE);
        else if (result.ServErr || result.ERROR) {
          Swal.fire({
            title: result.ERROR ? "Atención" : "Error",
            icon: result.ERROR ? "warning" : "error",
            text: result.MENSAJE,
          });
        } else {
          // Asumiendo que result.Fecha y result.Hora están en formato adecuado
          const formattedDate = result.Fecha.split("T")[0]; // Si resulta en un ISO string
          const formattedTime = result.Hora.split(":").slice(0, 2).join(":"); // Obtén HH:MM

          // Configura el estado
          setFechaUltimoAsiento(formattedDate); // Fecha en formato YYYY-MM-DD
          setHoraUltimoAsiento(formattedTime); // Hora en formato HH:MM
        }
      })
      .catch(() =>
        Swal.fire(
          "Error",
          "No se pudo enviar la información al servidor",
          "error"
        )
      );
  }, []);
  // Manejar el cambio en el campo de fecha
  const handleFechaChange = (e) => {
    const selectedDate = e.target.value;

    // Validar que la fecha seleccionada esté dentro del rango permitido
    if (selectedDate >= fechaUltimoAsiento && selectedDate <= formattedDate) {
      setFecha(selectedDate);
      setError("");
    } else {
      setError("La fecha seleccionada no es válida.");
    }
  };

  const handleHoraChange = (e) => {
    const selectedTime = e.target.value;

    // Convertir la fecha y la hora a un objeto Date para comparar
    const [horaUltimo, minutosUltimo] = horaUltimoAsiento.split(":");
    const ultimoAsientoDateTime = new Date(fechaUltimoAsiento);
    ultimoAsientoDateTime.setHours(horaUltimo, minutosUltimo);

    // Obtener la fecha y hora actuales
    const hoy = new Date();
    const selectedDateTime = new Date(ultimoAsientoDateTime); // Crea una nueva instancia basada en el último asiento
    const [selectedHours, selectedMinutes] = selectedTime.split(":");
    selectedDateTime.setHours(selectedHours, selectedMinutes);

    // Validar si la hora seleccionada está dentro del rango
    if (selectedDateTime < ultimoAsientoDateTime || selectedDateTime > hoy) {
      Swal.fire({
        title: "Error",
        text: "La hora seleccionada debe estar entre la fecha del último asiento y la fecha actual.",
        icon: "error",
      });
    } else {
      setHora(selectedTime); // Si es válida, establece la hora
    }
  };

  // Función para manejar el cambio en el campo descripción
  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  // Manejar el cambio en los campos de una fila
  const handleFilaChange = async (index, event) => {
    const { name, value } = event.target;
    const nuevasFilas = [...filas];
    if (name === "cuenta") {
      nuevasFilas[index].cuenta = value;
    }
    if (name === "debe") {
      nuevasFilas[index].debe = value;
      nuevasFilas[index].haber = "0";
    }

    if (name === "haber") {
      nuevasFilas[index].haber = value;
      nuevasFilas[index].debe = "0";
    }

    setFilas(nuevasFilas);
  };

  // Agregar una nueva fila
  const agregarFila = () => {
    setFilas([...filas, { cuenta: "", debe: "", haber: "" }]);
  };

  // Eliminar una fila
  const eliminarFila = (index) => {
    if (filas.length > 2) {
      const nuevasFilas = filas.filter((_, i) => i !== index);
      setFilas(nuevasFilas);
    } else {
      setError(
        `No se puede eliminar más filas, ya que el minimo de filas es 2.`
      );
    }
  };

  // Calcular la sumatoria de las columnas "Debe" y "Haber"
  const calcularSumatorias = () => {
    const totalDebe = filas.reduce(
      (sum, fila) => sum + parseFloat(fila.debe || 0),
      0
    );
    const totalHaber = filas.reduce(
      (sum, fila) => sum + parseFloat(fila.haber || 0),
      0
    );
    return { totalDebe, totalHaber };
  };

  // Función para manejar el envío al backend
  const crearAsiento = async (event) => {
    event.preventDefault();
    setError(null); // Limpiar cualquier error previo

    const { totalDebe, totalHaber } = calcularSumatorias();

    // Verificar que el debe y el haber estén balanceados
    if (totalDebe !== totalHaber) {
      setError(
        `La sumatoria del Debe (${totalDebe}) debe ser igual a la del Haber (${totalHaber}).`
      );
      return;
    }

    if ((totalDebe == 0) & (totalHaber == 0)) {
      setError(`No se puede registrar un asiento con valores nulos.`);
      return;
    }

    // Preparar el objeto para enviar al backend
    const data = {
      Descripcion: descripcion,
      Fecha: fecha,
      Hora: hora,
      Registros: filas.map((fila) => ({
        Cuenta: fila.cuenta,
        Debe: parseFloat(fila.debe),
        Haber: parseFloat(fila.haber),
      })),
    };

    // Aquí podrías descomentar la lógica de envío al servidor
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await fetch(`${IP}/api/asientos/registrarasiento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.AuthErr) {
        tokenError(result.MENSAJE);
      } else if (result.ServErr) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: result.MENSAJE,
          color: "#fff",
          background: "#333",
          confirmButtonColor: "#3085d6",
        });
      } else if (result.ERROR) {
        Swal.fire({
          icon: "warning",
          title: "Atención",
          text: result.MENSAJE,
          color: "#fff",
          background: "#333",
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: result.MENSAJE,
          color: "#fff",
          background: "#333",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar la información al servidor",
        icon: "error",
        color: "#fff",
        background: "#333",
        confirmButtonColor: "#3085d6",
      });
    }

    //Setea los campos:
    setFilas([
      { cuenta: "", debe: "", haber: "" }, // resetea en dos filas
      { cuenta: "", debe: "", haber: "" },
    ]);
    setDescripcion("");
  };

  const { usuarioAutenticado, deslogear, IP, tokenError } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    const verificarUsuario = async () => {
      if (!JSON.parse(localStorage.getItem("UsuarioAutenticado"))) {
        deslogear();
        navigate("/login", { replace: true });
      } else {
        try {
          const token = JSON.parse(localStorage.getItem("accessToken"));
          let resultado = await fetch(`${IP}/api/cuentas/obtenerhojas`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, //Esto hay que hacerlo con todos, filtra las entradas
            },
          });
          resultado = await resultado.json(); // Aquí estaba `.JSON()`, debe ser `.json()`

          if (resultado.AuthErr) {
            tokenError(resultado.MENSAJE);
          } else if (resultado.ServErr) {
            Toast.fire({
              title: "Error",
              icon: "error",
              text: resultado.MENSAJE,
            });
          } else {
            if (resultado.ERROR) {
              Toast.fire({
                icon: "warning",
                title: "Atención",
                text: resultado.MENSAJE,
              });
            }
            setCuentasHojas(resultado.Hojas);
          }
        } catch (err) {
          console.log(err);
          Toast.fire({
            title: "Error en la carga de datos. Recargar la pagina",
            icon: "warning",
          });
        }
      }
    };

    verificarUsuario(); // Llama a la función asíncrona
  }, [usuarioAutenticado, deslogear, navigate, IP, Swal]); // Asegúrate de agregar todas las dependencias necesarias

  return (
    <Box
      sx={{
        backgroundColor: "#ffeb3b",
        color: "#3b3a31",
        padding: 4,
        borderRadius: 5,
        width: "900px", // Ancho fijo
        maxWidth: "100%", // Ajusta en móviles si es necesario
        margin: "auto",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Alta de Asiento Contable
      </Typography>

      <form onSubmit={crearAsiento}>
        {/* Campo de fecha */}
        <TextField
          label="Fecha"
          type="date"
          name="fecha"
          value={fecha}
          onChange={handleFechaChange}
          fullWidth
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
          // Establecer el máximo como la fecha actual
          inputProps={{
            min: fechaUltimoAsiento, // Limitar la fecha mínima
            max: formattedDate, // Limitar la fecha máxima
          }}
          required
        />
        {/* Campo de hora */}
        <TextField
          label="Hora"
          type="time"
          name="hora"
          value={hora}
          onChange={handleHoraChange}
          fullWidth
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
          // Establecer el máximo como la hora actual
          inputProps={{
            min: fecha === fechaUltimoAsiento ? horaUltimoAsiento : undefined, // Limitar la hora mínima si es la fecha del último asiento
            max: fecha === formattedDate ? formattedTime : undefined, // Limitar la hora máxima si es la fecha actual
          }}
          required
        />
        {/* Campo de descripcion */}
        <TextField
          label="Descripcion"
          type="text"
          name="descripcion"
          value={descripcion}
          onChange={handleDescripcionChange}
          fullWidth
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* Fila con los campos de cuenta, debe, haber, y eliminar */}
        {filas.map((fila, index) => (
          <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
            <Grid item xs={5}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Cuenta</InputLabel>
                <Select
                  label="Cuenta"
                  value={fila.cuenta} // Aquí mostramos el valor actual de cuenta en la fila
                  name="cuenta"
                  onChange={(event) => handleFilaChange(index, event)}
                  required
                >
                  {/* Muestra "Seleccione una cuenta" si cuentasHojas está vacío */}
                  {cuentasHojas.length === 0 ? (
                    <MenuItem disabled value="">
                      Seleccione una cuenta
                    </MenuItem>
                  ) : (
                    cuentasHojas
                      .filter(
                        (cuenta) =>
                          !filas.some(
                            (f, i) => f.cuenta === cuenta.codigo && i !== index
                          )
                      )
                      .map((cuenta) => (
                        <MenuItem key={cuenta.codigo} value={cuenta.codigo}>
                          {cuenta.codigo} - {cuenta.nombre}
                        </MenuItem>
                      ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Debe"
                name="debe"
                value={fila.debe}
                onChange={(event) => handleFilaChange(index, event)}
                fullWidth
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*([.][0-9]{0,2})?",
                }}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Haber"
                name="haber"
                value={fila.haber}
                onChange={(event) => handleFilaChange(index, event)}
                fullWidth
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*([.][0-9]{0,2})?",
                }}
                required
              />
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton onClick={() => eliminarFila(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        {/* Mostrar el mensaje de error*/}
        {error && (
          <Alert
            severity="error"
            sx={{ marginBottom: 2 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setError("")} // Aquí eliminamos el mensaje de error
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}
        {/* Botón para agregar una fila nueva */}
        <Button
          variant="outlined"
          onClick={agregarFila}
          fullWidth
          sx={{ color: "#3b3a31", borderColor: "#3b3a31", marginBottom: 2 }}
          startIcon={<AddIcon />}
        >
          Agregar Fila
        </Button>
        {/* Botón para crear asiento */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ backgroundColor: "#3b3a31", color: "#ffff", marginTop: 2 }}
        >
          Crear Asiento
        </Button>
      </form>
    </Box>
  );
};

export default FormularioAsiento;
