import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Business from "@material-ui/icons/Business";

const noHayInventarios = (props) => {
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
				<h1>
					No hay inventarios <b>({nombre_proyecto})</b>
				</h1>
				<h3 style={{ marginTop: "0" }}>Cliente: {nombre_cliente}</h3>

				<Button
					component={Link}
					to={`/crear-inventario/${id_cliente}/${btoa(
						nombre_proyecto
					)}/${btoa(nombre_cliente)}`}
					variant="contained"
					color="primary"
					startIcon={<Business />}
				>
					Crear iniventario
				</Button>

				{/*<Link
					to={`/crear-inventario/${id_cliente}/${btoa(
						nombre_proyecto
					)}/${btoa(nombre_cliente)}`}
				>
					Crear primer inventario
				</Link>*/}
			</div>
		</Fragment>
	);
};
export default noHayInventarios;
