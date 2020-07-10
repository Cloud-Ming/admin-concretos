import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../loading/Loading";
import Tabla from "./Tabla";

class EstadoCuenta extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			id_cliente: null,
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;

		this.setState({
			id_cliente: id,
		});

		// console.log(id);

		const simuleResponse = [
			{
				id: "7",
				id_proyecto: "1",
				fecha: "2020-06-25",
				inventario:
					'[{"id":1,"service":"bomba","price":"200000","count":"1", "iva": "0.19", "retencion": "0.4", "id_service":"0"}]',
				gastos: "0",
				descripcion: "60 casas",
			},
			{
				id: "5",
				id_proyecto: "1",
				fecha: "2020-06-23",
				inventario:
					'[{"id":5,"service":"Concreto","price":"120000","count":"2", "iva": "0.25","retencion": "0.1","id_service":"1"}]',
				gastos: "0",
				descripcion: "Proyecto bomba estacionaria",
			},
			{
				id: "2",
				id_proyecto: "1",
				fecha: "2020-06-23",
				inventario:
					'[{"id":2,"service":"Concreto","price":"110000","count":"2","iva": "0.19", "retencion": "0", "id_service":"2"},{"id":2,"service":"Bomba","price":"130000","count":"6", "iva": "0.19%", "retencion": "0", "id_service":"0"}]',
				gastos: "0",
				descripcion: "Proyecto zeta",
			},
			{
				id: "1",
				id_proyecto: "1",
				fecha: "2020-06-23",
				inventario:
					'[{"id":2,"service":"Concreto 2","price":"320000","count":"1", "iva": "0.25", "retencion": "0", "id_service":"0"},{"id":3,"service":"Maquinaria","price":"320000","count":"3", "iva": "0.19", "retencion": "0", "id_service":"0"},{"id":4,"service":"Bomba","price":"300000","count":"6", "iva": "0.19", "retencion": "0", "id_service":"0"}]',
				gastos: "0",
				descripcion: "Proyecto casas",
			},
		];
		setTimeout(() => {
			this.setState({ loading: false, data: simuleResponse });
		}, 500);

		// this.abortController = new AbortController();

		// try {
		// 	const response = await fetch(
		// 		`https://botanicainternacionalamazonas.com/backend/vista/clientes/inventarios/cargarInventariosId.php?id=${id}`,
		// 		{
		// 			signal: this.abortController.signal,
		// 		}
		// 	);

		// 	if (response.status >= 300) throw new Error(response.statusText);

		// 	const data = await response.json();

		// 	this.setState({ loading: false, data });
		// } catch (e) {
		// 	if (e.name !== "AbortError") this.setState({ error: e.message });
		// }
	}

	// componentWillUnmount() {
	// 	this.abortController.abort();
	// }

	render() {
		const { error, loading, data, id_cliente } = this.state;

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

		// Si no hay proyectos ...
		if (data === null)
			return (
				<Fragment>
					<h1> No hay estados de cuenta </h1>
					{/*<Link to={`/crear-proyecto/${this.state.id_cliente}`}>
						Crear estados de cuenta
					</Link>*/}
				</Fragment>
			);

		return (
			<Fragment>
				<Tabla data={data} id_cliente={id_cliente} />
			</Fragment>
		);
	}
}

export default withRouter(EstadoCuenta);
