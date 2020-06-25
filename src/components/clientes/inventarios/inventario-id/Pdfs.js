import React, { Fragment } from "react";
import {
	Card,
	CardContent,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";

function Pdfs() {
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
	});

	const classes = useStyles();

	return (
		<Fragment>
			<Card className={classes.root}>
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Subir preforma, cotizaciones y facturas
					</Typography>
					<div>
						<Button variant="contained" color="primary">
							Crear preforma
						</Button>
					</div>
					<br />
					<div>
						<Button variant="contained" color="primary">
							Crear preformas
						</Button>
					</div>
					<br />
					<div>
						<Button variant="contained" color="primary">
							Subir facturas
						</Button>
					</div>
				</CardContent>
			</Card>
		</Fragment>
	);
}

export default Pdfs;
