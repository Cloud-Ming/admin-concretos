import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";

// Icons
import GroupIcon from "@material-ui/icons/Group";

// Styles
const useStyles = makeStyles({
	titlePrincipal: {
		marginLeft: 15,
	},
	root: {
		minWidth: 275,
		marginBottom: 20,
	},
	title: {
		fontSize: 22,
	},
	list: {
		margin: 0,
		padding: 10,
	},
});
const NoHayComisionistas = () => {
	// Styles
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
						No hay comisionistas registrados
					</Typography>
					<div>
						<Button
							component={Link}
							to="/crear-comisionista"
							variant="contained"
							color="primary"
							startIcon={<GroupIcon />}
						>
							Crear comisionista
						</Button>
					</div>
				</CardContent>
			</Card>
		</Fragment>
	);
};

export default NoHayComisionistas;
