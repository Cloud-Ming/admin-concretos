import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Business from "@material-ui/icons/Business";

const noHayProyectos = (props) => {
	const { id_cliente, nombre_cliente}  = props;
	// console.log('DATA', nombre_cliente);

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
				<h1> No hay proyectos ({nombre_cliente})</h1>
				<Button
						component={Link}
						to={`/crear-proyecto/${id_cliente}/${btoa(nombre_cliente)}`}
						variant="contained"
						color="primary"
						startIcon={<Business />}
					>
						Crear proyecto
					</Button>
				{/*<Link to={`/crear-proyecto/${id_cliente}/${btoa(nombre_cliente)}`}>Crear Poyecto</Link>*/}
			</div>
		</Fragment>
	);
};
export default noHayProyectos;
