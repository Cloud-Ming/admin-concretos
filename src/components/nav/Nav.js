import React, { useContext } from "react";
import { Usercontext } from "../../context/Context";
import { Link, withRouter } from "react-router-dom";

// Matrial ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

// Icons
import AddCircleIcon from "@material-ui/icons/AddCircle";

// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import Delete from "@material-ui/icons/Delete";
import Business from "@material-ui/icons/Business";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GroupIcon from "@material-ui/icons/Group";
import Assignment from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";

// Styles
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "#4e637b",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

// Component
function Nav({ history }) {
  const { user, logout } = useContext(Usercontext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerMenu, setDrawerMenu] = React.useState({
    right: false,
    left: false,
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logoutIng = () => {
    handleMenuClose();
    logout();
    history.push("/");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/*<MenuItem onClick={handleMenuClose}>Mi perfil</MenuItem>*/}
      {/*<MenuItem onClick={handleMenuClose}>Ajustes</MenuItem>*/}
      <MenuItem onClick={logoutIng}>Cerrar sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerMenu({ ...drawerMenu, [anchor]: open });
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/*     <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem>*/}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {<p>{user.loggedIn ? user.name : "Perfil"} &nbsp;&nbsp;</p>}
      </MenuItem>
    </Menu>
  );

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={Link} to="/clientes">
          <ListItemIcon>
            <Business />
            {/*<SupervisorAccountIcon />*/}
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>

        <ListItem button component={Link} to="/crear-cliente">
          <ListItemIcon>
            <AddCircleIcon />
            {/*<SupervisorAccountIcon />*/}
          </ListItemIcon>
          <ListItemText primary="Registrar cliente" />
        </ListItem>

        <ListItem disabled button component={Link} to="/proyectos">
          <ListItemIcon>
            <BusinessCenter />
            {/*<SupervisorAccountIcon />*/}
          </ListItemIcon>
          <ListItemText primary="Proyectos" />
        </ListItem>

        <ListItem disabled button component={Link} to="/inventarios">
          <ListItemIcon>
            <Assignment />
            {/*<SupervisorAccountIcon />*/}
          </ListItemIcon>
          <ListItemText primary="Inventarios" />
        </ListItem>

        <ListItem disabled button component={Link} to="/inventarios">
          <ListItemIcon>
            <AssessmentIcon />
            {/*<SupervisorAccountIcon />*/}
          </ListItemIcon>
          <ListItemText primary="Estados de cuenta" />
        </ListItem>

        <Divider />

        <ListItem button component={Link} to="/comisionistas">
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Comisionistas" />
        </ListItem>

        <ListItem button component={Link} to="/crear-comisionista">
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Registrar comisionista" />
        </ListItem>

        <Divider />
        <ListItem button component={Link} to="/proveedores">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Proveedores" />
        </ListItem>

        <ListItem button component={Link} to="/crear-proveedor">
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Registrar proveedor" />
        </ListItem>

        {/*    <ListItem button component={Link} to="/admin">
          <ListItemIcon>
            <Business />
          </ListItemIcon>
          <ListItemText primary="Administrador" />
        </ListItem>*/}

        <Divider />

   {/*    <ListItem button component={Link} to="/papelera">
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Papelera" />
        </ListItem>*/}
      </List>
    </div>
  );

  // Styles
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        {user.loggedIn ? (
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography className={classes.title} variant="h6" noWrap>
              Super Concretos S.A.S
            </Typography>
            {/*
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            */}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/*
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>*/}
              {<p>{user.loggedIn ? user.name : "Perfil"} &nbsp;&nbsp;</p>}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        ) : (
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Super Concretos
            </Typography>
          </Toolbar>
        )}
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerMenu["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default withRouter(Nav);
