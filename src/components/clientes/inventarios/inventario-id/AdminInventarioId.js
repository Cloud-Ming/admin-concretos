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

		// this.setState({
		// 	loading: false,
		// 	data: [
		// 		{
		// 			id: "1",
		// 			id_proyecto: "1",
		// 			fecha: "2020-06-23",
		// 			inventario:
		// 				'[{"id":2,"service":"Concreto 2","price":"32000","count":"1"},{"id":3,"service":"Maquinaria","price":"32000","count":"3"},{"id":4,"service":"Bomba","price":"3000","count":"6"}]',
		// 			gastos: "[]",
		// 			descripcion: "Proyecto casas",
		// 			exito: "true",
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
