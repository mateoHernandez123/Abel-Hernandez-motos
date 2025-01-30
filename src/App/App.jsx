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
import AltaProveedor from "../Abastecimientos/Proveedor/AltaProveedor.jsx";
import AltaProducto from "../Abastecimientos/Productos/AltaProducto.jsx";
import FormularioSolicitudCompra from "../Abastecimientos/SolicitudDeCompra/FormularioSolicitudCompra.jsx";
import FormularioOrdenCompra from "../Abastecimientos/OrdenDeCompra/FormularioOrdenCompra.jsx";
import FiltrarProductos from "../Abastecimientos/Productos/FiltrarProductos.jsx";
import FiltrarProveedor from "../Abastecimientos/Proveedor/FiltrarProveedor.jsx";
import EditarProveedor from "../Abastecimientos/Proveedor/EditarProveedor.jsx";
import EditarProducto from "../Abastecimientos/Productos/EditarProducto.jsx";
import DetalleSolicitud from "../Abastecimientos/SolicitudDeCompra/DetalleSolicitud.jsx";
import GeneradorPresupuestos from "../Abastecimientos/Presupuesto/GeneradorPresupuestos.jsx";
import PresupuestoDetalle from "../Abastecimientos/Presupuesto/PresupuestoDetalle.jsx";
import VisualizarProducto from "../Abastecimientos/Productos/VisualizarProducto.jsx";

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
                  <Route
                    path="/solicitud-compra"
                    element={<FormularioSolicitudCompra />}
                  />
                  <Route
                    path="/orden-compra"
                    element={<FormularioOrdenCompra />}
                  />
                  <Route path="/productos" element={<FiltrarProductos />} />
                  <Route path="/proveedores" element={<FiltrarProveedor />} />
                  <Route
                    path="/editar-proveedor/:cuit"
                    element={<EditarProveedor />}
                  />
                  <Route
                    path="/editar-producto/:codigo"
                    element={<EditarProducto />}
                  />
                  <Route
                    path="/detalle-solicitud/:id"
                    element={<DetalleSolicitud />}
                  />
                  <Route
                    path="/presupuesto/"
                    element={<GeneradorPresupuestos />}
                  />
                  <Route
                    path="/presupuestos"
                    element={<PresupuestoDetalle />}
                  />
                  <Route
                    path="/visualizar-producto/:codigo"
                    element={<VisualizarProducto />}
                  />
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
