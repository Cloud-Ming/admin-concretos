import React from "react";
import { Usercontext } from "../../context/Context";

import { Route } from "react-router-dom";

class GuardRoute extends React.Component {
	render() {
		
		const { type, history, ...rest } = this.props;

		const { user } = this.context;

		// if (type === "private" && !user.loggedIn) return <Redirect to="/" />;
		// else if (type === "public" && user.loggedIn)
		// 	return <Redirect to="/admin" />;

		return <Route {...rest} />;
	}
}

GuardRoute.contextType = Usercontext;

export default GuardRoute;