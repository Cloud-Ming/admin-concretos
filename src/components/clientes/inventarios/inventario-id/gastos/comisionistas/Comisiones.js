import React, { Fragment } from "react";
import { Card, CardContent, makeStyles } from "@material-ui/core";
function Comisiones(props) {
	const { data } = props;

	const useStyles = makeStyles({
		titlePrincipal: {
			marginLeft: 15,
		},
		root: {
			minWidth: 275,
			marginBottom: 20,
		},
		bullet: {
			display: "inline-block",
			margin: "0 2px",
			transform: "scale(0.8)",
		},
		title: {
			fontSize: 22,
		},
		pos: {
			marginBottom: 12,
		},
		list: {
			margin: 0,
			padding: 10,
		},
		formControl: {
			width: 250,
		},
	});

	const classes = useStyles();

	return (
		<Fragment>
			{data.map((item) => (
				<Card key={item.id} className={classes.root}>
					<CardContent>
						<small>Id: {item.id}</small>
						<br />
						<small>Monto: {item.monto}</small>
						<br />
						<small>
							Nombre inventario: {item.nombre_inventario}
						</small>
						<br />
						<small>Fecha: {item.fecha}</small>
					</CardContent>
				</Card>
			))}
		</Fragment>
	);
}

export default Comisiones;
