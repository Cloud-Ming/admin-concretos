import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";

import Loading from "../loading/Loading";
import NoHayComisionistas from "./NoHayComisionistas"
import TablaComisionistas from "./TablaComisionistas";

class AdminClientes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
		};

		this.marcarComoImportante = this.marcarComoImportante.bind(this);
	}

	async componentDidMount() {
		this.abortController = new AbortController();

		try {
			const response = await fetch(
				"https://botanicainternacionalamazonas.com/backend/vista/comisionistas/cargarComisionistas.php",
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

	marcarComoImportante(id) {
		console.log(id);
	}

	render() {
		const { error, loading, data } = this.state;
		// console.log(data);
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

		if (data === null)
			return (
				<Fragment>
					<NoHayComisionistas />
				</Fragment>
			);

		return (
			<Fragment>
				{/*<Link to={`/crear-comisionista/`}>Crear comisionista</Link>*/}
				<TablaComisionistas data={data} />
			</Fragment>
		);
	}
}

export default AdminClientes;
