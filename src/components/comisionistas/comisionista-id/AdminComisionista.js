import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../loading/Loading";
import ErroRes from "../../erroRes/ErroRes";
import SinDatos from "../../sinDatos/SinDatos";

import ComisionistaId from "./ComisionistaId";

import GroupAddIcon from "@material-ui/icons/GroupAdd";

class AdminComisionistas extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null,
			error: null,
			id_cliente: null,
			comisionista: null,
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;

		const comisionista = match.params.comisionista;

		this.setState({
			id_cliente: id,
			comisionista: comisionista,
		});

		console.log("ID:", id);

		this.abortController = new AbortController();

		try {
			const response = await fetch(
				`https://botanicainternacionalamazonas.com/backend/vista/comisionistas/verInfoComisionistas.php?id=${id}`,
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
		const { error, loading, id_cliente, comisionista, data } = this.state;

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
					<SinDatos
						mensaje="No hay comisiones registradas"
						icon={<GroupAddIcon />}
						btn="Ver comisionistas"
						link="/comisionistas"
					/>
				</Fragment>
			);

		return (
			<Fragment>
				<ComisionistaId
					id_cliente={id_cliente}
					comisionista={comisionista}
					data={data}
				/>
			</Fragment>
		);
	}
}

export default withRouter(AdminComisionistas);
