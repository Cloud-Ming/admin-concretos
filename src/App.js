import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { UserProvider } from "./context/Context";

import { GuardProvider, GuardedRoute } from "react-router-guards";

import getIsLoggedIn from "./components/utils/getIsLoggedIn";

import Nav from "./components/nav/Nav";

import Login from "./components/login/Login";
import Admin from "./components/admin/Admin";
import Papelera from "./components/papelera/Papelera";

import NotFound from "./components/notFound/NotFound";
import Loading from "./components/loading/Loading";

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

							<GuardedRoute
								path="/admin"
								component={Admin}
								meta={{ auth: true }}
							></GuardedRoute>

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
