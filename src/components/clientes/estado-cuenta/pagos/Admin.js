import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import ErroRes from "../../../erroRes/ErroRes";
import Loading from "../../../loading/Loading";
//import NohayEstadosDeCuenta from "./NohayEstadosDeCuenta";

import Pagos from "./Pagos";

class EstadoCuenta extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			idCliente: null,
		};
	}

	async componentDidMount() {
		const { match } = this.props;

		const id = match.params.id;

		this.setState({
			idCliente: id,
		});

		// console.log(id);

		this.abortController = new AbortController();

		try {
			const response = await fetch(
				`https://botanicainternacionalamazonas.com/backend/vista/estados-cuenta/cargarPagos.php?id=${id}`,
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
		const { error, loading, idCliente, data } = this.state;

		if (error)
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
		// if (data === null)
		// 	return (
		// 		<Fragment>
		// 			<NohayEstadosDeCuenta cliente={cliente} />
		// 		</Fragment>
		// 	);

		return (
			<Fragment>
				<Pagos idCliente={idCliente} pagos={data} />
			</Fragment>
		);
	}
}

export default withRouter(EstadoCuenta);
