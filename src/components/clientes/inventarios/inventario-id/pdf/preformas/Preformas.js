import React, { Fragment } from "react";
import {
	Card,
	CardContent,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";

function Preformas() {
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
						Crear preforma
					</Typography>
					<div>
						<Button variant="contained" color="primary">
							Agregar
						</Button>
					</div>
				</CardContent>
			</Card>
		</Fragment>
	);
}

export default Preformas;
