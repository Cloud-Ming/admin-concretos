import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../../../../loading/Loading";
import ErrorRes from "../../../../../erroRes/ErroRes";
import Facturas from "./Facturas";

class AdminCotizaciones extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			idCliente: null,
		};
		// nombre_proyecto: "",
	}

	async componentDidMount() {
		const { match } = this.props;

		const id = match.params.id;

		this.setState({
			idCliente: id,
		});

		// controller
		this.abortController = new AbortController();

		try {
			const response = await fetch(
				`https://botanicainternacionalamazonas.com/backend/vista/pdf/cargarFacturaId.php?id=${id}`,
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
		const { error, idCliente, data, loading } = this.state;

		if (!!error)
			return (
				<Fragment>
					<ErrorRes />
				</Fragment>
			);

		if (loading)
			return (
				<Fragment>
					<Loading />
				</Fragment>
			);

		return (
			<Fragment>
				<Facturas idCliente={idCliente} data={data} />
				{/*<h1>Facturas</h1>*/}
			</Fragment>
		);
	}
}

export default withRouter(AdminCotizaciones);
