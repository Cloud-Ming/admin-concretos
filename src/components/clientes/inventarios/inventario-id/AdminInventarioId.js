import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import Loading from "../../../loading/Loading";
import ErroRes from "../../../erroRes/ErroRes";
import InventarioId from "./InventarioId";

class AdminInventarios extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			idInventario: null,
			nombreCliente: null,
			nombreProyecto: null,
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const data = match.params.data;
		const nombreCliente = match.params.cliente;
		const id = match.params.id;

		this.setState({
			nombreProyecto: atob(data),
			nombreCliente: nombreCliente,
			idInventario: id,
		});

		this.abortController = new AbortController();

		try {
			const response = await fetch(
				`https://botanicainternacionalamazonas.com/backend/vista/clientes/inventarios/cargarInventarioId.php?id=${id}`,
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
			nombreProyecto,
			idInventario,
			nombreCliente,
			data,
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
					<h1> No existe inventario </h1>
					<Link to={`/crear-inventario/${this.state.idInventario}`}>
						Crear inventario
					</Link>
				</Fragment>
			);

		return (
			<Fragment>
				<InventarioId
					nombreCliente={nombreCliente}
					nombreProyecto={nombreProyecto}
					idInventario={idInventario}
					data={data}
				/>
			</Fragment>
		);
	}
}

export default withRouter(AdminInventarios);
