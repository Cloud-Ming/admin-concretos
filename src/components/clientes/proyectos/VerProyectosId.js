import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function VerProyecto(props) {
	const proyectos = props.data;
	// console.log(proyectos);
	// console.log(btoa(proyectos[0].nombre_proyecto));
	return (
		<Fragment>
			<h1>Proyectos: {proyectos[0].nombre_proyecto}</h1>

			{proyectos.map((proyecto) => (
				<div key={proyecto.id}>
					{proyecto.nombre_proyecto} &nbsp;
					{proyecto.descripcion} &nbsp;
					{proyecto.fecha} &nbsp;
					<Link to={`/crear-inventario/${proyecto.id}`}>
						Crear inventario
					</Link>
					&nbsp;&nbsp;
					<Link to={`/ver-inventarios/${proyecto.id}/${btoa(proyectos[0].nombre_proyecto)}`}>
						Ver inventarios
					</Link>
				</div>
			))}
		</Fragment>
	);
}

export default VerProyecto;
