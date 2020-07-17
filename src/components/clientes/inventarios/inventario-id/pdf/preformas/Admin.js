import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../../../../loading/Loading";
import ErrorRes from "../../../../../erroRes/ErroRes";
import Preformas from "./Preformas";

class AdminCotizaciones extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			idCliente: null,
			nombreProyecto: "",
		};
		// nombre_proyecto: "",
	}

	async componentDidMount() {
		const { match } = this.props;

		const id = match.params.id;
		const proyecto = match.params.data;

		this.setState({
			idCliente: id,
			nombreProyecto: atob(proyecto),
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
			data,
			idCliente,
			nombreProyecto,
			loading,
		} = this.state;

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
				<Preformas idInventario={idCliente} nombreProyecto={nombreProyecto} inventario={this.props.data[0].inventario} data={data} />
			</Fragment>
		);
	}
}

export default withRouter(AdminCotizaciones);
