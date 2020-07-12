import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const noHayProyectos = (props) => {
	const { id_cliente, nombre_cliente, nombre_proyecto } = props;
	// console.log('DATA', nombre_proyecto);

	return (
		<Fragment>
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<h1>Proyecto <b>({nombre_proyecto})</b> no tiene inventarios</h1>
				<h3 style={{ marginTop: "0" }}>
					
					Cliente: {nombre_cliente}
				</h3>

				<Link
					to={`/crear-inventario/${id_cliente}/${btoa(
						nombre_proyecto
					)}/${btoa(nombre_cliente)}`}
				>
					Crear primer inventario
				</Link>
			</div>
		</Fragment>
	);
};
export default noHayProyectos;
