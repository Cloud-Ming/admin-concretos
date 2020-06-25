import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function TablaClientes(props) {
	const { data } = props;

	const clientes = data;

	return (
		<Fragment>
			<h1>Clientes</h1>
			<Link to="/crear-cliente">Crear cliente</Link>

			<br />
			<br />

			{clientes.map((cliente) => (
				<div key={cliente.id}>
					<Link to={`crear-proyecto/${cliente.id}`}>
						Crear proyecto
					</Link>
					&nbsp;&nbsp;
					<Link to={`ver-proyectos/${cliente.id}`}>Ver proyectos</Link>
					&nbsp; - &nbsp;
					{cliente.nombre} &nbsp; - &nbsp;
					{cliente.email} &nbsp; - &nbsp;
					{cliente.celular} &nbsp; - &nbsp;
					{cliente.cedula}
				</div>
			))}
		</Fragment>
	);
}

export default TablaClientes;
