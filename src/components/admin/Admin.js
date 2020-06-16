import React, { Component, Fragment } from "react";
import TablaSorting from "./TablaSorting";


class Admin extends Component {
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
				"https://jsonplaceholder.typicode.com/users/",
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
		const { data, error, loading } = this.state;
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
				<h2>Cargando ...</h2>
				</Fragment>
			);

		return (
			<Fragment>
				<TablaSorting
					data={data}
					marcarComoImportante={this.marcarComoImportante}
				/>
			</Fragment>
		);
	}
}

export default Admin;
