import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../../../../loading/Loading";
import ErroRes from "../../../../../erroRes/ErroRes";
import NoHayComisionistas from "./NoHayComisionistas";
import FormComisionistas from "./FormComisionistas";

class AdminCotizaciones extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			comisiones: null,
			error: null,
			idCliente: null,
			nombreProyecto: null,
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;
		const nombreProyecto = match.params.data;

		this.setState({
			idCliente: id,
			nombreProyecto: nombreProyecto,
		});

		// ESTADO SIMULADO
		/*this.setState({
			id_cliente: id,
			nombre_proyecto: nombre_proyecto,
			data: [
				{
					id: "1",
					fecha: "2020-06-29",
					nombre: "Andres felipe arboleda londo\u00f1o",
					celular: "3207846771",
					info_comisiones: '[{"id":1}]',
				},
				{
					id: "2",
					fecha: "4/7/2020 11:21:36",
					nombre: "Edward cruz",
					celular: "30000",
					info_comisiones: "[]",
				},
			],
			comisiones: [
				{
					id: "6",
					id_unico: "kcgfltar",
					id_inventario: "1",
					inventario: "Casas Edward",
					id_comisionista: "2",
					comisionista: "Edward cruz",
					monto: "200000",
					fecha: "10/7/2020 11:25:41",
					pago: "false",
				},
				{
					id: "2",
					id_unico: "kcgf706z",
					id_inventario: "1",
					inventario: "Proyecto de prueba 3",
					id_comisionista: "1",
					comisionista: "Andres felipe arboleda londo\u00f1o",
					monto: "100000",
					fecha: "10/7/2020 11:14:10",
					pago: "false",
				},
			],
			loading: false,
		});*/
		// ESTADO SIMULADO

		// this.abortController = new AbortController();

		Promise.all([
			fetch(
				"http://botanicainternacionalamazonas.com/backend/vista/comisionistas/cargarComisionistas.php",
			),
			fetch(
				`https://botanicainternacionalamazonas.com/backend/vista/comisionistas/comisionistaId.php?id=${id}`,
			),
		])
			.then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
			.then(([data1, data2]) =>
				this.setState({
					data: data1,
					comisiones: data2,
					loading: false,
				})
			);
	}

	// componentWillUnmount() {
	// 	this.abortController.abort();
	// }

	render() {
		const {
			error,
			loading,
			idCliente,
			nombreProyecto,
			data,
			comisiones,
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
					<NoHayComisionistas />
				</Fragment>
			);

		return (
			<Fragment>
				<FormComisionistas
					idCliente={idCliente}
					nombreProyecto={nombreProyecto}
					data={data}
					comisionesData={comisiones}
				/>
			</Fragment>
		);
	}
}

export default withRouter(AdminCotizaciones);
