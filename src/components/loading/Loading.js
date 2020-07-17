import React, { Fragment } from "react";
import { Grid, CircularProgress, makeStyles,} from "@material-ui/core";


// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "30ch",
		},
	},
	grid: {
		minHeight: "100vh",
	},
}));

export default function Loading() {
	
	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.grid}
			>	
				<CircularProgress color="secondary" />
			</Grid>
		</Fragment>
	);
}
