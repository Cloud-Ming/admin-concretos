import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../loading/Loading";
import ErroRes from "../../erroRes/ErroRes";

import SinDatos from "../../sinDatos/SinDatos";

import VerInventariosId from "./VerInventariosId";

import Assignment from "@material-ui/icons/Assignment";

class AdminInventarios extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			nombreCliente: null,
			idCliente: null,
			nombreProyecto: "",
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;

		const data = match.params.data;

		const cliente = match.params.cliente;

		this.setState({
			nombreProyecto: atob(data),
			nombreCliente: atob(cliente),
			idCliente: id,
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
			idCliente,
			nombreCliente,
			nombreProyecto,
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
					<SinDatos
						mensaje="No hay inventarios registrados"
						icon={<Assignment />}
						btn="Registrar inventario"
						link={`/crear-inventario/${idCliente}/${btoa(
							nombreProyecto
						)}/${btoa(nombreCliente)}`}
					/>
				</Fragment>
			);

		return (
			<Fragment>
				<VerInventariosId
					id_cliente={idCliente}
					nombre_cliente={nombreCliente}
					nombre_proyecto={nombreProyecto}
					data={data}
				/>
			</Fragment>
		);
	}
}

export default withRouter(AdminInventarios);
