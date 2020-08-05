import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import HeaderApp from "./components/header/HeaderApp";

//Configuracion login
import { UserProvider } from "./context/Context";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import getIsLoggedIn from "./components/utils/getIsLoggedIn";

import Nav from "./components/nav/Nav";
import Login from "./components/login/Login";

// Clientes
import AdminClientes from "./components/clientes/Admin";
import RegistroClientes from "./components/clientes/Registro";

// Proyectos
import CrearProyecto from "./components/clientes/proyectos/CrearProyecto";
import AdminProyectosId from "./components/clientes/proyectos/AdminProyectosId";
import Proyectos from "./components/clientes/proyectos/Proyectos";

// Inventarios
import CrearInventario from "./components/clientes/inventarios/CrearInventario";
import AdminInventariosId from "./components/clientes/inventarios/AdminInventariosId";
import AdminInventarioId from "./components/clientes/inventarios/inventario-id/AdminInventarioId";

// Comisionistas
import AdminComisionistas from "./components/comisionistas/Admin";
import AdminComisionistaId from "./components/comisionistas/comisionista-id/AdminComisionista";
import CrearComisionista from "./components/comisionistas/Registro";

// Proveedores
import AdminProveedores from "./components/proveedores/Admin";
import CrearProveedores from "./components/proveedores/CrearProveedores";

// Estado de cuenta
import EstadoCuenta from "./components/clientes/estado-cuenta/Admin";

import Papelera from "./components/papelera/Papelera";
import NotFound from "./components/notFound/NotFound";
import Loading from "./components/loading/Loading";

// icons

// Login
const requireLogin = (to, from, next) => {
	if (to.meta.auth) {
		if (getIsLoggedIn()) {
			next().redirect("/clientes");
		}
		next.redirect("/");
	} else {
		next();
	}
};

function App() {
	return (
		<Fragment>
			<Router>
				<GuardProvider
					guards={[requireLogin]}
					loading={Loading}
					error={NotFound}
				>
					<UserProvider>
						<Nav />

						<HeaderApp />

						<Switch>
							<GuardedRoute path="/" exact meta={{ auth: true }}>
								<Login />
							</GuardedRoute>

							{/*Clientes*/}
							<GuardedRoute
								path="/clientes"
								meta={{ auth: true }}
							>
								<AdminClientes />
							</GuardedRoute>

							<GuardedRoute
								path="/crear-cliente"
								meta={{ auth: true }}
							>
								<RegistroClientes />
							</GuardedRoute>
							{/*Clientes*/}

							{/*Proyectos*/}
							<GuardedRoute
								path="/crear-proyecto/:id/:cliente"
								meta={{ auth: true }}
							>
								<CrearProyecto />
							</GuardedRoute>

							<GuardedRoute
								path="/ver-proyectos/:id/:cliente"
								meta={{ auth: true }}
							>
								<AdminProyectosId />
							</GuardedRoute>

							<GuardedRoute
								path="/proyectos"
								meta={{ auth: true }}
							>
								<Proyectos />
							</GuardedRoute>
							{/*Proyectos*/}

							{/*Inventarios*/}
							<GuardedRoute
								path="/crear-inventario/:id/:proyecto/:cliente"
								meta={{ auth: true }}
							>
								<CrearInventario />
							</GuardedRoute>

							<GuardedRoute
								path="/ver-inventarios/:id/:data/:cliente"
								meta={{ auth: true }}
							>
								<AdminInventariosId />
							</GuardedRoute>

							<GuardedRoute
								path="/ver-inventario/:id/:data/:cliente/:id_i"
								meta={{ auth: true }}
							>
								<AdminInventarioId />
							</GuardedRoute>

							<GuardedRoute
								path="/inventarios"
								meta={{ auth: true }}
							>
								<h1>Inventarios</h1>
							</GuardedRoute>
							{/*Inventarios*/}

							{/*Comisionistas*/}
							<GuardedRoute
								path="/comisionistas"
								meta={{ auth: true }}
							>
								<AdminComisionistas />
							</GuardedRoute>

							<GuardedRoute
								path="/crear-comisionista"
								meta={{ auth: true }}
							>
								<CrearComisionista />
							</GuardedRoute>

							<GuardedRoute
								path="/ver-comisionista/:id/:comisionista"
								meta={{ auth: true }}
							>
								<AdminComisionistaId />
							</GuardedRoute>
							{/*Comisionistas*/}

							{/*Proveedores*/}
							<GuardedRoute
								path="/proveedores"
								meta={{ auth: true }}
							>
								<AdminProveedores />
							</GuardedRoute>

							<GuardedRoute
								path="/crear-proveedor"
								meta={{ auth: true }}
							>
								<CrearProveedores />
							</GuardedRoute>
							{/*Proveedores*/}

							{/*Estado de cuenta*/}
							<GuardedRoute
								path="/estado-cuenta/:id/:cliente"
								meta={{ auth: true }}
							>
								<EstadoCuenta />
							</GuardedRoute>
							{/*Estado de cuenta*/}

							<GuardedRoute
								path="/papelera"
								meta={{ auth: true }}
							>
								<Papelera />
							</GuardedRoute>

							{/*No funciona*/}
							<GuardedRoute path="*">
								<NotFound />
							</GuardedRoute>
							{/*No funciona*/}
						</Switch>
					</UserProvider>
				</GuardProvider>
			</Router>
		</Fragment>
	);
}

export default App;
