import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import { useParams } from "react-router-dom";
  import { useState, useEffect } from "react";
  import Swal from "sweetalert2";
  
  // Componente VisualizarProducto
  const VisualizarProducto = () => {
    const { codigo } = useParams();
    const [producto, setProducto] = useState(null);
    const [compras, setCompras] = useState([]);
  
    useEffect(() => {
      // Simulando la obtención de datos de un producto
      const fetchProducto = async () => {
        try {
          const productosMock = [
            {
              codigo: "P001",
              nombre: "Televisor",
              descripcion: "Televisor Samsung QLED 55 pulgadas",
              // Otros campos del producto...
            },
          ];
          const productoEncontrado = productosMock.find((p) => p.codigo === codigo);
          setProducto(productoEncontrado);
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo cargar el producto",
            icon: "error",
          });
        }
      };
  
      const fetchCompras = async () => {
        try {
          const comprasMock = [
            {
              proveedor: "Proveedor A",
              fechaCompra: "12/01/2023",
              cantidad: 5,
              precioCompra: 800,
            },
            // Otras compras...
          ];
          setCompras(comprasMock);
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudieron cargar las compras",
            icon: "error",
          });
        }
      };
  
      fetchProducto();
      fetchCompras();
    }, [codigo]);
  
    return (
      <Box sx={{ padding: 4, backgroundColor: "#e6e2d5", borderRadius: 5 }}>
        {producto ? (
          <>
            <Typography
              variant="h4"
              sx={{
                marginBottom: 4,
                color: "#333",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Detalles del Producto
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                color: "#333",
              }}
            >
              <strong>Código:</strong> {producto.codigo}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                color: "#333",
              }}
            >
              <strong>Nombre:</strong> {producto.nombre}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 4,
                color: "#333",
              }}
            >
              <strong>Descripción:</strong> {producto.descripcion}
            </Typography>
  
            <Typography
              variant="h4"
              sx={{
                marginBottom: 4,
                color: "#333",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Compras Realizadas
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                marginBottom: 4,
                borderRadius: 5,
              }}
            >
              <Table
                sx={{
                  fontSize: "1.5rem",
                  "& .MuiTableCell-root": {
                    borderColor: "black",
                    borderWidth: "1px",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                        borderColor: "black",
                        textAlign: "center",
                        backgroundColor: "#ffeb3b",
                      }}
                    >
                      Proveedor
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                        borderColor: "black",
                        textAlign: "center",
                        backgroundColor: "#ffeb3b",
                      }}
                    >
                      Fecha de Compra
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                        borderColor: "black",
                        textAlign: "center",
                        backgroundColor: "#ffeb3b",
                      }}
                    >
                      Cantidad
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                        borderColor: "black",
                        textAlign: "center",
                        backgroundColor: "#ffeb3b",
                      }}
                    >
                      Precio de Compra
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compras.map((compra, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          fontSize: "1.1rem",
                          borderColor: "black",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}
                      >
                        {compra.proveedor}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.1rem",
                          borderColor: "black",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}
                      >
                        {compra.fechaCompra}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.1rem",
                          borderColor: "black",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}
                      >
                        {compra.cantidad}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.1rem",
                          borderColor: "black",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}
                      >
                        {compra.precioCompra}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography
            variant="h5"
            sx={{
              color: "red",
              textAlign: "center",
            }}
          >
            No se encontró el producto.
          </Typography>
        )}
      </Box>
    );
  };
  
  export default VisualizarProducto;
  