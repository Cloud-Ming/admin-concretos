import React, { Fragment } from "react";
// import { Link } from "react-router-dom";

const Proyectos = () => {
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
				<h1>Proyectos</h1>
				<p style={{marginTop:"0"}}>Estamos trabaajando en esta herramienta.</p>
				{/*<Link to={"/crear-cliente"}>Registrar cliente</Link>*/}
			</div>
		</Fragment>
	);
};
export default Proyectos;
