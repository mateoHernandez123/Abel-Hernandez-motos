import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import swal from'sweetalert2';
import '../css/boton.css'

export default function ContenedorUsuarioSesion() {

  const {deslogear} = useContext(Context);
  const navigate = useNavigate();

  const InfoUsuario = swal.mixin({
    toast: false,
    position: "center",
    showConfirmButton: true,
    showCloseButton: true,
    width: 70+'%',
    confirmButtonText: `Cerrar sesión`,
    confirmButtonColor: '#d33',
    background: '#333',
    color: '#fff'
  });

  function pantallaUsuarioSesion(){
    let u = JSON.parse(localStorage.getItem('Usuario'));
    InfoUsuario.fire({
      icon: 'info',
      title: 'Usuario: '+u
    }).then((result) =>{
      if(result.isConfirmed){
        deslogear();
        navigate('/login', {replace: true})
      }
    });
  }



  return (
    <div className='contenedor-usuarioSesion'>
      <button className='btn btn-outline-primary' id='boton-usuario-sesion'
        onClick={pantallaUsuarioSesion}>
        Sesión actual{' '}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi-medio bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg> */}
      </button>
    </div>
  )
}
