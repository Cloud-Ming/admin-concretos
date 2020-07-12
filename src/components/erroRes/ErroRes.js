import React, { Fragment } from "react";
// import WifiOffIcon from '@material-ui/icons/WifiOff';

export default function errroRes() {
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
			{/*<WifiOffIcon />*/}
				<h1>Ha ocurrido un error</h1>
				<h3 style={{ margin: "0" }}>Revisa tu conexión a internet</h3>
			</div>
		</Fragment>
	);
}
