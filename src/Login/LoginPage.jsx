import { useContext, useEffect, useState } from "react";
import "./loginpage.css"; // Asegúrate de que el archivo style.css esté en la misma carpeta o ajusta la ruta según corresponda
import Swal from "sweetalert2"; // Libreria de alertas y popups personalizadas
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import { Context } from "../context/Context";

const ip = "localhost:3002";

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
}); // seteo de la alerta que aparece en el login

function encriptar(password) {
  const hash = CryptoJS.SHA256(password);
  const textoCifrado = hash.toString(CryptoJS.enc.Hex);
  return textoCifrado;
}

const LoginPage = () => {
  const { usuarioAutenticado, logear } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

  async function login(mail, clave) {
    const hashClave = encriptar(clave);
    let fetchLogin = await fetch(`http://${ip}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Usuario: mail,
        Passw: hashClave,
      }),
    });

    fetchLogin = await fetchLogin.json(); //AUTHErr (True o false) indica si hubo un error con el token,
    //ERROR (true o false)
    //ESTADO (true o false) indica si hubo error en el servidor,
    //MENSAJE (String que muesta el resultado en palabras),
    return fetchLogin;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el envío del formulario

    login(email, password)
      .then((resultadoLogin) => {
        if (resultadoLogin.ERROR) {
          setError(true);
          console.log(resultadoLogin.MENSAJE);
          Toast.fire({
            icon: "error",
            title: "Error de credenciales",
            text: resultadoLogin.MENSAJE,
          });
        } else {
          // Redirigir a la página principal
          logear(
            resultadoLogin.MENSAJE,
            resultadoLogin.token,
            resultadoLogin.permisos
          );
          setError(false);
          Toast.fire({
            icon: "success",
            title: "Sesión iniciada",
            text: resultadoLogin.MENSAJE,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Error inesperado.",
        });
      });
  };

  useEffect(() => {
    if (usuarioAutenticado) {
      navigate("/", { replace: true });
    }
  }, [usuarioAutenticado, navigate]);

  return (
    <div className="login-container">
      <div className="fondo">
        <form onSubmit={handleSubmit}>
          <h1>Abel Hernandez motos🏍️</h1>

          <div className="input-box">
            <input
              type="email" // Tipo "email", no "text" para poder revisar si contiene "@"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <EmailIcon
              sx={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#fff",
              }}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LockIcon
              sx={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#fff",
              }}
            />
          </div>

          {error && (
            <div id="password-error" className="error-message">
              La contraseña es inválida
            </div>
          )}

          <button type="submit" className="btn">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
