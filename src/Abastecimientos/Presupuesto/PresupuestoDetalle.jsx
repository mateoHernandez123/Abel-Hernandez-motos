import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";

const PresupuestoDetalle = () => {
  const location = useLocation();
  const presupuestos = location.state?.presupuestos || [];
  const [seleccionados, setSeleccionados] = useState({});
  const [cantidades, setCantidades] = useState({});

  const toggleSeleccion = (proveedor, producto) => {
    setSeleccionados((prev) => {
      const nuevos = { ...prev };
      if (!nuevos[proveedor]) {
        nuevos[proveedor] = [];
      }
      if (nuevos[proveedor].some((p) => p.id === producto.id)) {
        nuevos[proveedor] = nuevos[proveedor].filter((p) => p.id !== producto.id);
      } else {
        nuevos[proveedor].push({ ...producto, cantidad: cantidades[producto.id] || producto.cantidad });
      }
      return nuevos;
    });
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    setCantidades((prev) => ({ ...prev, [productoId]: nuevaCantidad }));
  };

  const generarArchivo = () => {
    const detalles = Object.entries(seleccionados).map(([proveedor, productos]) => {
      return `Proveedor: ${proveedor}\nProductos:\n${productos.map((p) => `${p.nombre} - Cantidad: ${p.cantidad}`).join("\n")}`;
    });
    const blob = new Blob([detalles.join("\n\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "presupuestos.txt";
    link.click();
  };

  return (
    <div>
      <h2>Detalles de Presupuesto</h2>
      {presupuestos.map(([proveedor, productos]) => (
        <TableContainer component={Paper} key={proveedor}>
          <h3>{proveedor}</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seleccionar</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>
                    <Checkbox
                      checked={seleccionados[proveedor]?.some((p) => p.id === producto.id) || false}
                      onChange={() => toggleSeleccion(proveedor, producto)}
                    />
                  </TableCell>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>{producto.descripcion || "Sin descripción"}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={cantidades[producto.id] || producto.cantidad}
                      onChange={(e) => actualizarCantidad(producto.id, e.target.value)}
                      inputProps={{ min: 1 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
      <Button variant="contained" color="primary" onClick={generarArchivo} disabled={Object.keys(seleccionados).length === 0}>
        Generar Archivo
      </Button>
    </div>
  );
};

export default PresupuestoDetalle;
