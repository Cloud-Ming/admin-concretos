import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";

// Styles
const useStyles = makeStyles({
	root: {
		minWidth: 275,
		backgroundColor: "#ddd",
	},
	title: {
		fontSize: 14,
	},
});

const Proveedores = (props) => {
	const { data } = props;
	const classes = useStyles();

	return (
		<Fragment>
			<div style={{ margin: 10 }}>
				<br />
				<br />
				<Typography variant="h3" component="h2">
					Proveedores({data.length})
				</Typography>
				<p>Administrar proveedores</p>
				<br />
				{data.map((item, index) => (
					<div key={index}>
						<Card className={classes.root}>
							<CardContent>
								<small>
									Fecha creacion: {item.fecha_creacion}
								</small>
								<br />
								<Typography variant="h5" component="h2">
									{item.producto}
								</Typography>
								<p>Proveedor: {item.proveedor}</p>
								<p>Email: {item.email}</p>
								<p>Celular: {item.proveedor}</p>
								<p>Producto: {item.producto}</p>
								<p>Precio actual: {item.monto}</p>
								<br />
								<CardActions>
									<Button
										disabled
										size="small"
										startIcon={<DeleteIcon />}
									>
										Eliminar proveedor
									</Button>
								</CardActions>
							</CardContent>
						</Card>
						<br />
					</div>
				))}
			</div>
		</Fragment>
	);
};
export default Proveedores;
