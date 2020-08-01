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
			nombreProyecto: "",
			idInventario: null,
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const cliente = match.params.cliente;
		const data = match.params.data;
		const id = match.params.id;

		this.setState({
			nombreCliente: atob(cliente),
			nombreProyecto: atob(data),
			idInventario: id,
		});
		
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
			idInventario,
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
						link={`/crear-inventario/${idInventario}/${btoa(
							nombreProyecto
						)}/${btoa(nombreCliente)}`}
					/>
				</Fragment>
			);

		return (
			<Fragment>
				<VerInventariosId
					idInventario={idInventario}
					nombre_cliente={nombreCliente}
					nombre_proyecto={nombreProyecto}
					data={data}
				/>
			</Fragment>
		);
	}
}

export default withRouter(AdminInventarios);
