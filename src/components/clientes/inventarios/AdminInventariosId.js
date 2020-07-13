import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../loading/Loading";
import ErroRes from "../../erroRes/ErroRes";

import NoHayInventarios from "./NoHayInventarios";

import VerInventariosId from "./VerInventariosId";

class AdminInventarios extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			nombre_cliente: null,
			id_cliente: null,
			nombre_proyecto: "",
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;

		const data = match.params.data;

		const cliente = match.params.cliente;

		this.setState({
			nombre_proyecto: atob(data),
			nombre_cliente: atob(cliente),
			id_cliente: id,
		});

		// DATA SIMULADA
		/*this.setState({
		loading: false,
		data: []
		});*/

		// Inhability

		this.abortController = new AbortController();

		try {
			const response = await fetch(
				`https://botanicainternacionalamazonas.com/backend/vista/clientes/inventarios/cargarInventariosId.php?id=${id}`,
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
		const {
			error,
			loading,
			data,
			id_cliente,
			nombre_cliente,
			nombre_proyecto,
		} = this.state;

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
					<NoHayInventarios
						id_cliente={id_cliente}
						nombre_cliente={nombre_cliente}
						nombre_proyecto={nombre_proyecto}
					/>
				</Fragment>
			);

		return (
			<Fragment>
				<VerInventariosId
					id_cliente={id_cliente}
					nombre_cliente={nombre_cliente}
					nombre_proyecto={nombre_proyecto}
					data={data}
				/>
			</Fragment>
		);
	}
}

export default withRouter(AdminInventarios);
