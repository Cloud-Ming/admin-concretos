import React, { Fragment } from "react";
import SignalWifiOffIcon from "@material-ui/icons/SignalWifiOff";

export default function errroRes() {
	return (
		<Fragment>
			<div
				style={{
					minHeight: "50vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<SignalWifiOffIcon style={{ fontSize: "80px" }} />
				<h1>Ha ocurrido un error</h1>
				<h3 style={{ margin: "0" }}>Revisa tu conexión a internet</h3>
			</div>
		</Fragment>
	);
}
