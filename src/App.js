import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { UserProvider } from "./context/Context";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import getIsLoggedIn from "./components/utils/getIsLoggedIn";

import Nav from "./components/nav/Nav";
import Login from "./components/login/Login";

// Clientes
import AdminClientes from "./components/clientes/Admin";
import RegistroClientes from "./components/clientes/Registro";
// Clientes

// Proyectos
import CrearProyecto from "./components/clientes/proyectos/CrearProyecto";
import AdminProyectosId from "./components/clientes/proyectos/AdminProyectosId";
// Proyectos

// Inventarios
import CrearInventario from "./components/clientes/inventarios/CrearInventario";
import AdminInventariosId from "./components/clientes/inventarios/AdminInventariosId";
import AdminInventarioId from "./components/clientes/inventarios/inventario-id/AdminInventarioId";
// Inventarios

// Comisionistas
import AdminComisionistas from "./components/comisionistas/Admin";
import AdminComisionistaId from "./components/comisionistas/comisionista-id/AdminComisionista";
import CrearComisionista from "./components/comisionistas/Registro";
// Comisionistas

// Proveedores
import AdminProveedores from "./components/proveedores/Admin";
// Proveedores

// Estado de cuenta
import EstadoCuenta from "./components/clientes/estado-cuenta/Admin";
// Estado de cuenta

import Papelera from "./components/papelera/Papelera";
import NotFound from "./components/notFound/NotFound";
import Loading from "./components/loading/Loading";

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
								path="/ver-proyectos/:id/:data"
								meta={{ auth: true }}
							>
								<AdminProyectosId />
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
								path="/ver-inventario/:id/:data/:cliente"
								meta={{ auth: true }}
							>
								<AdminInventarioId />
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
								path="/ver-comisionista/:id"
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
							{/*Proveedores*/}

							{/*Estado de cuenta*/}
							<GuardedRoute
								path="/estado-cuenta/:id"
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
