import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  CssBaseline,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BookIcon from "@mui/icons-material/Book";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PieChartIcon from "@mui/icons-material/PieChart";
import StoreIcon from "@mui/icons-material/Store";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import ContenedorUsuarioSesion from "../Login/ContenedorUsuarioSesion.jsx";

const drawerWidth = 240;

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const { usuarioAutenticado, deslogear } = useContext(Context);

  const usuario = JSON.parse(localStorage.getItem("Usuario")) || "";
  const permisos = JSON.parse(localStorage.getItem("Permisos")) || [];

  useEffect(() => {
    if (!usuarioAutenticado) {
      deslogear();
      navigate("/login", { replace: true });
    }
  }, [usuarioAutenticado, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ffeb3b",
          color: "black",
          height: 60,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {usuario}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#333",
            color: "#ffeb3b",
          },
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              backgroundColor: "#ffeb3b",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid black",
              height: 60,
            }}
          >
            <Typography
              sx={{
                fontSize: 30,
                color: "black",
              }}
            >
              🏍️
            </Typography>
          </Box>
        </Link>

        {/* Renderizar el menú filtrado según los permisos */}
        <Box sx={{ overflow: "auto" }}>
          <List>
            {permisos.Cuentas && (
              <ListItem component={Link} to={"/cuentas"} key={1}>
                <ListItemIcon sx={{ color: "yellow" }}>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary={"Cuentas"} sx={{ color: "yellow" }} />
              </ListItem>
            )}
            {permisos.Asientos && (
              <ListItem component={Link} to={"/asientos"} key={2}>
                <ListItemIcon sx={{ color: "yellow" }}>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={"Asientos"} sx={{ color: "yellow" }} />
              </ListItem>
            )}
            {permisos.Diarios && (
              <ListItem component={Link} to={"/diarios"} key={3}>
                <ListItemIcon sx={{ color: "yellow" }}>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary={"Diarios"} sx={{ color: "yellow" }} />
              </ListItem>
            )}
            {permisos.Mayores && (
              <ListItem component={Link} to={"/mayores"} key={4}>
                <ListItemIcon sx={{ color: "yellow" }}>
                  <FolderOpenIcon />
                </ListItemIcon>
                <ListItemText primary={"Mayores"} sx={{ color: "yellow" }} />
              </ListItem>
            )}
            {permisos.Resultados && (
              <ListItem component={Link} to={"/resultados"} key={5}>
                <ListItemIcon sx={{ color: "yellow" }}>
                  <PieChartIcon />
                </ListItemIcon>
                <ListItemText primary={"Resultados"} sx={{ color: "yellow" }} />
              </ListItem>
            )}
            {permisos.Usuarios && (
              <ListItem component={Link} to={"/usuarios"} key={5}>
                <ListItemIcon sx={{ color: "yellow" }}>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} sx={{ color: "yellow" }} />
              </ListItem>
            )}
            <ListItem
              component={Link}
              to={"/alta-proveedor"}
              key={"alta-proveedor"}
            >
              <ListItemIcon sx={{ color: "yellow" }}>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Alta Proveedor"}
                sx={{ color: "yellow" }}
              />
            </ListItem>

            <ListItem
              component={Link}
              to={"/alta-producto"}
              key={"alta-producto"}
            >
              <ListItemIcon sx={{ color: "yellow" }}>
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText
                primary={"Alta Producto"}
                sx={{ color: "yellow" }}
              />
            </ListItem>

            <ContenedorUsuarioSesion />
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          p: 3,
          ml: `${drawerWidth}px`,
          mt: "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
