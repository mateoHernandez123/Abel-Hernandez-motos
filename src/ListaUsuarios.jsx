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

const ListaUsuarios = () => {
  // Datos de Usuarios
  const usuarios = [
    { email: "mateo@hernandez", nombre: "Mateo Hernandez", rol: "admin" },
    { email: "ana@lopez", nombre: "Ana Lopez", rol: "usuario" },
    { email: "juan@perez", nombre: "Juan Perez", rol: "usuario" },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#e6e2d5",
        borderRadius: 5,
        margin: "1.2rem",
      }}
    >
      <Typography variant="h4" sx={{ fontSize: "2rem" }}>
        Lista de Usuarios
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#ffeb3b",
          marginTop: 3,
          width: "800px",
          borderRadius: 5,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Nombre de Usuario
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Rol
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {usuario.email}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {usuario.nombre}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>{usuario.rol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaUsuarios;
