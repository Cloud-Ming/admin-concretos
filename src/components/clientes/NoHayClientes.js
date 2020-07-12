import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Business from "@material-ui/icons/Business";

const NoHayClientes = () => {
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
				<h1> No hay clientes registrados</h1>
					<Button
						component={Link}
						to="/crear-cliente"
						variant="contained"
						color="primary"
						startIcon={<Business />}
					>
						Registrar cliente
					</Button>

				{/*<Link to={"/crear-cliente"}>Registrar cliente</Link>*/}
			</div>
		</Fragment>
	);
};
export default NoHayClientes;
