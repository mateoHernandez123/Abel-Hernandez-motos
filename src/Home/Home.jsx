import { Box } from "@mui/material";
import motoImage from "../image/fondo.jpg";
import { useContext, useEffect } from "react";
import {Context} from '../context/Context';
import { useNavigate, replace } from "react-router-dom";
const Home = () => {

  const { usuarioAutenticado, deslogear} = useContext(Context)
  const navigate = useNavigate();
  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem('UsuarioAutenticado'))){
      deslogear();
      navigate('/login', {replace: true})
    }
  },[usuarioAutenticado, navigate])

  return (
    <Box
      sx={{
        backgroundColor: "#ffeb3b", // Fondo amarillo
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Imagen de una moto */}
      <img
        src={motoImage} // Reemplaza con la URL de tu imagen
        alt="Moto"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </Box>
  );
};

export default Home;
