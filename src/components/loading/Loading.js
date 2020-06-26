import React, { Fragment } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

export default function Loading() {
	return (
		<Fragment>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				<CircularProgress color="secondary" />
			</Grid>
		</Fragment>
	);
}
