import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "../context/Context.jsx";
import AppLayout from "./AppLayout";
import AltaCuenta from "../Cuentas/AltaCuenta";
import FormularioCuenta from "../Cuentas/FormularioCuenta";
import FormularioAsiento from "../Asientos/FormularioAsiento";
import ListaMayores from "../Mayor/ListaMayores";
import ListaResultados from "../Resultado/ListaResultados";
import ListaUsuarios from "../Usuario/ListaUsuarios";
import Home from "../Home/Home";
import LoginPage from "../Login/LoginPage";
import ListaLibroDiario from "../Diario/ListaLibroDiario";
import EditarCuenta from "../Cuentas/EditarCuenta";
import MayorCuenta from "../Mayor/MayorCuenta.jsx";
import AltaProveedor from "../Abastecimientos/AltaProveedor.jsx";
import AltaProducto from "../Abastecimientos/AltaProducto.jsx";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          {/* Ruta específica para el login, sin AppLayout */}
          <Route path="/login" element={<LoginPage />} />
          {/* Rutas protegidas o con layout */}
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/cuentas" element={<FormularioCuenta />} />
                  <Route path="/alta-cuentas" element={<AltaCuenta />} />
                  <Route path="/asientos" element={<FormularioAsiento />} />
                  <Route path="/diarios" element={<ListaLibroDiario />} />
                  <Route path="/mayores" element={<MayorCuenta />} />
                  <Route path="/resultados" element={<ListaResultados />} />
                  <Route path="/usuarios" element={<ListaUsuarios />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/editar-cuenta" element={<EditarCuenta />} />
                  <Route path="/alta-proveedor" element={<AltaProveedor />} />
                  <Route path="/alta-producto" element={<AltaProducto />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
