import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import Business from "@material-ui/icons/Business";

const NohayEstadosDeCuenta = (props) => {
	
	const { cliente } = props;

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
				<h1> No hay estados de cuenta({atob(cliente)})</h1>
				<p style={{ marginTop: "0" }}>
					Crea primero un proyecto y luego un inventario
				</p>
				{/*	<Button
					component={Link}
					to="/crear-cliente"
					variant="contained"
					color="primary"
					startIcon={<Business />}
				>
					Crear inventario
				</Button>*/}

				{/*<Link to={"/crear-cliente"}>Registrar cliente</Link>*/}
			</div>
		</Fragment>
	);
};
export default NohayEstadosDeCuenta;
