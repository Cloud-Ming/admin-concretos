import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { UserProvider } from "./context/Context";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import getIsLoggedIn from "./components/utils/getIsLoggedIn";
import Nav from "./components/nav/Nav";
import Login from "./components/login/Login";

// import Admin from "./components/admin/Admin";

// Clientes
import AdminClientes from "./components/clientes/Admin";
import RegistroClientes from "./components/clientes/Registro";
import CrearProyecto from "./components/clientes/proyectos/CrearProyecto";
import AdminProyectosId from "./components/clientes/proyectos/AdminProyectosId";
// Clientes

import Papelera from "./components/papelera/Papelera";
import NotFound from "./components/notFound/NotFound";
import Loading from "./components/loading/Loading";
// import Pdfs from "./components/pdfs/Pdf";

const requireLogin = (to, from, next) => {
	if (to.meta.auth) {
		if (getIsLoggedIn()) {
			next().redirect("/admin");
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

							<GuardedRoute
								path="/crear-proyecto/:id"
								meta={{ auth: true }}
							>
								<CrearProyecto />
							</GuardedRoute>

							<GuardedRoute
								path="/ver-proyecto/:id"
								meta={{ auth: true }}
							>
								<AdminProyectosId />
							</GuardedRoute>

							{/*Clientes*/}

							<GuardedRoute path="/admin" meta={{ auth: true }}>
								{/*<Admin />*/}
								<h1>Admin</h1>
							</GuardedRoute>

							<GuardedRoute
								path="/papelera"
								meta={{ auth: true }}
							>
								<Papelera />
							</GuardedRoute>

							<GuardedRoute path="*">
								<NotFound />
							</GuardedRoute>
						</Switch>
					</UserProvider>
				</GuardProvider>
			</Router>
		</Fragment>
	);
}

export default App;
