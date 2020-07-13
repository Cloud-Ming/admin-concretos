import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Group from "@material-ui/icons/Group";

const CrearProveedores = () => {
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
				<h1>Formulario de registro de proveedores</h1>
				<Button
						component={Link}
						to="/crear-proveedor"
						variant="contained"
						color="primary"
						startIcon={<Group />}
					>
						Crear proveedor
					</Button>
				{/*<Link to={`/crear-proyecto/${id_cliente}/${btoa(nombre_cliente)}`}>Crear Poyecto</Link>*/}
			</div>
		</Fragment>
	);
};
export default CrearProveedores;
