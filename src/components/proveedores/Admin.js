import React, { Component, Fragment } from "react";
import ErroRes from "../erroRes/ErroRes";

import Loading from "../loading/Loading";
import SinDatos from "../sinDatos/SinDatos";
import Proveedores from "./Proveedores";

import GroupAddIcon from "@material-ui/icons/GroupAdd";

class AdminProveedores extends Component {
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
				"https://botanicainternacionalamazonas.com/backend/vista/proveedores/cargarProveedores.php",
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
				<SinDatos
					mensaje="No hay proveedores registrados"
					icon={<GroupAddIcon />}
					btn="Registrar proveedor"
					link="/crear-proveedor"
				/>
			);

		return <Fragment>{<Proveedores data={data} />}</Fragment>;
	}
}

export default AdminProveedores;
