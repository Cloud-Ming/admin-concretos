import React, { Component, Fragment } from "react";
import ErroRes from "../erroRes/ErroRes";

import Loading from "../loading/Loading";
import NoHayProveedores from "./NoHayProveedores";
import Proveedores from "./Proveedores";

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
	// async componentDidMount() {
		// Data : Null or [data]

	// 	this.setState({
	// 		loading: false,
	// 		// data: null,
	// 		data: [
	// 			{
	// 				id: "1",
	// 				proveedor: "Pruebas sas",
	// 				email: "sas@gmail.com",
	// 				celular: "320108288",
	// 				id_servicio: "0",
	// 				producto: "Cemento",
	// 				monto: "100000",
	// 				fecha_creacion: "13/7/2020 9:14:59",
	// 			},
	// 			{
	// 				id: "2",
	// 				proveedor: "Otra prueba",
	// 				email: "otraPruebaSas@gmail.com",
	// 				celular: "320108288",
	// 				id_servicio: "0",
	// 				producto: "Cemento",
	// 				monto: "100000",
	// 				fecha_creacion: "13/7/2020 9:14:59",
	// 			},
	// 		],
	// 	});
	// }

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

		if (data === null) return <NoHayProveedores />;

		return (
			<Fragment>
				{/*<h1>Admin Proveedores</h1>*/}
				{<Proveedores data={data} />}
			</Fragment>
		);
	}
}

export default AdminProveedores;
