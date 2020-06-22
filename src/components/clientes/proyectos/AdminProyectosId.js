import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import Loading from "../../loading/Loading";
import VerProyectosId from "./VerProyectosId";

class AdminProyectosId extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			id_cliente: null,
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;

		this.setState({
			id_cliente: id,
		});

		console.log(id);

		this.abortController = new AbortController();

		try {
			const response = await fetch(
				`https://botanicainternacionalamazonas.com/backend/vista/clientes/cargarProyectosId.php?id=${id}`,
				{
					signal: this.abortController.signal,
				}
			);

			if (response.status >= 300) throw new Error(response.statusText);

			const data = await response.json();

			this.setState({ loading: false, data });
		} catch (e) {
			if (e.name !== "AbortError") this.setState({ error: e.message });
		}
	}

	componentWillUnmount() {
		this.abortController.abort();
	}

	render() {
		const { error, loading, data } = this.state;

		if (!!error)
			return (
				<Fragment>
					<h2>{error}</h2>
					<p>A ocurrido un error</p>
				</Fragment>
			);

		if (loading)
			return (
				<Fragment>
					<Loading />
				</Fragment>
			);

		// Si no hay proyectos ...
		if (data === null)
			return (
				<Fragment>
					<h1> No hay proyectos </h1>
					<Link to={`/crear-proyecto/${this.state.id_cliente}`}>
						Crear Poyecto
					</Link>
				</Fragment>
			);

		return (
			<Fragment>
				<VerProyectosId data={data} />
			</Fragment>
		);
	}
}

export default withRouter(AdminProyectosId);
