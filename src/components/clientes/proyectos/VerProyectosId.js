import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function VerProyecto(props) {
	const proyectos = props.data;
	// console.log(proyectos);

	return (
		<Fragment>
			<h1>Proyecto</h1>

			{proyectos.map((proyecto) => (
				<div key={proyecto.id}>
					{proyecto.nombre_proyecto} &nbsp;
					{proyecto.descripcion} &nbsp;
					{proyecto.fecha} &nbsp;
					<Link to={`/crear-inventario/${proyecto.id_cliente}`}>
						Crear inventario
					</Link>
					&nbsp;&nbsp;
					<Link to={`/ver-inventarios/${proyecto.id_cliente}`}>
						Ver inventarios
					</Link>
				</div>
			))}
		</Fragment>
	);
}

export default VerProyecto;
