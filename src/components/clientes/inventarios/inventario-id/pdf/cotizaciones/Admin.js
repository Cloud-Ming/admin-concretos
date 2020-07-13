import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../../../../loading/Loading";
import Cotizacion from "./Cotizacion";

class AdminCotizaciones extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			id_cliente: null,
			nombre_proyecto: "",
		};
		// nombre_proyecto: "",
	}

	async componentDidMount() {
		const { match } = this.props;

		const id = match.params.id;
		const data = match.params.data;

		this.setState({
			nombre_proyecto: atob(data),
			id_cliente: id,
		});

		this.abortController = new AbortController();

		try {
			const response = await fetch(
				`http://botanicainternacionalamazonas.com/backend/vista/pdf/cargarPreformaId.php?id=${id}`,
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
			nombre_proyecto,
		} = this.state;

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

		return (
			<Fragment>
				<Cotizacion
					nombre_proyecto={nombre_proyecto}
					id_inventario={id_cliente}
					data={data}
				/>
			</Fragment>
		);
	}
}

export default withRouter(AdminCotizaciones);
