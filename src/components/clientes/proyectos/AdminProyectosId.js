import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../loading/Loading";

import ErroRes from "../../erroRes/ErroRes";

import NoHayProyectos from "./NoHayProyectos";
import VerProyectosId from "./VerProyectosId";

class AdminProyectosId extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nombre_cliente: null,
			loading: true,
			data: null,
			error: null,
			id_cliente: null,
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;
		const nombre_cliente = match.params.data;
		this.setState({
			nombre_cliente: atob(nombre_cliente),
			id_cliente: id,
		});

		// console.log(id);

		this.abortController = new AbortController();

		try {
			const response = await fetch(
				`https://botanicainternacionalamazonas.com/backend/vista/clientes/proyectos/cargarProyectosId.php?id=${id}`,
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
		const { error, loading, id_cliente, nombre_cliente, data } = this.state;

		if (!!error)
			return (
				<Fragment>
					<ErroRes />
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
					<NoHayProyectos nombre_cliente={nombre_cliente} data={data} id_cliente={id_cliente} />
				</Fragment>
			);

		return (
			<Fragment>
				<VerProyectosId nombre_cliente={nombre_cliente} data={data} id_cliente={id_cliente} />
			</Fragment>
		);
	}
}

export default withRouter(AdminProyectosId);
