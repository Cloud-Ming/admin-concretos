import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Typography from "@material-ui/core/Typography";

const noHayProyectos = (props) => {
	const { id_cliente, nombre_cliente } = props;
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
				<Typography variant="h4" component="h3">
					{" "}
					No hay proyectos ({nombre_cliente})
				</Typography>
				<Button
					component={Link}
					to={`/crear-proyecto/${id_cliente}/${btoa(nombre_cliente)}`}
					variant="contained"
					color="primary"
					startIcon={<BusinessCenter />}
				>
					Crear proyecto
				</Button>
				{/*<Link to={`/crear-proyecto/${id_cliente}/${btoa(nombre_cliente)}`}>Crear Poyecto</Link>*/}
			</div>
		</Fragment>
	);
};
export default noHayProyectos;
