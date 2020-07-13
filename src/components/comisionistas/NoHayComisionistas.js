import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Business from "@material-ui/icons/Business";

const NoHayComisionistas = () => {
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
				<h1> No hay comisionistas registrados</h1>
					<Button
						component={Link}
						to={`/crear-comisionista/`}
						variant="contained"
						color="primary"
						startIcon={<Business />}
					>
						Registrar comisionista
					</Button>


				{/*<h1> No hay comisionistas(0) </h1>
				<Link to={`/crear-comisionista/`}>Crear comisionista</Link>*/}
			</div>
		</Fragment>
	);
};
export default NoHayComisionistas;
