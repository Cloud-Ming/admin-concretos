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
			id_cliente: null,
			nombre_cliente: null,
			nombre_proyecto: "",
		};
		// nombre_proyecto: "",
	}

	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;
		const data = match.params.data;

		const nombre_cliente = match.params.cliente;

		this.setState({
			nombre_proyecto: atob(data),
			id_cliente: id,
			nombre_cliente: nombre_cliente,
		});

		// Data simulada
		// this.setState({
		// 	loading: false,
		// 	// data:null,
		// 	data: [
		// 		{
		// 			id: "17",
		// 			id_proyecto: "15",
		// 			fecha: "13/7/2020 12:08",
		// 			inventario:
		// 				'[{"id":1,"typeService":"1","service":"Bomba estacionaria","price":"987656","count":"1","iva":"19%","retencion":"0%","id_service":""}]',
		// 			gastos: "[]",
		// 			descripcion: "ihbujklmlk",
		// 			exito: "",
		// 		},
		// 	],
		// });

		// console.log(id);

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
			nombre_proyecto,
			id_cliente,
			nombre_cliente,
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
					<Link to={`/crear-inventario/${this.state.id_cliente}`}>
						Crear inventario
					</Link>
				</Fragment>
			);

		return (
			<Fragment>
				<InventarioId
					id_cliente={id_cliente}
					nombre_cliente={nombre_cliente}
					nombre_proyecto={nombre_proyecto}
					data={data}
				/>
			</Fragment>
		);
	}
}

export default withRouter(AdminInventarios);
