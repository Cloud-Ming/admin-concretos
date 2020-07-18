import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/";

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "30ch",
		},
	},
	grid: {
		minHeight: "50vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const SinNada = (props) => {
	const { mensaje, icon, btn, link } = props;

	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<div className={classes.grid}>
				<Typography variant="h4" component="h3">
					{mensaje}
				</Typography>
				
				<p></p>

				<Button
					component={Link}
					to={link}
					variant="contained"
					color="primary"
					startIcon={icon}
				>
					{btn}
				</Button>

				{/*<Link to={"/crear-cliente"}>Registrar cliente</Link>*/}
			</div>
		</Fragment>
	);
};

export default SinNada;
