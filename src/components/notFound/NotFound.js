import React, { Fragment } from "react";

export default function NotFound() {
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
				<h1>Error 404</h1>
				<h3 style={{margin:"0"}}>Esta pagina no funciona</h3>
			</div>
		</Fragment>
	);
}
