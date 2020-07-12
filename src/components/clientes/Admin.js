import React, { Component, Fragment } from "react";

import Loading from "../loading/Loading";
import ErroRes from "../erroRes/ErroRes";
import NoHayClientes from "./NoHayClientes";
import TablaClientes from "./TablaClientes";

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
		// Inhability
		// Simulate data

		// 	this.setState({
		// 		loading: false,
		// 		data: null,
		// 	});

		this.abortController = new AbortController();

		try {
			const response = await fetch(
				"https://botanicainternacionalamazonas.com/backend/vista/clientes/cargarClientes.php",
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
					<ErroRes />
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
					<NoHayClientes />
				</Fragment>
			);
		return (
			<Fragment>
				<TablaClientes data={data} />
			</Fragment>
		);
	}
}

export default AdminClientes;
