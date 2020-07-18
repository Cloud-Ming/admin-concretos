import React, { Fragment } from "react";
import Chart from "react-google-charts";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// import Button from "@material-ui/core/Button";

// import Group from "@material-ui/icons/Group";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

function HeaderApp() {
	let location = useLocation();

	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<div style={{ padding: "10px" }} className={classes.root}>
				<Card>
					<CardContent>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<Typography variant="h4" component="h3">
									{location.pathname.split("/")[1]
										? location.pathname.split("/")[1]
										: location.pathname}
								</Typography>
								<p>
									{location.pathname.split("/")[4]
										? atob(location.pathname.split("/")[4])
										: ""}
									&nbsp; > &nbsp;
									{location.pathname.split("/")[3]
										? atob(location.pathname.split("/")[3])
										: ""}
								</p>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Chart
									width={"300px"}
									height={"200px"}
									chartType="Bar"
									style={{ float: "right" }}
									loader={<div>Cargando</div>}
									data={[
										[
											"Year",
											"Ventas",
											"Gastos",
											"Ganacias",
										],
										["2020", 100, 100, 200],
									]}
									options={{
										// Material design options
										chart: {
											title: "Rendimiento compañia",
											subtitle:
												"Ventas, gastos, y ganancias: 2020-2020",
										},
									}}
									// For tests
									rootProps={{ "data-testid": "2" }}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</div>
		</Fragment>
	);
}

export default HeaderApp;
