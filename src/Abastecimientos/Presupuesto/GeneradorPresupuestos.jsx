import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GeneradorPresupuestos = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de datos obtenidos de una API
    setSolicitudes([
      {
        id: 1,
        productos: [
          { id: "p1", nombre: "Laptop", cantidad: 2, proveedores: ["Proveedor A", "Proveedor B"] },
          { id: "p2", nombre: "Mouse", cantidad: 5, proveedores: ["Proveedor A"] },
        ],
      },
      {
        id: 2,
        productos: [
          { id: "p3", nombre: "Teclado", cantidad: 3, proveedores: ["Proveedor B"] },
        ],
      },
    ]);
  }, []);

  const toggleSeleccion = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const generarPresupuestos = () => {
    const productosSeleccionados = solicitudes
      .filter((s) => seleccionadas.includes(s.id))
      .flatMap((s) => s.productos);

    const agrupadosPorProveedor = {};
    productosSeleccionados.forEach((producto) => {
      producto.proveedores.forEach((proveedor) => {
        if (!agrupadosPorProveedor[proveedor]) {
          agrupadosPorProveedor[proveedor] = [];
        }
        agrupadosPorProveedor[proveedor].push({
          id: producto.id,
          nombre: producto.nombre,
          cantidad: producto.cantidad,
        });
      });
    });

    navigate("/presupuestos", { state: { presupuestos: Object.entries(agrupadosPorProveedor) } });
  };

  return (
    <div>
      <h2>Generador de Presupuestos</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seleccionar</TableCell>
              <TableCell>ID Solicitud</TableCell>
              <TableCell>Productos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((sol) => (
              <TableRow key={sol.id}>
                <TableCell>
                  <Checkbox
                    checked={seleccionadas.includes(sol.id)}
                    onChange={() => toggleSeleccion(sol.id)}
                  />
                </TableCell>
                <TableCell>{sol.id}</TableCell>
                <TableCell>
                  {sol.productos.map((p) => (
                    <div key={p.id}>{p.nombre} (x{p.cantidad})</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={generarPresupuestos} disabled={seleccionadas.length === 0}>
        Generar Presupuestos
      </Button>
    </div>
  );
};

export default GeneradorPresupuestos;
