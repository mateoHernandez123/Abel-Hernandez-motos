import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ContextProvider} from './context/Context.jsx'
import AppLayout from "./AppLayout";
import AltaCuenta from "./AltaCuenta";
import FormularioCuenta from "./FormularioCuenta";
import FormularioAsiento from "./FormularioAsiento";
import MayorCuenta from "../src/MayorCuenta.jsx";
import ListaResultados from "./ListaResultados";
import ListaUsuarios from "./ListaUsuarios";
import Home from "./Home";
import LoginPage from "./LoginPage";
import ListaLibroDiario from "./ListaLibroDiario";
import EditarCuenta from "./EditarCuenta";

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
