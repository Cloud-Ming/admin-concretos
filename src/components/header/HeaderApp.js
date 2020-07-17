import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Group from "@material-ui/icons/Group";

function HeaderApp() {
	let location = useLocation();
	console.log(location);
	return (
		<Fragment>
			<div style={{ padding: "10px" }}>
				<Card>
					<CardContent>
						<Typography variant="h4" component="h3">
							{location.pathname.split("/")[1] ? location.pathname.split("/")[1] : location.pathname }
						</Typography>

						<p>
							{location.pathname.split("/")[3] ? atob(location.pathname.split("/")[3]) : "" }
						</p>


						<p>
							{location.pathname.split("/")[4] ? atob(location.pathname.split("/")[4]) : "" }
						</p>
						<p></p>

						<Button
							component={Link}
							to={"link"}
							variant="contained"
							color="primary"
							startIcon={<Group />}
						>
							Crear cliente
						</Button>
					</CardContent>
				</Card>
			</div>
		</Fragment>
	);
}

export default HeaderApp;
