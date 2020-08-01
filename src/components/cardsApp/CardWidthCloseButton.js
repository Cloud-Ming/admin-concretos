import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Divider from "@material-ui/core/Divider";
// import Avatar from "@material-ui/core/Avatar";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		maxWidth: 275,
		marginRight: 20,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const CardWidthCloseButton = (props) => {
	const {
		idUnico,
		fecha,
		consecutivo,
		titulo,
		descripcion,
		url,
		// codigo,
		funcion,
		// button,
		link,
		icon,
	} = props;
	
	// Styles
	const classes = useStyles();
	return (
		<Fragment>
			<Card className={classes.root}>
				<CardHeader
					avatar={icon}
					title={titulo}
					subheader={fecha}
					action={
						<IconButton
							aria-label="settings"
							onClick={() => funcion(idUnico)}
						>
							<DeleteIcon />
						</IconButton>
					}
				/>
				<CardContent>
					{/*<button onClick={() => funcion(idUnico)}>{button}</button>*/}

					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						<b>Descripcion</b>: {descripcion}
					</Typography>

					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						<b>Consecutivo</b>: {consecutivo}
					</Typography>
				</CardContent>
				<Divider />
				<CardActions>
					<Button
						size="small"
						href={url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{link}
					</Button>
				</CardActions>
			</Card>
		</Fragment>
	);
};
export default CardWidthCloseButton;
