import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
function HeaderApp(props) {
	const { titulo, subtitulo, link, textButton, icon } = props;
	return (
		<Fragment>
			<Card>
				<CardContent>
					<Typography variant="h4" component="h3">
						{titulo}
					</Typography>
					<p>{subtitulo}</p>

					<Button
						component={Link}
						to={link}
						variant="contained"
						color="primary"
						startIcon={icon}
					>
						{textButton}
					</Button>
				</CardContent>
			</Card>
		</Fragment>
	);
}

export default HeaderApp;
